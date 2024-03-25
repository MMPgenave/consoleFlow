"use server";

import { Answer } from "@/database/answer.model";
import { connectToDataBase } from "../mongoose";
import { CreateAnswerParams } from "./shared.types";

export async function answersToQuestion(prop:CreateAnswerParams) {
    try {
      connectToDataBase();
  
      const {question,content,author,path}=prop;

      await Answer.create({author,content,question})
  
      
      
    
    } catch (error) {
      console.error(`error in getQuestionById server action is :${error}`);
    }
  }
  