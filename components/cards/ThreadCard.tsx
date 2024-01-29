import Link from "next/link";
import Image from "next/image";

interface Props {
  id: string;
  currentUser: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  }
  createdAt: string;
  comments: {
    author: {
      image: string;
    }
  }[];
  isComment?: boolean;
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
            <Link href={`/profile/${author.id }`} className="w-fit">
              <h4 className="cursor-pointer font-semibold text-white text-lg">{author.name}</h4>
            </Link>

            <p className="mt-2 text-white text-base font-light">{content}</p>

            <div className="mt-5 flex flex-col gap-3">
              <div className="flex gap-3.5">
                <Image src="/assets/heart-gray.svg" alt="heart" width={24} height={24} className="cursor-pointer object-contain" />
                <Link href={`/thread/${id}`}>
                  <Image src="/assets/reply.svg" alt="reply" width={24} height={24} className="cursor-pointer object-contain" />
                </Link>
              </div>
            </div>

            {!isComment && comments.length > 0 && (
              <Link href={`/thread/${id}`}>
                <p className="mt-3 font-extralight text-sm text-gray-300">{comments.length > 1 ? `${comments.length} replies` : `1 reply`} </p>
              </Link>
            )}

          </div>
        </div>
      </div>
    </article>
  )
}

export default ThreadCard