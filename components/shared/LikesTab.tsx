import { fetchUserLikes } from "@/lib/actions/user.actions";
import ThreadCard from "../cards/ThreadCard";

interface Props {
  currentUserId: string;
  accountId: string;
}

const LikesTab = async({ currentUserId, accountId }: Props) => {
  let result = await fetchUserLikes(accountId);

  return (
    <section className="mt-9 flex flex-col gap-9 max-md:gap-3 max-lg:gap-6 items-center">
      {!result.likes || result.likes.length === 0 ? (
          <p className="text-gray-200 text-lg font-medium">No likes threads yet.</p>
      ) : (
        result.likes.map((likedThread: any) => (
          <ThreadCard 
            key={likedThread._id}
            id={likedThread._id}
            currentUser={currentUserId}
            parentId={likedThread.parentId}
            content={likedThread.text}
            author={likedThread.author}
            createdAt={likedThread.createdAt}
            comments={likedThread.children}
            likes={likedThread.likes}
          />
        ))
      )}
    </section>
  )
}

export default LikesTab