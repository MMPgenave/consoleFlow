"use client";
import React, { useState } from "react";
interface PropType {
  filterData: {
    name: string;
    value: string;
  }[];
}
const HomePageFilter = ({ filterData }: PropType) => {
  const [active, setActive] = useState("");
  return (
    <div className="max-md:hidden flex items-center gap-2 mt-10">
      {filterData.map((data) => {
        return (
          <div
            key={data.value}
            className={`text-dark-400 dark:text-gray-200 dark:bg-gray-500 py-2 px-4 cursor-pointer capitalize hover:opacity-80
             bg-light-700 w-fit rounded-md ${
               active === data.value &&
               "!text-primary-500 !bg-primary-100 h2-regular"
             }`}
            onClick={() => {
              setActive(data.value);
            }}
          >
            {data.name}
          </div>
        );
      })}
    </div>
  );
};

export default HomePageFilter;
