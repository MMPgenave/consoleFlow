import { Schema, models, model, Document } from "mongoose";

export interface ITag extends Document {
  text: string;
  description: string;
  inQuestionsUsed: Schema.Types.ObjectId[];
  followers: Schema.Types.ObjectId[];
  createdOn: Date;
}

const TagSchema = new Schema<ITag>({
  text: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  inQuestionsUsed: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdOn: { type: Date, default: Date.now },
});

export const Tag = models.Tag || model("Tag", TagSchema);
