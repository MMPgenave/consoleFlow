import { Schema, models, model, Document } from "mongoose";

export interface IInteractionTow extends Document {
  action: string;
  user: Schema.Types.ObjectId; // reference to the user
  question: Schema.Types.ObjectId; // reference to the question
  answer: Schema.Types.ObjectId; // reference to the answer
  tags: Schema.Types.ObjectId[];
  createdAt: Date;
}

const InteractionTowSchema = new Schema<IInteractionTow>({
  action: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  question: { type: Schema.Types.ObjectId, ref: "Question" },
  answer: { type: Schema.Types.ObjectId, ref: "Answer" },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  createdAt: { type: Date, default: Date.now },
});

export const InteractionTow =
  models.InteractionTow || model("InteractionTow", InteractionTowSchema);
