import Image from "next/image";

interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
}

const UserCard = ({
  id,
  name,
  username,
  imgUrl,
  bio
}: Props) => {
  return (
    <article className="flex flex-row justify-between gap-4 max-sm:rounded-xl max-sm:bg-gray-950 sm:flex-row sm:items-center">
      <div className="flex flex-1 items-start justify-start gap-3 sm:items-start">
        <Image 
          src={imgUrl}
          alt="profile photo"
          width={48}
          height={48}
          className="rounded-full object-cover h-12 w-12"
        />
        <div className="flex-1 text-ellipsis">
          <h4 className="font-bold text-lg text-gray-200 hover:underline transition-all">{name}</h4>
          <p className="font-light text-sm text-gray-400">@{username}</p>
          <p className="text-gray-200 font-normal text-base">{bio}</p>
        </div>
      </div>
    </article>
  )
};

export default UserCard