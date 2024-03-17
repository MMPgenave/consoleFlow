/* eslint-disable camelcase */
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
    <div className="mt-[50px] flex flex-col items-center gap-3 px-[100px]">
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
        className="hidden dark:flex"
      />
      <h1 className="h2-bold text-dark200_light900 ">{title}</h1>
      <p className="body-regular text-dark500_light700">{description}</p>
      <Link
        href={button_href}
        className="primary-gradient  paragraph-medium rounded-md px-4 py-3 text-light-900 hover:opacity-80"
      >
        {button_content}
      </Link>
    </div>
  );
};

export default NoResult;
