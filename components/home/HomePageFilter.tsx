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
    <div className="mt-10 flex items-center gap-2 max-md:hidden">
      {filterData.map((data) => {
        return (
          <div
            key={data.value}
            className={`w-fit cursor-pointer rounded-md bg-light-700 px-4 py-2 capitalize text-dark-400
             hover:opacity-80 dark:bg-gray-500 dark:text-gray-200 ${
               active === data.value &&
               " !bg-primary-100 !text-primary-500"
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
