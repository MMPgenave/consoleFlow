"use client";
import React from "react";
import Tag from "../Tag/Tag";
import Link from "next/link";
import Metric from "../Metric/Metric";
import { timeStampCalculator, formatNumber } from "@/utils";
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
}

const QuestionCard = ({ question }: PropType) => {
  return (
    <div
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className="card-wrapper flex w-full flex-col rounded-md  border bg-white p-9 sm:px-11"
    >
      <div className="flex flex-col gap-1">
        <div className="small-regular text-dark400_light800 sm:hidden">
          {timeStampCalculator(question.createdAt)}
        </div>
        <Link
          href={`/question/${question._id}`}
          className="text-dark200_light900  sm:h3-semibold base-semibold line-clamp-1 hover:opacity-80"
        >
          {question.title}
        </Link>
      </div>
      {/* if signed in add edit ,delete actions */}

      <div className="mt-3.5 flex flex-wrap gap-2">
        {question.tags.map((tag) => {
          return (
            <Tag
              text={tag.text}
              showScore={false}
              url={tag._id}
              key={tag._id}
            />
          );
        })}
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
          imgUrl="assets/icons/like.svg"
          text="پسند "
          isAuthor={false}
          textClasses="small-regular text-dark400_light800"
          value={formatNumber(question.upvotes.length)}
        />
        <Metric
          imgUrl="assets/icons/message.svg"
          text="جواب ها"
          isAuthor={false}
          textClasses="small-regular text-dark400_light800"
          value={formatNumber(question.answers.length)}
        />
        <Metric
          imgUrl="assets/icons/eye.svg"
          text=" بازدید"
          isAuthor={false}
          textClasses="small-regular text-dark400_light800"
          value={formatNumber(question.views)}
        />
      </div>
    </div>
  );
};

export default QuestionCard;
