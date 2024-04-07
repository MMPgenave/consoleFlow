"use client";
import { formUrlQuery, removeKeysFromQuery } from "@/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
interface CustomType {
  route: string;
  placeholder: string;
}

const SearchQuestions = ({ route, placeholder }: CustomType) => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const router = useRouter();
  const currentPath = usePathname();
  const [search, setSearch] = useState(query || "");
  useEffect(() => {
    const delayDebounceFcn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "q",
          value: search,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (currentPath === route) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keys: ["q"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);
    return () => clearTimeout(delayDebounceFcn);
  }, [search, route, router, currentPath, searchParams]);
  return (
    <div className="background-light800_darkgradient flex min-h-[50px] w-full   gap-2 rounded-md px-2">
      <Image
        src={"/assets/icons/search.svg"}
        width={20}
        height={20}
        alt="search-icon"
        className="invert-colors cursor-pointer"
      />
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder={placeholder}
        className=" grow bg-inherit pr-1 outline-none dark:text-slate-200"
      />
    </div>
  );
};

export default SearchQuestions;
