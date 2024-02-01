import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";

const Page = async () => {
  const user = await currentUser();

  if(!user) return null;

  const userInfo = await fetchUser(user.id);

  if(!userInfo?.onboarded) redirect('/onboarding');

  const activities = await getActivity(userInfo._id);
  
  return (
    <section>
      <h1 className="text-white text-2xl text-left font-bold">Activity</h1>

      <section className="mt-10 flex flex-col gap-5">
        {activities.length > 0 ? (
          <>
            {activities.map((activity) => (
              <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                <article className="flex items-center gap-2 rounded-md bg-gray-900 px-7 py-4">
                  <Image
                    src={activity.author.image}
                    alt="profile photo"
                    width={20}
                    height={20}
                    className="w-5 h-5 object-cover rounded-full"
                  />
                  <p className="text-gray-200 font-light text-regular">
                    <span className="font-bold text-purple-400">{activity.author.name}</span>{" "}<span className="text-gray-400 font-light text-sm">(@{activity.author.username})</span>{" "}replied to your thread.
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className="text-gray-200 font-regular text-base">No activities</p>
        ) }
      </section>
    </section>
  )
}

export default Page