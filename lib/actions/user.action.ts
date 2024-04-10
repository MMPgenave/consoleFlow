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
  GetUserStatsParams,
  GetUserByIdParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import { Question } from "@/database/question.model";
import { Tag } from "@/database/tag.model";
import { Answer } from "@/database/answer.model";
import { BadgeCriteriaType } from "@/types";
import { assignBadges } from "@/utils";

export async function getUserById(params: GetUserByIdParams) {
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
    const { searchQuery, filter, page = 1, pageSize = 10 } = params;
    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof User> = {};
    if (searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, "i") } },
        { username: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }
    let sortOptions = {};
    switch (filter) {
      case "new_users":
        sortOptions = { joinedAt: -1 };
        break;
      case "old_users":
        sortOptions = { joinedAt: 1 };
        break;
      case "top_contributors":
        sortOptions = { reputation: -1 };
        break;

      default:
        break;
    }
    const users = await User.find(query).skip(skipAmount).limit(pageSize).sort(sortOptions);
    const totalUsers = await User.countDocuments(query);
    const isNext: boolean = totalUsers > skipAmount + users.length;
    return { users, isNext };
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
      await User.findByIdAndUpdate({ _id: userId }, { $pull: { saved: questionId } }, { new: true });
    } else {
      await User.findByIdAndUpdate({ _id: userId }, { $addToSet: { saved: questionId } }, { new: true });
    }

    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}

export async function getAllQuestionCollection(params: GetSavedQuestionsParams) {
  try {
    await connectToDataBase();
    // eslint-disable-next-line no-unused-vars
    const { clerkId, page = 1, pageSize = 10, searchQuery, filter } = params;
    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Question> = searchQuery ? { title: { $regex: new RegExp(searchQuery, "i") } } : {};
    let filterOptions = {};
    switch (filter) {
      case "most_recent":
        filterOptions = { createdAt: -1 };
        break;
      case "oldest":
        filterOptions = { createdAt: 1 };
        break;
      case "most_voted":
        filterOptions = { upvotes: -1 };
        break;
      case "most_viewed":
        filterOptions = { views: -1 };
        break;
      case "most_answered":
        filterOptions = { answers: -1 };
        break;

      default:
        break;
    }
    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      model: Question,
      match: query,

      options: {
        skip: skipAmount,
        limit: pageSize,
        sort: filterOptions,
      },
      populate: [
        { path: "tags", model: Tag },
        { path: "author", model: User },
      ],
    });
    if (!user) {
      throw new Error("User not found");
    }
    const { saved: totalSaved } = await User.findOne({ clerkId }).populate({
      path: "saved",
      model: Question,
      match: query,

      options: {
        sort: filterOptions,
      },
      populate: [
        { path: "tags", model: Tag },
        { path: "author", model: User },
      ],
    });
    const totalSavedQuestions = totalSaved.length;
    const isNext: boolean = totalSavedQuestions > skipAmount + user.saved.length;

    return { collection: user.saved, isNext };
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
    const { _id,reputation } = user;
    const QuestionsAskedByThisUser = await Question.find({
      author: _id,
    }).populate({ path: "tags", model: Tag });
    console.log(`ques:${QuestionsAskedByThisUser}`);

    // calculte the total upvotes of questions
    let totalUpvotesEarnedByAskingQuestions = 0;
    QuestionsAskedByThisUser.forEach((question) => {
      totalUpvotesEarnedByAskingQuestions += question.upvotes.length;
    });

    // calculte the total views of questions
    let totalQuestionsViews = 0;
    QuestionsAskedByThisUser.forEach((question) => {
      totalQuestionsViews += question.views;
    });

    const AnsweredQuestionsByThisUser = await Answer.find({
      author: _id,
    });
    // calculte the total upvotes of answers
    let totalUpvotesEarnedByAnsweringQuestions = 0;
    AnsweredQuestionsByThisUser.forEach((answer) => {
      totalUpvotesEarnedByAnsweringQuestions += answer.upvotes.length;
    });

    const criteria = [
      { type: "QUESTION_COUNT" as BadgeCriteriaType, count: QuestionsAskedByThisUser.length },
      { type: "ANSWER_COUNT" as BadgeCriteriaType, count: AnsweredQuestionsByThisUser.length },
      { type: "QUESTION_UPVOTES" as BadgeCriteriaType, count: totalUpvotesEarnedByAskingQuestions || 0 },
      { type: "ANSWER_UPVOTES" as BadgeCriteriaType, count: totalUpvotesEarnedByAnsweringQuestions || 0 },
      { type: "TOTAL_VIEWS" as BadgeCriteriaType, count: totalQuestionsViews || 0 },
    ];

    const badgeCounts = assignBadges({ criteria });
    return {
      questions: QuestionsAskedByThisUser,
      user,
      NumberOfQuestionAskedByThisUser: QuestionsAskedByThisUser.length,
      NumberOfAnsweredQuestionByThisUser: AnsweredQuestionsByThisUser.length,
      badgeCounts,
      reputation,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function getUserQuestions(params: GetUserStatsParams) {
  try {
    connectToDataBase();
    const { userId, page = 1, pageSize = 10 } = params;
    const skipAmount = (page - 1) * pageSize;
    const questions = await Question.find({ author: userId })
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .skip(skipAmount)
      .limit(pageSize)
      .sort({ createdAt: -1, views: -1, upvotes: -1 });
    const totalQuestions = await Question.find({ author: userId })
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1, views: -1, upvotes: -1 });
    const isNext = totalQuestions.length > skipAmount + questions.length;
    return { questions, isNext };
  } catch (error) {
    console.error(`error in getUserQuestions server action is :${error}`);
  }
}
export async function getUserAnswers(params: GetUserStatsParams) {
  try {
    connectToDataBase();
    const { userId, page = 1, pageSize = 3 } = params;
    const skipAmount = (page - 1) * pageSize;

    const answers = await Answer.find({
      author: userId,
    })
      .populate({ path: "author", model: User })
      .populate({
        path: "question",
        model: Question,
        populate: [{ path: "author", model: User }],
      })
      .skip(skipAmount)
      .limit(pageSize)
      .sort({ upvotes: -1 });

    const totalAnswers = await Answer.find({
      author: userId,
    });

    // فرض اینکه یه کاربر به یک سوال بیش از یکبار جواب داده است را در نظر نگرفتم
    const isNext = totalAnswers.length > skipAmount + answers.length;

    return { answers, isNext };
  } catch (error) {
    console.error(`error in getUserAnswers server action is :${error}`);
  }
}
