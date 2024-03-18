import React from "react";
import Image from "next/image";
const Search = () => {
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Image
          src={"/assets/icons/search.svg"}
          width={24}
          height={24}
          alt="search-icon "
          className="cursor-pointer"
        />
        <input
          type="text"
          placeholder="جستجو کلی در وبسایت"
          className="paragraph-regular placeholder text-dark400_light700 flex h-9 
           w-full rounded-md border border-none
            border-slate-200 bg-transparent px-3
             py-1 text-sm shadow-none
              outline-none transition-colors
                file:border-0 
               file:bg-transparent file:text-sm
                file:font-medium placeholder:text-slate-500
                 focus-visible:outline-none focus-visible:ring-slate-950 
                 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 
                 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
        />
      </div>
    </div>
  );
};

export default Search;
