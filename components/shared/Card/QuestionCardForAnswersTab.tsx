import { formatNumber, timeStampCalculator } from "@/utils";
import Link from "next/link";
import React from "react";
import Metric from "../Metric/Metric";
import { SignedIn } from "@clerk/nextjs";
import EditeDeleteAction from "../EditeDeleteAction/EditeDeleteAction";
// import { IAnswer } from "@/database/answer.model";
interface PropType {
  question: {
    _id: string;
    title: string;
    author: { _id: string; name: string; picture: string; clerkId: string };
    upvotes: string[];
    downvotes: string[];
    answers: Array<object>;
    views: number;
    createdAt: string;
  };
  answerUpvotes: number;
  clerkId?: string;
  answer: any;
}

const QuestionCardForAnswersTab = ({ question, answerUpvotes, clerkId, answer }: PropType) => {
  console.log(question.title);
  return (
    <div
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className="dark:dark-gradient flex w-full flex-col rounded-md bg-light-900    p-9 shadow-light-100 sm:px-11"
    >
      <div className="flex flex-col gap-1">
        <div className="small-regular text-dark400_light800 sm:hidden">{timeStampCalculator(question.createdAt)}</div>

        <div className="flex items-center justify-between">
          <Link
            href={`/question/${question._id}/#${answer._id}`}
            className="text-dark200_light900  sm:h3-semibold base-semibold line-clamp-1 hover:opacity-80"
          >
            {question.title}
          </Link>
          {/* if signed in add edit ,delete actions */}
          <SignedIn>
            {clerkId === answer.author.clerkId && (
              <div>
                <EditeDeleteAction itemId={answer._id} type="Answer" />
              </div>
            )}
          </SignedIn>
        </div>
      </div>

      <div className="mt-6 flex w-full flex-wrap items-center justify-between">
        <Metric
          imgUrl={question.author.picture}
          text={question.author.name}
          value={timeStampCalculator(question.createdAt)}
          isAuthor={true}
          textClasses="body-medium text-dark400_light700"
          href={`/profile/${question.author.clerkId}`}
        />

        <Metric
          imgUrl="/assets/icons/like.svg"
          text="رای"
          isAuthor={false}
          textClasses="small-regular text-dark400_light800"
          value={formatNumber(answerUpvotes)}
        />
      </div>
    </div>
  );
};

export default QuestionCardForAnswersTab;
