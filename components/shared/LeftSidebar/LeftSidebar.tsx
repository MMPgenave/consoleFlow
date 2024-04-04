/* eslint-disable camelcase */
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Tag from "../Tag/Tag";
import { getHotQuestions } from "@/lib/actions/question.action";
import { getHotTags } from "@/lib/actions/tag.action";
const LeftSidebar = async () => {
  const result = await getHotQuestions();
  const hotQuestions = result?.questions;
  const request = await getHotTags();
  const hotTags = request!.tags;
  return (
    <div
      className="custom-scrollbar background-light900_dark200 light-border sticky
     left-0 top-0 flex h-screen w-fit  flex-col justify-between
      overflow-y-auto border-r p-6 pt-36 text-gray-900 
       shadow-light-300  dark:shadow-none max-sm:hidden lg:w-[360px] "
    >
      <div className="text-dark400_light800 h3-bold">سوالات تاپ</div>
      <div className="mt-5 flex flex-col gap-6">
        {hotQuestions!.map((data) => {
          return (
            <Link
              key={data._id}
              href={`/question/${data._id}`}
              className="flex w-[95%] items-center justify-between hover:opacity-80"
            >
              <div className="text-dark400_light800 w-[80%] text-sm">{data.title}</div>
              <Image src="/assets/icons/arrow-left.svg" alt="arrow" width={20} height={20} className="invert-colors" />
            </Link>
          );
        })}
      </div>
      <div className="text-dark400_light800 h3-bold mt-6"> تگ های ترند</div>
      <div className="mt-5 flex flex-col gap-6 pr-2">
        {hotTags.map((tag) => {
          return (
            <Tag key={tag._id} text={tag.text} score={tag.numberOfQuestions} showScore={true} url={`/${tag._id}`} />
          );
        })}
      </div>
    </div>
  );
};

export default LeftSidebar;
