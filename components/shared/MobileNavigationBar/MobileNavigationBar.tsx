"use client";
import React from "react";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { SignedOut, useAuth } from "@clerk/nextjs";

const MobileNavigationBar = () => {
  const path = usePathname();
  const { userId } = useAuth();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          className="invert-colors cursor-pointer sm:hidden"
          src={"/assets/icons/hamburger.svg"}
          alt="humberger"
          height={36}
          width={36}
        />
      </SheetTrigger>
      <SheetContent side="right" className="background-light900_dark200 border-none pb-4">
        <SheetClose asChild>
          <Link className="flex items-center gap-2" href="/">
            <Image src="/assets/images/site-logo.svg" alt="logo" width={25} height={25} />
            <p className="h3-bold text-dark100_light900  ">
              توسعه<span className="mr-1 text-primary-500">جریان</span>
            </p>
          </Link>
        </SheetClose>

        <div className="flex w-4/5 flex-col gap-2   pt-14">
          {sidebarLinks.map((link) => {
            let { imgURL, route, label } = link;
            if (route === "/profile") {
              if (userId) {
                route = `${route}/${userId}`;
              } else {
                return null;
              }
            }
            return (
              <SheetClose key={label} asChild>
                <Link
                  href={route}
                  className={`text-dark300_light900 flex items-center gap-4 rounded-lg bg-transparent p-4 ${
                    route !== "/tags"
                      ? route === path && "primary-gradient"
                      : path.includes(route) && "primary-gradient"
                  }`}
                >
                  <Image src={imgURL} width={20} height={20} alt={label} className="invert-colors" />
                  <div className="base-medium text-dark200_light800 ">{label}</div>
                </Link>
              </SheetClose>
            );
          })}
        </div>

        <SignedOut>
          <div className="mx-auto mt-4 flex w-1/2 flex-col  gap-2    ">
            <SheetClose asChild>
              <Link
                href={"/sign-in"}
                className="small-medium  inline-flex h-9 min-h-[41px]
             w-full items-center justify-center rounded-lg
             bg-slate-900 px-4 py-3 text-sm font-medium
              text-slate-50 shadow-none transition-colors
               hover:bg-slate-900/90 focus-visible:outline-none
                focus-visible:ring-1 focus-visible:ring-slate-950
                 disabled:pointer-events-none disabled:opacity-50
                  dark:bg-slate-50 dark:text-slate-900
               dark:hover:bg-slate-50/90 dark:focus-visible:ring-slate-300"
              >
                <div className="flex ">
                  <div className="primary-text-gradient ">ورود</div>
                </div>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href={"/sign-up"}
                className="small-medium  inline-flex h-9 min-h-[41px]
             w-full items-center justify-center rounded-lg
             bg-slate-900 px-4 py-3 text-sm font-medium
              text-slate-50 shadow-none transition-colors
               hover:bg-slate-900/90 focus-visible:outline-none
                focus-visible:ring-1 focus-visible:ring-slate-950
                 disabled:pointer-events-none disabled:opacity-50
                  dark:bg-slate-50 dark:text-slate-900
               dark:hover:bg-slate-50/90 dark:focus-visible:ring-slate-300"
              >
                <div className="flex ">
                  <div className="primary-text-gradient ">ساخت حساب</div>
                </div>
              </Link>
            </SheetClose>
          </div>
        </SignedOut>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigationBar;
