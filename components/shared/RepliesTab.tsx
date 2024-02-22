import { fetchUserReplies } from "@/lib/actions/user.actions"
import ThreadCard from "../cards/ThreadCard";


interface Props {
  currentUserId: string,
  accountId: string,
}

const RepliesTab = async ({
  currentUserId,
  accountId,
}: Props) => {
  let replies = await fetchUserReplies(accountId);

  return (
    <section className="mt-9 flex flex-col gap-9 max-md:gap-3 max-lg:gap-6 items-center">
      {!replies || replies.length === 0 ? (
        <p className="text-gray-200 text-lg font-semibold">No replies yet.</p>
      ) : (
        replies.map((reply) => (
          <ThreadCard 
            key={reply._id}
            id={reply._id}
            currentUser={currentUserId}
            parentId={reply.parentId}
            content={reply.text}
            author={ { name: reply.author.name, image: reply.author.image, id: reply.author.id, username: reply.author.username } }
            createdAt={reply.createdAt}
            comments={reply.children}
            isReplyView
            likes={reply.likes}
          />
        ))
      )} 
    </section>
  )
}

export default RepliesTab