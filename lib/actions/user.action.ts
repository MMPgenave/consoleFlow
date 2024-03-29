"use server";
import { FilterQuery } from "mongoose";
import { User } from "@/database/user.model";
import { connectToDataBase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
  GetSavedQuestionsParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import { Question } from "@/database/question.model";
import { Tag } from "@/database/tag.model";
import { Answer } from "@/database/answer.model";

export async function getUserById(params: any) {
  try {
    await connectToDataBase();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    console.error(error);
  }
}
export async function getAllUser(params: GetAllUsersParams) {
  try {
    await connectToDataBase();
    // const { page = 1, pageSize = 20, filter, searchQuery } = params;
    const users = await User.find({}).sort({ createdAt: -1 });
    return { users };
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

export async function toggleSaveQuestion(params: ToggleSaveQuestionParams) {
  try {
    await connectToDataBase();
    const { userId, questionId, path } = params;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new Error("User not found");
    }
    if (user.saved.includes(questionId)) {
      await User.findByIdAndUpdate(
        { _id: userId },
        { $pull: { saved: questionId } },
        { new: true },
      );
    } else {
      await User.findByIdAndUpdate(
        { _id: userId },
        { $addToSet: { saved: questionId } },
        { new: true },
      );
    }

    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}

export async function getAllQuestionCollection(
  params: GetSavedQuestionsParams,
) {
  try {
    await connectToDataBase();
    // eslint-disable-next-line no-unused-vars
    const { clerkId, page = 1, pageSize = 10, searchQuery, filter } = params;
    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};
    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      model: Question,
      match: query,

      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "tags", model: Tag },
        { path: "author", model: User },
      ],
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user.saved;
  } catch (error) {
    console.error(error);
  }
}

export async function getUserInfo(params: any) {
  try {
    connectToDataBase();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      console.log(`No user found with this clerkId:${userId}`);
      return;
    }
    const { _id } = user;
    const QuestionsAskedByThisUser = await Question.find({
      author: _id,
    });

    const AnsweredQuestionsByThisUser = await Answer.find({
      autor: _id,
    });

    return {
      user,
      NumberOfQuestionAskedByThisUser: QuestionsAskedByThisUser.length,
      NumberOfAnsweredQuestionByThisUser: AnsweredQuestionsByThisUser.length,
    };
  } catch (error) {
    console.error(error);
  }
}
