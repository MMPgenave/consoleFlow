"use server";

import { User } from "@/database/user.model";
import { connectToDataBase } from "../mongoose";
import { GetAllTagsParams, GetQuestionsByTagIdParams, GetTopInteractedTagsParams } from "./shared.types";
import { ITag, Tag } from "@/database/tag.model";
import { Question } from "@/database/question.model";
import { FilterQuery } from "mongoose";
import { error } from "console";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDataBase();
    const { userId } = params;
    const user = await User.findById(userId);
    if (!user) throw new Error("user not found");
    // Find the interactions for the user and group by tags...
    // Interactions
    return [
      { _id: 1, name: "tag1" },
      { _id: 2, name: "tag2" },
    ];
  } catch (error) {
    console.error(error);
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDataBase();
    const { searchQuery, filter } = params;
    const query: FilterQuery<typeof Tag> = {};

    if (searchQuery) {
      query.$or = [{ text: { $regex: new RegExp(searchQuery, "i") } }];
    }

    let filterOptions = {};
    switch (filter) {
      case "popular":
        filterOptions = { inQuestionsUsed: -1 };
        break;
      case "recent":
        filterOptions = { createdOn: -1 };
        break;
      case "name":
        filterOptions = { text: 1 };
        break;
      case "old":
        filterOptions = { createdOn: 1 };
        break;

      default:
        break;
    }

    const tags = await Tag.find(query).sort(filterOptions);
    return { tags };
  } catch (error) {
    console.error(error);
  }
}
export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectToDataBase();
    // eslint-disable-next-line no-unused-vars
    const { tagId, page = 1, pageSize = 10, searchQuery } = params;

    const tagFilter: FilterQuery<ITag> = { _id: tagId };

    const tag = await Tag.findOne(tagFilter).populate({
      path: "inQuestionsUsed",
      model: Question,
      match: searchQuery ? { title: { $regex: searchQuery, $options: "i" } } : {},
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "tags", model: Tag },
        { path: "author", model: User },
      ],
    });
    if (!tag) {
      console.log("Tag not found!.");
      throw error;
    }
    const questions = tag.inQuestionsUsed;
    return { tagName: tag.text, questions };
  } catch (error) {
    console.error(`Error in getTagById is : ${error}`);
  }
}
export async function getHotTags() {
  try {
    connectToDataBase();

    const tags = await Tag.aggregate([
      { $project: { text: 1, numberOfQuestions: { $size: "$inQuestionsUsed" } } },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 5 },
    ]);
    return { tags };
  } catch (error) {
    console.error(error);
  }
}
