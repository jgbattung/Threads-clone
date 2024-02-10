"use server"

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"
import Thread from "../models/thread.model";
import { FilterQuery, SortOrder } from "mongoose";

interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

export async function updateUser({
  userId,
  username,
  name,
  bio,
  image,
  path,
}: Params): Promise<void> {

  connectToDB();

  try {
    await User.findOneAndUpdate(
      { id: userId },
      { 
        username: username,
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true }
    );
  
    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`)
  }
};

export async function fetchUser(userId: string) {
  try {
    connectToDB();

    return await User.findOne({ id: userId })
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

export async function fetchUserThreads(userId: string) {
  connectToDB();

  try {
    const threads = await User.findOne({ id: userId })
      .populate({
        path: 'threads',
        model: Thread,
        options: { sort: { 'createdAt': -1 } },
        populate: {
          path: 'children',
          model: Thread,
          populate: {
            path: 'author',
            model: User,
            select: "name image id username"
          }
        }
      });

      return threads
  } catch (error: any) {
    throw new Error(`Failed to fetch user's threads: ${error.message}`)
  }
}

export async function fetchUserReplies(userId: string) {
  connectToDB();
  
  try {
    // find threads by the user that have a parentId (meaning it is a reply)
    const replies = Thread.find({ 
      author: userId,
      parentId: { $exists: true }
    })
      .populate({
        path: 'author',
        model: User,
        select: '_id id name image username'
      })
      .populate({
        path: 'parentId',
        model: Thread,
        populate: {
          path: 'author',
          model: User
        }
      })
      .populate({
        path: 'children',
        model: Thread,
        populate: {
          path: 'author',
          model: User
        }
      })
      .sort({ createdAt: -1 });

    return replies;
  } catch (error) {
    throw new Error(`Failed to fetch user replies: ${error}`);
  }
}

interface FetchUsersParams {
  userId: string,
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}

export async function fetchUsers({
  userId,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc"
}: FetchUsersParams) {
  connectToDB();

  try {
    const skipAmount = (pageNumber - 1) * pageSize;

    const regex = new RegExp(searchString, "i");

    // search query

    const query: FilterQuery<typeof User> = {
      id: { $ne: userId }
    }

    if(searchString.trim() !== '') {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } }
      ]
    }

    const sortOptions = { createdAt: sortBy };

    const usersQuery = User.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize)

    const totalUsersCount = await User.countDocuments(query);

    const users = await usersQuery.exec();

    const isNext = totalUsersCount > skipAmount + users.length;

    return { users, isNext };

  } catch (error: any) {
    throw new Error(`Failed to find users: ${error.message}`)
  }
}

export async function getActivity(userId: string) {
  connectToDB();
  try {

    // find all threads by the user
    const userThreads = await Thread.find({ author: userId })

    // collect all the reply ids in the user's threads
    const childThreadIds = userThreads.reduce((acc, userThread) => {
      return acc.concat(userThread.children);
    }, [])

    const replies = await Thread.find({
      _id: { $in: childThreadIds },
      author: { $ne: userId }
    }).populate({
      path: 'author',
      model: User,
      select: 'name username image _id'
    })

    return replies;

  } catch (error: any) {
    throw new Error(`Failed to fetch activity: ${error.message}`);
  }
}