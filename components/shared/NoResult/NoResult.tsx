import Image from "next/image";
import Link from "next/link";
import React from "react";

interface propType {
  title: string;
  button_content: string;
  button_href: string;
  description: string;
}

const NoResult = ({
  title,
  button_content,
  button_href,
  description,
}: propType) => {
  return (
    <div className="mt-[50px] flex flex-col px-[100px] items-center gap-3">
      <Image
        src={"/assets/images/light-illustration.png"}
        width={250}
        height={200}
        alt="light-illustration"
        className="dark:hidden"
      />
      <Image
        src={"/assets/images/dark-illustration.png"}
        width={250}
        height={200}
        alt="dark-illustration"
        className="dark:flex hidden"
      />
      <h1 className="h2-bold text-dark200_light900 ">{title}</h1>
      <p className="body-regular text-dark500_light700">{description}</p>
      <Link
        href={button_href}
        className="primary-gradient  px-4 py-3 paragraph-medium text-light-900 rounded-md hover:opacity-80"
      >
        {button_content}
      </Link>
    </div>
  );
};

export default NoResult;
