"use client";
import { Button } from "@/components/ui/button";
import { formUrlQuery } from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
interface PaginationPropsType {
  pageNumber: number;
  isNext: boolean;
}
const Pagination = ({ pageNumber, isNext }: PaginationPropsType) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  function handleNavigation(navigate: string) {
    const nextPageNumber = navigate === "prev" ? pageNumber - 1 : pageNumber + 1;
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPageNumber.toString(),
    });
    router.push(newUrl, { scroll: true });
  }

  if (!isNext && pageNumber === 1) {
    return null;
  }

  return (
    <div className="mt-10 flex w-full  items-center justify-center gap-2">
      <Button
        onClick={() => handleNavigation("prev")}
        disabled={pageNumber === 1}
        className="light-border-2  flex h-9 min-h-[36px] items-center justify-center gap-2 rounded-md border  px-4 py-2 text-sm font-medium text-slate-50 shadow transition-colors hover:bg-slate-200  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-slate-50 dark:!text-gray-900 dark:hover:bg-slate-50/90 "
      >
        <p className="body-medium text-dark200_light800">قبلی</p>
      </Button>
      <div className="flex items-center justify-center rounded-md bg-primary-500 px-3.5 py-2">
        <p className="body-semibold text-light-900">{pageNumber}</p>
      </div>
      <Button
        disabled={!isNext}
        onClick={() => handleNavigation("next")}
        className="light-border-2  flex h-9 min-h-[36px] items-center justify-center gap-2 rounded-md border  px-4 py-2 text-sm font-medium text-slate-50 shadow transition-colors hover:bg-slate-200  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-slate-50 dark:!text-gray-900 dark:hover:bg-slate-50/90 "
      >
        <p className="body-medium text-dark200_light800">بعدی</p>
      </Button>
    </div>
  );
};

export default Pagination;
