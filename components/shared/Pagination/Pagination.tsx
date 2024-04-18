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
        className="light-border-2 flex min-h-[36px] items-center justify-center  gap-2 border hover:bg-primary-100/80 dark:bg-slate-700"
      >
        <p className="body-medium text-dark200_light800">قبلی</p>
      </Button>
      <div className="flex items-center  justify-center rounded-md bg-primary-500 px-3.5 py-2">
        <p className="body-semibold text-light-900">{pageNumber}</p>
      </div>
      <Button
        disabled={!isNext}
        onClick={() => handleNavigation("next")}
        className="light-border-2 flex min-h-[36px] items-center justify-center  gap-2 border hover:bg-primary-100/80 dark:bg-slate-700"
      >
        <p className="body-medium text-dark200_light800">بعدی</p>
      </Button>
    </div>
  );
};

export default Pagination;
