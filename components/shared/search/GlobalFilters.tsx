import { GlobalSearchFilters } from "@/constants/Filter";
import { formUrlQuery, removeKeysFromQuery } from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const GlobalFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const [active, setActive] = useState(type || "");
  function handleTypeClick(value: string) {
    if (active !== value) {
      setActive(value);
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value,
      });
      router.push(newUrl, { scroll: false });
    } else {
      setActive("");
      // const newUrl = formUrlQuery({
      //   params: searchParams.toString(),
      //   key: "type",
      //   value: null,
      // });
      const newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keys: ["type"],
      });
      router.push(newUrl, { scroll: false });
    }
  }
  return (
    <div className="flex items-center gap-5 px-5">
      <p className="text-dark400_light900 body-medium">فیلتر</p>
      <div className="flex gap-3">
        {GlobalSearchFilters.map((item) => (
          <button
            key={item.value}
            type="button"
            className={`light-border-2 small-medium rounded-2xl
              px-5 py-2 capitalize 
             
              dark:text-light-800 dark:hover:text-primary-500 
              ${
                active === item.value
                  ? "bg-primary-500 text-light-900"
                  : "bg-light-700 text-dark-400  hover:text-primary-500 dark:bg-dark-500"
              }`}
            onClick={() => handleTypeClick(item.value)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GlobalFilters;
