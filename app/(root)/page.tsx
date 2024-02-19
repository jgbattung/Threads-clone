import ThreadCard from "@/components/cards/ThreadCard";
import { fetchThreads } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const result = await fetchThreads(1, 30);
  const user = await currentUser();

  return (
    <>
      <section className="mt-9 flex flex-col gap-10">
        {result.threads.length === 0 ? (
          <p className="text-center font-light text-white">No Threads found.</p>
        ) : (
          <>
            {result.threads.map((thread) => (
              <ThreadCard
                key={thread._id}
                id={thread._id}
                currentUser={user?.id || ""}
                parentId={thread.parentId}
                content={thread.text}
                author={thread.author}
                createdAt={thread.createdAt}
                comments={thread.children}
                likes={thread.likes}
              />
            ))}
          </>
        )}
      </section>
    </>
  )
}