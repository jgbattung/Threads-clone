import { fetchUserThreads } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation"
import ThreadCard from "../cards/ThreadCard";

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

const ThreadsTab = async ({
  currentUserId,
  accountId,
  accountType
}: Props) => {
  let result = await fetchUserThreads(accountId)

  if(!result) redirect('/')

  return (
    <section className="mt-9 flex flex-col gap-9 max-md:gap-3 max-lg:gap-6">
      {result.threads.map((thread: any) => (
        <ThreadCard 
          key={thread._id}
          id={thread._id}
          currentUser={currentUserId}
          parentId={thread.parentId}
          content={thread.text}
          author={
            accountType === 'User' 
              ? { name: result.name, image: result.image, id: result.id, username: result.username }
              : { name: thread.author.name, image: thread.author.image, id: thread.author.id, username: thread.author.username }
          }
          createdAt={thread.createdAt}
          comments={thread.children}
          likes={thread.likes}
        />
      ))}
    </section>
  )
}

export default ThreadsTab