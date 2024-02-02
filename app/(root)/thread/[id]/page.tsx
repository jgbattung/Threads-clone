import ThreadCard from "@/components/cards/ThreadCard";
import Reply from "@/components/forms/Reply";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { id: string } }) => {
  if(!params.id) return null;

  const user = await currentUser();
  if(!user) return null;

  const userInfo = await fetchUser(user.id);
  if(!userInfo.onboarded) redirect('/onboarding')

  const thread = await fetchThreadById(params.id);

  return (
    <section className="relative">
      <div>
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUser={user?.id || ""}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          createdAt={thread.createdAt}
          comments={thread.children}
          isDetailed
        />
      </div>

      <div className="mt-7">
        <Reply 
          threadId={thread.id}
          currentUserImg={userInfo.image}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>
      
      <div className="mt-10">
        {thread.children.map((child: any) => (
          <ThreadCard 
            key={child._id}
            id={child._id}
            currentUser={user?.id || ""}
            parentId={child.parentId}
            content={child.text}
            author={child.author}
            createdAt={child.createdAt}
            comments={child.children}
            isComment
          />
        ))}
      </div>
    </section>
  )
}

export default Page;