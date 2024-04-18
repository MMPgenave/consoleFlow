import Image from "next/image";
import Link from "next/link";
import React from "react";
interface MetricType {
  imgUrl: string;
  text: string;
  isAuthor?: boolean;
  textClasses: string;
  value: string;
  href?: string;
}

const Metric = ({ imgUrl, text, isAuthor, textClasses, value, href = "/" }: MetricType) => {
  const MetricContent = (
    <div className="flex items-center gap-1">
      <Image
        src={imgUrl}
        width={isAuthor ? 35 : 15}
        height={isAuthor ? 35 : 15}
        alt={text}
        className={`${isAuthor && "rounded-full object-cover"}`}
      />
      <div className="flex items-center gap-1">
        <div className={`${textClasses}`}>{text}</div>
        <div className={`small-regular line-clamp-1 ${textClasses} ${isAuthor && "max-sm:hidden"}`}>{value}</div>
      </div>
    </div>
  );
  if (isAuthor) {
    return (
      <Link href={href} className="flex items-center gap-2 hover:opacity-80">
        {MetricContent}
      </Link>
    );
  }
  return MetricContent;
};

export default Metric;
