"use server"

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"

interface Params {
  text: string,
  author: string,
  path: string,
}

export async function createThread({ text, author, path }: Params) {
  try {
    connectToDB();

    const createThread = await Thread.create({
      text,
      author,
    });

    await User.findByIdAndUpdate(author, {
      $push: { threads: createThread._id }
    });

    revalidatePath(path);

  } catch (error) {
    throw new Error(`Failed to create thread: ${error}`);
  }
}