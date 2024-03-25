"use server";

import { connectToDataBase } from "../mongoose";
import { Question } from "@/database/question.model";
import { Tag } from "@/database/tag.model";
import { User } from "@/database/user.model";
import {
  CreateQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
} from "@/lib/actions/shared.types";
import { revalidatePath } from "next/cache";

export async function createQuestion(params: CreateQuestionParams) {
  try {
    connectToDataBase();

    const { title, content, tags, author, path } = params;

    // create the question
    const question = await Question.create({
      title,
      content,
      author,
    });
    const tagDocuments = [];
    // create the tags or get them from the database if they already exist
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { text: { $regex: new RegExp(`^${tag}$`, "i") } },
        {
          $setOnInsert: { text: tag },
          $push: {
            question: question._id,
          },
        },
        { upsert: true, new: true },
      );
      tagDocuments.push(existingTag._id);
    }
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });
    revalidatePath(path);
    // create an interaction record for the user's ask_question action

    // Increments author reputation by +5 for creating a question
  } catch (error) {
    console.log(`error from mongodb connection :${error}`);
  }
}

export async function getAllQuestions(params: GetQuestionsParams) {
  try {
    connectToDataBase();
    const questions = await Question.find({})
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });
    // calculate each questions answers
    // for (let i=0;i<questions.length;i++){
    //     if (questions[i]._id===)
    // }
    return { questions };
  } catch (error) {
    console.error(`error in getAllQuestions server action is :${error}`);
  }
}

export async function getQuestionById(params: GetQuestionByIdParams) {
  try {
    connectToDataBase();
    const { questionId } = params;
    const question = await Question.findById({ _id: questionId })
      .populate({ path: "tags", model: Tag, select: "_id text" })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      });

    return { question };
  } catch (error) {
    console.error(`error in getQuestionById server action is :${error}`);
  }
}
