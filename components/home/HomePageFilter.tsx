"use client";
import { formUrlQuery } from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
interface PropType {
  filterData: {
    name: string;
    value: string;
  }[];
}
const HomePageFilter = ({ filterData }: PropType) => {
  const [active, setActive] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleClick(value: string) {
    if (active !== value) {
      setActive(value);
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value,
      });
      router.push(newUrl, { scroll: false });
    } else {
      setActive("");
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: null,
      });
      router.push(newUrl, { scroll: false });
    }
  }
  return (
    <div className="mt-10 flex flex-wrap items-center gap-2 max-md:hidden">
      {filterData.map((data) => {
        return (
          <div
            key={data.value}
            className={`w-fit cursor-pointer rounded-md bg-light-700 px-4 py-2 capitalize text-dark-400
             hover:opacity-80 dark:bg-gray-500 dark:text-gray-200 ${
               active === data.value && " !bg-primary-100 !text-primary-500"
             }`}
            onClick={() => handleClick(data.value)}
          >
            {data.name}
          </div>
        );
      })}
    </div>
  );
};

export default HomePageFilter;
