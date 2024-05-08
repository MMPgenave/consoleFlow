"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, UserButton } from "@clerk/nextjs";
import ThemeSwitcher from "./ThemeSwitcher";
import MobileNavigationBar from "../MobileNavigationBar/MobileNavigationBar";
import GlobalSearchingSystem from "../search/GlobalSearch";
import { usePathname } from "next/navigation";
import Notification from "../Notification/Notification";
const Navbar = () => {
  const currentPath = usePathname();
  return (
    <nav className="background-light900_dark200 fixed z-50  flex w-full justify-between gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12 ">
      <Link className="flex items-center gap-2" href="/">
        <Image src="/assets/images/site-logo.svg" alt="logo" width={25} height={25} />
        <p className="h3-bold text-dark-100 dark:text-light-900 max-sm:hidden">
          توسعه<span className="mr-1 text-primary-500">جریان</span>
        </p>
      </Link>
      <GlobalSearchingSystem />
      <div className="flex items-center justify-between gap-4">
        <ThemeSwitcher />
        <SignedIn>
          <UserButton
            afterSignOutUrl={currentPath}
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
              variables: {
                colorPrimary: "#ff7000",
              },
            }}
          />
        </SignedIn>
        <Notification />
        <MobileNavigationBar />
      </div>
    </nav>
  );
};

export default Navbar;
