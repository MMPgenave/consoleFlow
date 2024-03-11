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
    <div className="flex justify-between items-center ">
      <Link
        href={url}
        className="text-dark-400 dark:text-gray-800 dark:bg-gray-300 py-1 h3-regular px-4 bg-light-700 w-fit rounded-md uppercase"
      >
        {text}
      </Link>
      {showScore && <div className="text-dark400_light800">{score}</div>}
    </div>
  );
};

export default Tag;
