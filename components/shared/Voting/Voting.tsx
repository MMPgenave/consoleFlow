"use client";
import {
  downvoteQuestion,
  upvoteQuestion,
} from "@/lib/actions/question.action";
import Image from "next/image";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toggleSaveQuestion } from "@/lib/actions/user.action";
import { downvoteAnswer, upvoteAnswer } from "@/lib/actions/answer.action";
import { viewQuestion } from "@/lib/actions/interaction.action";
import { useToast } from "@/components/ui/use-toast"

interface Prop {
  type: string;
  ItemId: string;
  userId: string;
  upvoteNumber: string;
  hasUpvoted: boolean;
  downvotes: number;
  hasDownvoted: boolean;
  isSaved?: boolean;
  showSaveIcon: boolean;
}
const Voting = ({
  ItemId,
  userId,
  upvoteNumber,
  type,
  hasUpvoted,
  downvotes,
  hasDownvoted,
  isSaved,
  showSaveIcon,
}: Prop) => {
  const path = usePathname();
  const router = useRouter();
  const { toast } = useToast()

  useEffect(() => {
    if (type === "Question") {
      viewQuestion({
        userId: userId ? JSON.parse(userId) : undefined,
        questionId: JSON.parse(ItemId),
      });
      console.log("question viewed");
    }
  }, [path, router, userId, ItemId]);
  async function voteHandler(action: string) {
    try {
      if (!userId) {
        toast({
          title:  "لطفا وارد حساب کاربری خود شوید",
          description:"برای رای دادن باید وارد حساب کاربری شوید",
        })
        return;
    
      }
      if (action === "upvote") {
        if (type === "Question") {
          await upvoteQuestion({
            questionId: JSON.parse(ItemId),
            userId: JSON.parse(userId),
            path,
            hasupVoted: hasUpvoted,
            hasdownVoted: hasDownvoted,
          });
          toast({
            title:  "ایول که به این سوال رای دادی",
            description:"سوال با موفقیت رای دادی",
          })
        } else if (type === "Answer") {
          await upvoteAnswer({
            answerId: JSON.parse(ItemId),
            userId: JSON.parse(userId),
            path,
            hasupVoted: hasUpvoted,
            hasdownVoted: hasDownvoted,
          });
        }
        // show a toast
        return;
      }
      if (action === "downvote") {
        if (type === "Question") {
          await downvoteQuestion({
            questionId: JSON.parse(ItemId),
            userId: JSON.parse(userId),
            path,
            hasupVoted: hasUpvoted,
            hasdownVoted: hasDownvoted,
          });
        } else if (type === "Answer") {
          await downvoteAnswer({
            answerId: JSON.parse(ItemId),
            userId: JSON.parse(userId),
            path,
            hasupVoted: hasUpvoted,
            hasdownVoted: hasDownvoted,
          });
        }
        // show a toast
      }
    } catch (error) {
      console.error(`error in upvote function is :${error}`);
    }
  }
  async function saveThisQuestion() {
    try {
      await toggleSaveQuestion({
        questionId: JSON.parse(ItemId),
        userId: JSON.parse(userId),
        path,
      });
    } catch (error) {
      console.error(`error in saveThisQuestion function is :${error}`);
    }
  }
  return (
    <div className="flex items-center gap-5">
      <div className="flex items-center gap-2.5">
        <Image
          src={
            hasUpvoted
              ? "/assets/icons/upvoted.svg"
              : "/assets/icons/upvote.svg"
          }
          width={18}
          height={18}
          alt="upvote"
          className="cursor-pointer"
          onClick={() => voteHandler("upvote")}
        />
        <div className=" background-light700_dark400 flex min-w-[18px] items-center justify-center rounded-sm p-1">
          <p className="subtle-medium text-dark400_light900">{upvoteNumber}</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Image
          src={
            hasDownvoted
              ? "/assets/icons/downvoted.svg"
              : "/assets/icons/downvote.svg"
          }
          width={18}
          height={18}
          alt="down-vote"
          className="cursor-pointer"
          onClick={() => voteHandler("downvote")}
        />
        <div className=" background-light700_dark400 flex min-w-[18px] items-center justify-center rounded-sm p-1">
          <p className="subtle-medium text-dark400_light900"> {downvotes}</p>
        </div>
      </div>
      {showSaveIcon && (
        <div onClick={() => saveThisQuestion()}>
          {isSaved ? (
            <Image
              src={"/assets/icons/star-filled.svg"}
              width={18}
              height={18}
              alt="star-red"
              className="cursor-pointer"
            />
          ) : (
            <Image
              src={"/assets/icons/star-red.svg"}
              width={18}
              height={18}
              alt="star-red"
              className="cursor-pointer"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Voting;
