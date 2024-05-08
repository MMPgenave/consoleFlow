import { URLProps } from "@/types";
import Image from "next/image";
import React from "react";

const DrinkDetailsPage = async ({ params, searchParams }: URLProps) => {
  return (
    <div className="flex flex-col items-center gap-5">
      <Image src={searchParams.imgUrl!} width={400} height={400} alt="s" className="rounded-lg object-cover" />
      <div className="flex flex-col items-center">
        <div className="text-dark400_light800 h1-bold">
          {searchParams.name} <span className="mx-1">{searchParams.category}</span>{" "}
        </div>

        <p className="text-dark400_light800 h2-bold"> {searchParams.type === "Alcoholic" ? "الکلی" : "غیرالکلی"}</p>
      </div>
    </div>
  );
};

export default DrinkDetailsPage;
