"use server";

import { Answer } from "@/database/answer.model";
import { connectToDataBase } from "../mongoose";
import { CreateAnswerParams, GetAnswersParams } from "./shared.types";
import { Question } from "@/database/question.model";
import { revalidatePath } from "next/cache";
import { User } from "@/database/user.model";

export async function answersToQuestion(prop: CreateAnswerParams) {
  try {
    connectToDataBase();

    const { question, content, author, path } = prop;

    const newAnswer = await Answer.create({ author, content, question });

    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    revalidatePath(path);
  } catch (error) {
    console.error(`error in getQuestionById server action is :${error}`);
  }
}
export async function getAllAnswers(params: GetAnswersParams) {
  try {
    connectToDataBase();
    const { questionId } = params;
    const answers = await Answer.find({ question: questionId })
      .populate({
        path: "author",
        model: User,
        select: "_id name picture clerkId",
      })
      .sort({ createdAt: -1 });
    return answers;
  } catch (error) {
    console.error(`error (in getAllAnswers server action) is :${error}`);
  }
}
