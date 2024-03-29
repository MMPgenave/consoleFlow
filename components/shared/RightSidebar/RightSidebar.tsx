"use client";
import React from "react";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SignedOut } from "@clerk/nextjs";
const RightSidebar = () => {
  const path = usePathname();
  return (
    <div
      className="custom-scrollbar background-light900_dark200 light-border  sticky right-0 top-0 hidden 
    h-screen w-fit flex-col gap-6  overflow-y-auto  p-4 pt-36
     shadow-light-200 dark:shadow-none  max-lg:w-20 sm:flex lg:w-[266px]"
    >
      {sidebarLinks.map((link) => {
        const { imgURL, route, label } = link;
        return (
          <Link
            href={route}
            className={`text-dark300_light900 flex items-center gap-4 rounded-lg bg-transparent p-4 ${
              route === path && "primary-gradient"
            }`}
            key={label}
          >
            <Image
              src={imgURL}
              width={20}
              height={20}
              alt={label}
              className="invert-colors"
            />
            <div className="base-medium text-dark200_light800 max-lg:hidden">
              {label}
            </div>
          </Link>
        );
      })}
      <SignedOut>
        <div className="text-dark200_light800 base-medium mt-4   flex flex-col  items-center gap-3 lg:px-8">
          <Link
            href={"/sign-in"}
            className="lg:background-light900_dark300 rounded-lg px-4 py-2"
          >
            <div className="flex gap-4">
              <Image
                src="/assets/icons/account.svg"
                width={20}
                height={20}
                className=" invert-colors"
                alt="sign-in"
              />
              <div className="primary-text-gradient hidden lg:block">ورود</div>
            </div>
          </Link>
          <Link
            href={"/sign-up"}
            className="lg:background-light900_dark300 rounded-lg px-4 py-2"
          >
            <div className="flex gap-4">
              <Image
                src="/assets/icons/sign-up.svg"
                width={20}
                height={20}
                className="invert-colors"
                alt="sign-up"
              />
              <div className="text-dark300_light900 hidden text-[16px] lg:block">
                ساخت حساب
              </div>
            </div>
          </Link>
        </div>
      </SignedOut>
    </div>
  );
};

export default RightSidebar;
