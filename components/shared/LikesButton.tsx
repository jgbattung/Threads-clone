"use client"
import { likeThread } from "@/lib/actions/thread.actions";
import Image from "next/image";
import { useState } from "react";

interface LikesButtonProps {
  threadId: string;
  likes: string[];
  currentUser: string;
}

function LikesButton({ threadId, likes, currentUser }: LikesButtonProps) {
  const isLikedByUser = likes.includes(currentUser);
  const [isLiked, setIsLiked] = useState(isLikedByUser);

  const handleLike = async (e: React.MouseEvent<HTMLElement>) => {
    setIsLiked(!isLiked);
    try {
      await likeThread(currentUser, threadId, !isLiked)
      
    } catch (error: any) {
      throw new Error("Error liking thread:", error);
      setIsLiked(!isLiked);
    }
  }

  return (
    <div onClick={handleLike}>
      <Image src={isLiked ? "/assets/heart-filled.svg" : "/assets/heart-gray.svg"} alt="heart" width={24} height={24} className="cursor-pointer object-contain filter hover:brightness-0 hover:invert hover:transition-colors" />
    </div>
  )
}

export default LikesButton