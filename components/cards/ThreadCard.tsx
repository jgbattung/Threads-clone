import Link from "next/link";
import Image from "next/image";
import { formatDateTime, formatRelativeTime } from "@/lib/utils";

interface Props {
  id: string;
  currentUser: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
    username: string;
  }
  createdAt: string;
  comments: {
    author: {
      image: string;
    }
  }[];
  isComment?: boolean;
  isDetailed?: boolean;
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
}: Props) => {
  return (
    <article className={`flex w-full flex-col rounded-xl bg-gray-900 p-7 ${!isComment ? 'xs:px-7' : 'bg-gray-950'}`}>
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id }`} className="relative h-11 w-11">
              <Image 
                src={author.image}
                alt='profile photo'
                fill
                className="cursor-pointer rounded-full"
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