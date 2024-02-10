import Link from "next/link";
import Image from "next/image";
import { formatDateTime, formatRelativeTime } from "@/lib/utils";

interface Props {
  id: string;
  currentUser: string;
  parentId: {
    _id: string;
    text: string;
    author: {
      id: string;
      name: string;
      username: string
      image: string;
    };

  }
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
    username: string;
  };
  createdAt: string;
  comments: {
    author: {
      image: string;
    }
  }[];
  isComment?: boolean;
  isDetailed?: boolean;
  isReplyView?: boolean
}

const ThreadCard = ({
  id,
  currentUser,
  parentId,
  content,
  author,
  createdAt,
  comments,
  isComment=false,
  isDetailed=false,
  isReplyView=false,
}: Props) => {
  return (
    <article className={`flex w-full flex-col rounded-xl bg-gray-900 p-7 ${!isComment ? 'xs:px-7' : 'bg-gray-950'}`}>
      {isReplyView && (
        <Link href={`/thread/${parentId._id}`} className="hover:underline text-gray-400">
          <div className="flex text-left mb-4 gap-2">
            <Image
              src='/assets/arrow-left-up.svg'
              alt='arrow'
              width={18}
              height={18}
              className="relative top-0"
            />
            <p className="text-gray-400 text-sm font-extralight">...replying to 
              <span className="text-purple-400">
                <Link href={`/profile/${parentId.author.id}`} className="pl-1 hover:underline">
                  @{parentId.author.username}
                </Link>
              </span>
            </p>
            <Image 
              src={parentId.author.image}
              alt='profile photo'
              width={20}
              height={20}
              className="rounded-full object-cover max-h-5"
            />
          </div>
        </Link>
      )}
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id }`} className="relative h-11 w-11">
              <Image 
                src={author.image}
                alt='profile photo'
                width={48}
                height={48}
                className="cursor-pointer rounded-full object-cover h-12 w-12"
              />
            </Link>

            <div className="relative mt-2 w-0.5 grow rounded-full bg-gray-700" />
          </div>

          <div className="flex w-full flex-col">
            <Link href={`/profile/${author.id }`} className="w-fit flex gap-1 items-center">
              <h4 className="cursor-pointer font-semibold text-white text-lg hover:underline transition-all">{author.name}</h4>
              <p className="text-gray-400 text-lg font-thin">@{author.username}</p>
              {!isDetailed && (
                <p className="text-gray-400 text-lg font-thin"> · {formatRelativeTime(createdAt)}</p>
              )}
            </Link>

            <p className="mt-2 text-white text-base font-light">{content}</p>

            {isDetailed && (
              <p className="mt-7 mb-1 text-gray-500 font-light text-sm">{formatDateTime(createdAt)}</p>
            )}

            <div className={`${isDetailed ? 'mt-1' : 'mt-5'} flex flex-col gap-3`}>
              <div className="flex gap-3.5">
                <Image src="/assets/heart-gray.svg" alt="heart" width={24} height={24} className="cursor-pointer object-contain filter hover:brightness-0 hover:invert hover:transition-colors" />
                
                <Link href={`/thread/${id}`} className="flex gap-1 items-center justify-center">
                  <Image src="/assets/reply.svg" alt="reply" width={24} height={24} className="cursor-pointer object-contain filter hover:brightness-0 hover:invert hover:transition-colors" />
                  <p className="font-extralight text-sm text-gray-400 hover:text-gray-200 transition-colors">{comments.length > 0 ? `${comments.length}` : ''} </p>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </article>
  )
}

export default ThreadCard