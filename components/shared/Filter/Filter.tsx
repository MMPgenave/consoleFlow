import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface customType {
  filterData: Array<filterObject>;
  placeholder: string;
  otherClasses?: string;
  height?: string;
}
interface filterObject {
  name: string;
  value: string;
}
const Filter = ({
  filterData,
  placeholder,
  otherClasses,
  height,
}: customType) => {
  return (
    <div>
      <Select>
        <SelectTrigger
          className={`relative sm:min-w-[180px] ${height} light-border background-light800_dark300  text-dark500_light700 border px-5 py-2.5`}
        >
          <SelectValue
            className="text-right flex-1"
            placeholder={placeholder}
          />
        </SelectTrigger>
        <SelectContent className=" light-border background-light800_dark300 text-right">
          {filterData.map((item) => (
            <SelectItem
              value={item.value}
              key={item.value}
              className="text-dark500_light700 cursor-pointer text-right"
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
