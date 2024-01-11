import AccountProfile from "@/components/forms/AccountProfile"
import { currentUser } from "@clerk/nextjs"

async function Page() {
  const user = await currentUser();

  const userInfo = {}

  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    username: userInfo?.username || user?.username,
    name: userInfo?.name || user?.firstName || "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl,
  }

  return (
    <main className="text-white mx-auto flex flex-col max-w-3xl justify-start px-10 py-20">
      <h1 className="text-3xl font-bold">Welcome to Threads!</h1>
      <p className="mt-3 text-base">Complete your profile to get started.</p>

      <section className="bg-gray-900 rounded-lg p-10 mt-9">
        <AccountProfile 
          user={userData}
          btnTitle="Continue"
        />
      </section>
    </main>
  )
}

export default Page