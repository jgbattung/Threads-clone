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
  connectToDB();

  try {

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

export async function fetchThreads(pageNumber = 1, pageSize = 20) {
  connectToDB();

  try {

    // calculate number of posts to skip
    // first page has no skips, so 0 * 20 = 0 skipped posts
    const skipAmount = (pageNumber - 1) * pageSize;

    const threadsQuery = Thread.find({parentId: { $in: [null, undefined] }})
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({ path: 'author', model: User })
      .populate({ 
        path: 'children',
        populate: {
          path: 'author',
          model: User,
          select: "_id name parentId image"
        }
      })

    const totalThreadsCount = await Thread.countDocuments({ parentId: { $in: [null, undefined] } })

    const threads = await threadsQuery.exec();

    const isNext = totalThreadsCount > skipAmount + threads.length;

    return { threads, isNext };

  } catch (error) {
    throw new Error(`Error loading Threads: ${error}`);
  }
}

export async function fetchThreadById(id: string) {
  connectToDB();

  try {
    const thread = await Thread.findById(id)
      .populate({
        path: 'author',
        model: User,
        select: "_id id name image"
      })
      .populate({
        path: 'children',
        populate: [
          {
            path: 'author',
            model: User,
            select: "_id id name parentId image"
          },
          {
            path: 'children',
            model: Thread,
            populate: {
              path: 'author',
              model: User,
              select: "_id id name parentId image"
            }
          }
        ]
      }).exec();

      return thread;
  } catch (error) {
    throw new Error(`Error loading Thread: ${error}`);
  }
}

export async function addReplyToThread(
  threadId: string,
  replyText: string,
  userId: string,
  path: string
) {
  connectToDB();

  try {
    // find the thread being replied to by ID
    const originalThread = await Thread.findById(threadId);

    if(!originalThread) {
      throw new Error("Thread not found");
    }

    // create the reply thread
    const replyThread = new Thread({
      text: replyText,
      author: userId,
      parentId: threadId,
    })

    // save the new thread
    const savedReplyThread = await replyThread.save();

    // update the thread with the new reply
    originalThread.children.push(savedReplyThread._id)

    // save the thread with the reply
    await originalThread.save();

    revalidatePath(path);

  } catch (error: any) {
    throw new Error(`Error adding reply: ${error.message}`);
  }
}