"use server";

import { Question } from "@/database/question.model";
import { connectToDataBase } from "../mongoose";
import { ViewQuestionParams } from "./shared.types";
import { InteractionTow } from "@/database/interaction.model";

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    await connectToDataBase();
    const { userId, questionId } = params;

    if (userId) {
      const existingInteractionTow = await InteractionTow.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });
      if (existingInteractionTow) {
        return console.log("You viewed this question before!");
      } else {
        // update view count for this question
        console.log("You see this question for the first time");
        await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });
      }
    }
    await InteractionTow.create({
      user: userId,
      question: questionId,
      action: "view",
    });
  } catch (error) {
    console.error(`Error in viewQuestion server action is :${error}`);
  }
}
