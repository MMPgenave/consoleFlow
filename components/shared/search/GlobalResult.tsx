"use client";
import React, { useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import GlobalFilters from "./GlobalFilters";
import { globalSearch } from "@/lib/actions/general.action";
const GlobalResult = () => {
  const searchParams = useSearchParams();
  const [isloading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);
  const global = searchParams.get("global");
  const type = searchParams.get("type");
  useEffect(() => {
    const fetchResult = async () => {
      setResult([]);
      setIsLoading(true);
      try {
        const res = await globalSearch({ query: global, type });
        setResult(JSON.parse(res));
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    if (global) {
      fetchResult();
    }
  }, [global, type]);

  const renderLink = (type: string, id: string) => {
    switch (type) {
      case "question":
        return `/question/${id}`;
      case "answer":
        return `/question/${id}`;
      case "user":
        return `/profile/${id}`;
      case "tag":
        return `/tags/${id}`;

      default:
        return "/";
    }
  };

  return (
    <div
      className="absolute top-full z-10 mt-3 w-full rounded-xl
     bg-light-800 py-5 shadow-sm dark:bg-dark-400"
    >
      <GlobalFilters />

      <div className="my-5 h-px bg-light-700/50 dark:bg-dark-500/50" />
      <div className="space-y-5 ">
        <p className="text-dark400_light900 paragraph-semibold px-5">برترین هم‌خوان</p>
        {isloading ? (
          <div className="flex flex-col items-center px-5">
            <ReloadIcon className="my-2 size-10 animate-spin text-primary-500" />
            <p className="text-dark200_light800 body-regular">جستجو در کل دیتابیس</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {result.length > 0 ? (
              result.map((item: any, index: number) => {
                return (
                  <Link
                    key={item.id + index + item.type}
                    href={renderLink(item.type, item.id)}
                    className="flex w-full cursor-pointer items-start gap-3 px-5 py-2.5
                      hover:bg-light-700/50 dark:hover:bg-dark-500/50"
                  >
                    <Image
                      src={"/assets/icons/tag.svg"}
                      alt="tag"
                      width={18}
                      height={18}
                      className="invert-colors mt-1 object-contain"
                    />
                    <div className="flex flex-col ">
                      <p className="body-medium text-dark200_light800 line-clamp-1"> {item.title}</p>
                      <p className="small-medium text-dark400_light500 mt-1 line-clamp-1 capitalize">
                        {item.type === "question"
                          ? "سوال"
                          : item.type === "answer"
                            ? "جواب"
                            : item.type === "user"
                              ? "کاربر"
                              : "تگ"}
                      </p>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="flex flex-col items-center px-5">
                <p className="text-dark200_light800 body-regular px-5 py-2.5">نتیجه ای یافت نشد!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalResult;
