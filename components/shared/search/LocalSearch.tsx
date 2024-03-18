"use client";
import Image from "next/image";
import React from "react";
interface CustomType {
  route: string;
  placeholder: string;
}

const SearchQuestions = ({ route, placeholder }: CustomType) => {
  return (
    <div className="background-light800_darkgradient flex min-h-[50px] w-full   gap-2 rounded-md px-2">
      <Image
        src={"/assets/icons/search.svg"}
        width={20}
        height={20}
        alt="search-icon"
        className="invert-colors cursor-pointer"
      />
      <input
        type="text"
        placeholder={placeholder}
        className=" grow bg-inherit pr-1 outline-none dark:text-slate-200"
      />
    </div>
  );
};

export default SearchQuestions;
