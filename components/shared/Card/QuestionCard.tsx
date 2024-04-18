"use client";
import React from "react";
import Tag from "../Tag/Tag";
import Link from "next/link";
import Metric from "../Metric/Metric";
import { timeStampCalculator, formatNumber } from "@/utils";
import { SignedIn } from "@clerk/nextjs";
import EditeDeleteAction from "../EditeDeleteAction/EditeDeleteAction";
interface PropType {
  question: {
    _id: string;
    title: string;
    tags: { _id: string; text: string }[];
    author: { _id: string; name: string; picture: string; clerkId: string };
    upvotes: string[];
    downvotes: string[];
    answers: Array<object>;
    views: number;
    createdAt: string;
  };
  clerkId?: string;
}

const QuestionCard = ({ question, clerkId }: PropType) => {
  return (
    <div
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className="dark:dark-gradient flex w-full flex-col rounded-md  bg-light-900   p-9  shadow-light-100 sm:px-11"
    >
      <div className="flex flex-col gap-1">
        <div className="small-regular text-dark400_light800 sm:hidden">{timeStampCalculator(question.createdAt)}</div>

        <div className="flex items-center justify-between">
          <Link
            href={`/question/${question._id}`}
            className="text-dark200_light900  sm:h3-semibold base-semibold line-clamp-1 hover:opacity-80"
          >
            {question.title}
          </Link>
          {/* if user signed in, add edit and delete actions */}
          <SignedIn>
            {question.author.clerkId === clerkId && (
              <div>
                <EditeDeleteAction itemId={question._id} type="Question" />
              </div>
            )}
          </SignedIn>
        </div>
      </div>

      <div className="mt-3.5 flex flex-wrap gap-2">
        {question.tags.map((tag) => {
          return <Tag text={tag.text} showScore={false} url={tag._id} key={tag._id} />;
        })}
      </div>

      <div className="mt-6 flex w-full flex-wrap items-center justify-between max-lg:gap-3">
        <Metric
          imgUrl={question.author.picture}
          text={question.author.name}
          value={timeStampCalculator(question.createdAt)}
          isAuthor={true}
          textClasses="body-medium text-dark400_light700"
          href={`/profile/${question.author.clerkId}`}
        />
        <div className="flex items-center gap-4">
          <Metric
            imgUrl="/assets/icons/like.svg"
            text="پسند "
            isAuthor={false}
            textClasses="small-regular text-dark400_light800"
            value={formatNumber(question.upvotes.length)}
          />
          <Metric
            imgUrl="/assets/icons/message.svg"
            text="جواب ها"
            isAuthor={false}
            textClasses="small-regular text-dark400_light800"
            value={formatNumber(question.answers.length)}
          />
          <Metric
            imgUrl="/assets/icons/eye.svg"
            text=" بازدید"
            isAuthor={false}
            textClasses="small-regular text-dark400_light800"
            value={formatNumber(question.views)}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
