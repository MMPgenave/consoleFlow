"use server";

import { User } from "@/database/user.model";
import { connectToDataBase } from "../mongoose";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types";
import { Tag } from "@/database/tag.model";

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
    
    const tags = await Tag.find({});
    return {tags}
    
  } catch (error) {
    console.error(error);
  }
}
