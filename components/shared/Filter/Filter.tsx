"use client";
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/utils";
interface filterObject {
  name: string;
  value: string;
}
interface customType {
  filterData: Array<filterObject>;
  placeholder: string;
  otherClasses?: string;
  height?: string;
}

const Filter = ({ filterData, placeholder, otherClasses, height }: customType) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramFilter = searchParams.get("filter");
  function handleClick(value: string) {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "filter",
      value,
    });
    router.push(newUrl, { scroll: false });
  }
  return (
    <div className="max-sm:w-full">
      <Select onValueChange={(value) => handleClick(value)} defaultValue={paramFilter || undefined}>
        <SelectTrigger
          dir="rtl"
          className={`relative w-full  sm:min-w-[180px] ${height} light-border background-light800_dark300  text-dark500_light700 border px-5 py-2.5`}
        >
          <SelectValue className="flex-1 " placeholder={placeholder} dir="rtl" />
        </SelectTrigger>
        <SelectContent className=" background-light900_dark300 border-none ">
          {filterData.map((item) => (
            <div key={item.value}>
              <SelectItem
                value={item.value}
                dir="rtl"
                className="text-dark500_light700 small-regular cursor-pointer focus:bg-light-800 dark:focus:bg-dark-400"
              >
                {item.name}
              </SelectItem>
            </div>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
