"use server";

import { Question } from "@/database/question.model";
import { connectToDataBase } from "../mongoose";
import { SearchParams } from "./shared.types";
import { User } from "@/database/user.model";
import { Answer } from "@/database/answer.model";
import { Tag } from "@/database/tag.model";
const searchableTypes = ["question", "answer", "user", "tag"];
export async function globalSearch(params: SearchParams) {
  try {
    connectToDataBase();
    const { query, type } = params;
    const regexQuery = { $regex: query, $options: "i" };
    let results = [];
    const modelsAndTypes = [
      { model: Question, searchField: "title", type: "question" },
      { model: User, searchField: "name", type: "user" },
      { model: Answer, searchField: "content", type: "answer" },
      { model: Tag, searchField: "text", type: "tag" },
    ];
    const typeLower = type?.toLocaleLowerCase();

    if (!typeLower || !searchableTypes.includes(typeLower)) {
      // search every thing
      for (const { model, searchField, type } of modelsAndTypes) {
        const queryResults = await model.find({ [searchField]: regexQuery }).limit(2);

        results.push(
          ...queryResults.map((item) => {
            return {
              title: type === "answer" ? `جواب شامل ${query} ` : item[searchField],
              type,
              id: type === "user" ? item.clerkId : type === "answer" ? item.question._id : item._id,
            };
          }),
        );
      }
    } else {
      // search in specifed model
      const modelInfo = modelsAndTypes.find((item) => item.type === type);
      if (!modelInfo) {
        throw new Error("invalid search type");
      }
      const queryResults = await modelInfo.model.find({ [modelInfo.searchField]: regexQuery }).limit(8);

      results = queryResults.map((item) => {
        return {
          title: type === "answer" ? `جواب شامل ${query} ` : item[modelInfo.searchField],
          type,
          id: type === "user" ? item.clerkId : type === "answer" ? item.question._id : item._id,
        };
      });
    }
    return JSON.stringify(results);
  } catch (error) {
    console.error(`Error in globalSearch:${error}`);
    throw error;
  }
}
