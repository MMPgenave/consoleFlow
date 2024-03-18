import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const Filter = ({
  filterData,
  placeholder,
  otherClasses,
  height,
}: customType) => {
  return (
    <div className="max-sm:w-full">
      <Select>
        <SelectTrigger
          dir="rtl"
          className={`relative w-full  sm:min-w-[180px] ${height} light-border background-light800_dark300  text-dark500_light700 border px-5 py-2.5`}
        >
          <SelectValue
            className="flex-1 "
            placeholder={placeholder}
            dir="rtl"
          />
        </SelectTrigger>
        <SelectContent className=" light-border background-light800_dark300 ">
          {filterData.map((item) => (
            <SelectItem
              value={item.value}
              key={item.value}
              dir="rtl"
              className="text-dark500_light700 cursor-pointer "
            >
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
