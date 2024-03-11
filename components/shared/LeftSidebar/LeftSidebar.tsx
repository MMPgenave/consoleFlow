import React from "react";
import { RightSidebar_data, PoplularTags } from "@/constants/index";
import Link from "next/link";
import Image from "next/image";
import Tag from "../Tag/Tag";
const LeftSidebar = () => {
  const sortedPopularTags = PoplularTags.sort((tags1, tags2) => {
    return tags2.socre - tags1.socre;
  });
  return (
    <div
      className="custom-scrollbar background-light900_dark200 light-border sticky
     left-0 top-0 flex h-screen w-fit  flex-col justify-between
      overflow-y-auto border-r p-6 pt-36 text-gray-900 
       shadow-light-300  dark:shadow-none max-sm:hidden lg:w-[300px] "
    >
      <div className="text-dark400_light800 h3-bold">سوالات تاپ</div>
      <div className="mt-3 flex flex-col gap-4">
        {RightSidebar_data.map((data) => {
          return (
            <Link
              key={data.id}
              href={data.URL}
              className="flex w-[95%] items-center justify-between hover:opacity-80"
            >
              <div className="text-dark400_light800 w-[80%]"> {data.text}</div>
              <Image
                src="/assets/icons/arrow-left.svg"
                alt="arrow"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          );
        })}
      </div>
      <div className="text-dark400_light800 h3-bold mt-6"> تگ های ترند</div>
      <div className="mt-3 flex flex-col gap-4 pr-2">
        {sortedPopularTags.map((data) => {
          return (
            <Tag
              key={data.id}
              text={data.text}
              score={data.socre}
              showScore={true}
              url={data.url}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LeftSidebar;
