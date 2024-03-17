"use server";

import { User } from "@/database/user.model";
import { connectToDataBase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import { Question } from "@/database/question.model";

export async function getUserById(params: any) {
  try {
    await connectToDataBase();
    const { userId } = params;
    console.log(`userId in user actions is :${userId}`);
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    console.error(error);
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    await connectToDataBase();

    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.error(error);
  }
}
export async function updateUser(userData: UpdateUserParams) {
  try {
    await connectToDataBase();
    const { clerkId, updateData, path } = userData;

    await User.findOneAndUpdate({ clerkId }, updateData, { new: true });
    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}
export async function deleteUser(userData: DeleteUserParams) {
  try {
    await connectToDataBase();
    const { clerkId } = userData;
    const user = await User.findOneAndDelete({ clerkId });
    if (!user) {
      throw new Error("User not found");
    }
    // Delete user from database
    // and questions, answers, comments, etc.

    // get user question id
    // const userQuestionId = await Question.find({ author: user._id }).distinct(
    //   "_id",
    // );

    // delete user questions

    await Question.deleteMany({ author: user._id });

    // TODO: delete user answers, comments and etc.

    const deletedUser = await User.findByIdAndUpdate(user._id);
    return deletedUser;
  } catch (error) {
    console.error(error);
  }
}
