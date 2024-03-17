import Link from "next/link";
import React from "react";
interface TagProps {
  text: string;
  score?: number;
  showScore: boolean;
  url: string;
}
const Tag = ({ text, score, showScore, url }: TagProps) => {
  return (
    <div className="flex items-center justify-between ">
      <Link
        href={url}
        className=" w-fit rounded-md bg-light-700 px-4 py-1 uppercase text-dark-400 dark:bg-gray-300 dark:text-gray-800"
      >
        {text}
      </Link>
      {showScore && <div className="text-dark400_light800">{score}</div>}
    </div>
  );
};

export default Tag;
