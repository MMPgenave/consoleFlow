"use client";
import Image from "next/image";
import React from "react";
interface CustomType {
  path: string;
  placeholder: string;
}

const SearchQuestions = ({ path, placeholder }: CustomType) => {
  return (
    <div className="w-full background-light800_darkgradient min-h-[50px] rounded-md   flex gap-2 px-2">
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
        className=" outline-none pr-1 bg-inherit flex-grow dark:text-slate-200"
      />
    </div>
  );
};

export default SearchQuestions;
