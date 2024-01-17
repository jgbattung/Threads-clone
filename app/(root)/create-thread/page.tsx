import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"

async function Page() {
  const user = await currentUser();

  if(!user) return null;

  const userInfo = await fetchUser(user.id);

  if(!userInfo?.onboarded) redirect('/onboarding');

  return (
    <>
      <h1 className='font-bold text-white text-xl text-left'>Create Thread</h1>

      <PostThread userId={userInfo._id} />
    </>
  )
}

export default Page