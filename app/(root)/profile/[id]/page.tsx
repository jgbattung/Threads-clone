import LikesTab from "@/components/shared/LikesTab";
import ProfileHeader from "@/components/shared/ProfileHeader";
import RepliesTab from "@/components/shared/RepliesTab";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import Image from "next/image";
import { redirect } from "next/navigation"

const Page = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();

  if(!user) return null;

  const userInfo = await fetchUser(params.id);
  const loggedInUserInfo = await fetchUser(user.id);

  if(!userInfo?.onboarded) redirect('/onboarding');

  return (
    <section>
      <ProfileHeader 
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />
      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="flex min-h-[50px] flex-1 items-center gap-3 text-gray-200 bg-gray-900 font-light data-[state=active]:bg-violet-600 data-[state=active]:text-gray-200">
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className="flex min-h-[50px] flex-1 items-center gap-3 text-gray-200 bg-gray-900 font-light data-[state=active]:bg-violet-600 data-[state=active]:text-gray-200">
                <Image 
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <p className="max-sm:hidden">{tab.label}</p>

                {tab.label === "Threads" && (
                  <p className="ml-1 rounded-sm bg-gray-500 px-2 py-1 font-light text-xs text-gray-200">
                    {userInfo?.threads?.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="threads" className="w-full text-gray-200">
            <ThreadsTab 
              currentUserId={loggedInUserInfo._id}
              accountId={userInfo.id}
              accountType="User"
            />
          </TabsContent>
          <TabsContent value="replies" className="text-gray-200">
            <RepliesTab
              currentUserId={loggedInUserInfo._id}
              accountId={userInfo._id}
            />
          </TabsContent>
          <TabsContent value="likes">
            <LikesTab 
              currentUserId={loggedInUserInfo._id}
              accountId={userInfo.id}
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>

  )
}

export default Page