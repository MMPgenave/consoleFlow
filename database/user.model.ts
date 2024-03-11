import { Schema, models, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  clerkId: string;
  username: string;
  email: string;
  password?: string;
  bio?: string;
  picture: string;
  location?: string;
  portfolioWebsite?: string;
  reputation?: number;
  saved: Schema.Types.ObjectId[];
  joinedAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  clerkId: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: String,
  bio: String,
  picture: { type: String, required: true },
  location: String,
  portfolioWebsite: String,
  reputation: { type: Number, default: 0 },
  saved: [{ type: Schema.Types.ObjectId, ref: " Question" }],
  joinedAt: { type: Date, default: Date.now },
});

export const User = models.User || model("User", UserSchema);
