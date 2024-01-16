import ThreadCard from "@/components/cards/ThreadCard";
import { fetchThreads } from "@/lib/actions/thread.actions";
import { UserButton, currentUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes"

export default async function Home() {
  const result = await fetchThreads(1, 30);
  const user = await currentUser();

  return (
    <>
      <h1 className="font-bold text-xl text-left text-white">Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        {result.threads.length === 0 ? (
          <p className="text-center font-light text-white">No Threads found.</p>
        ) : (
          <>
            {result.threads.map((thread) => {
              <ThreadCard
                key={thread.id}
                id={thread._id}
                currentUser={user?.id}
                parentId={thread.parentId}
                content={thread.text}
                author={thread.author}
                createdAt={thread.createdAt}
                comments={thread.children}
              />
            })}
          </>
        )}
      </section>
    </>
  )
}