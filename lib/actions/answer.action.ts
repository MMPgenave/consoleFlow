"use server";

import { Answer } from "@/database/answer.model";
import { connectToDataBase } from "../mongoose";
import { AnswerVoteParams, CreateAnswerParams, DeleteAnswerParams, GetAnswersParams } from "./shared.types";
import { Question } from "@/database/question.model";
import { revalidatePath } from "next/cache";
import { User } from "@/database/user.model";
import { InteractionTow } from "@/database/interaction.model";

export async function answersToQuestion(prop: CreateAnswerParams) {
  try {
    connectToDataBase();

    const { question, content, author, path } = prop;

    const newAnswer = await Answer.create({ author, content, question });

    const relatedQuestion = await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    // create an interaction record for answer a question action
    await InteractionTow.create({
      action: "answer_to_question",
      user: author,
      question,
      answer: newAnswer._id,
      tags: relatedQuestion.tags,
    });
    // increase author reputation by +10 for answering a question
    await User.findByIdAndUpdate({ _id: author }, { $inc: { reputation: 10 } });

    revalidatePath(path);
  } catch (error) {
    console.error(`error in getQuestionById server action is :${error}`);
  }
}
export async function getAllAnswers(params: GetAnswersParams) {
  try {
    connectToDataBase();
    const { questionId, sortBy: filter } = params;
    let filterOptions = {};
    switch (filter) {
      case "highestUpvotes":
        filterOptions = { upvotes: -1 };
        break;
      case "lowestUpvotes":
        filterOptions = { upvotes: 1 };
        break;
      case "recent":
        filterOptions = { createdAt: -1 };
        break;
      case "old":
        filterOptions = { createdAt: 1 };
        break;

      default:
        break;
    }
    const answers = await Answer.find({ question: questionId })
      .populate({
        path: "author",
        model: User,
        select: "_id name picture clerkId",
      })
      .populate({
        path: "upvotes",
        model: User,
        select: "_id clerkId name picture",
      })
      .populate({
        path: "downvotes",
        model: User,
        select: "_id clerkId name picture",
      })
      .sort(filterOptions);
    return answers;
  } catch (error) {
    console.error(`error (in getAllAnswers server action) is :${error}`);
  }
}

export async function upvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDataBase();

    const { answerId, userId, path, hasupVoted, hasdownVoted } = params;
    let updateQuery = {};
    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }
    const answer = await Answer.findByIdAndUpdate({ _id: answerId }, updateQuery, { new: true });
    if (!answer) {
      throw new Error("Answer doesnt exist");
    }

    // increase author reputation by +2 for upvoting an answer
    await User.findByIdAndUpdate({ _id: userId }, { $inc: { reputation: hasupVoted ? -2 : 2 } });
    // increase reputation of answer's author  by +10 for receiving an upvote to it's answer
    await User.findByIdAndUpdate({ _id: answer.author }, { $inc: { reputation: hasupVoted ? -10 : 10 } });
    revalidatePath(path);
  } catch (error) {
    console.error(`Error in upvoteAnswer() server action is :${error}`);
  }
}

export async function downvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDataBase();

    const { answerId, userId, path, hasupVoted, hasdownVoted } = params;
    let updateQuery = {};
    if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }
    const answer = await Answer.findByIdAndUpdate({ _id: answerId }, updateQuery, { new: true });
    if (!answer) {
      throw new Error("Answer doesnt exist");
    }

    // increase author reputation by +2 for upvoting an answer
    await User.findByIdAndUpdate({ _id: userId }, { $inc: { reputation: hasdownVoted ? -2 : 2 } });
    // increase reputation of answer's author  by +10 for receiving an upvote to it's answer
    await User.findByIdAndUpdate({ _id: answer.author }, { $inc: { reputation: hasdownVoted ? -10 : 10 } });
    revalidatePath(path);
  } catch (error) {
    console.error(`error in downvoteAnswer server action is :${error}`);
  }
}
export async function deleteAnswerAction(params: DeleteAnswerParams) {
  try {
    connectToDataBase();

    const { answerId, path } = params;
    const answer = await Answer.findById({ _id: answerId });
    if (!answer) {
      throw new Error("Answer not found!");
    }
    await Answer.deleteOne({ _id: answerId });
    await Question.updateMany({ _id: answer.question }, { $pull: { answers: answerId } });
    await InteractionTow.deleteMany({ answer: answerId });

    revalidatePath(path);
  } catch (error) {
    console.log(`error from mongodb connection :${error}`);
  }
}
