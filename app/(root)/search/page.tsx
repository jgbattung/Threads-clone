import UserCard from "@/components/cards/UserCard";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await currentUser();

  if(!user) return null;

  const userInfo = await fetchUser(user.id);

  if(!userInfo?.onboarded) redirect('/onboarding');

  const result = await fetchUsers({
    userId: user.id,
    searchString: '',
    pageNumber: 1,
    pageSize: 25,
  })

  return (
    <section>
      <h1 className="text-white text-2xl text-left font-bold">Search</h1>
      
      {/* search bar here */}

      <div className="mt-14 flex flex-col gap-9">
        {result.users.length === 0 ? (
          <p className="text-center font-normal text-gray-200">No users</p>
        ) : (
          <>
            {result.users.map((person) => (
              <Link href={`/profile/${person.id }`} key={person.id}>
                <UserCard
                  id={person.id}
                  name={person.name}
                  username={person.username}
                  imgUrl={person.image}
                  bio={person.bio}
                />
              </Link>
            ))}
          </>
        )}
      </div>

    </section>
  )
}

export default Page