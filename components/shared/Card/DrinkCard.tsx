import Image from "next/image";
import Link from "next/link";
import React from "react";

const DrinkCard = ({ drink }: any) => {
  const { strCategory, strDrinkThumb, strDrink, strGlass, idDrink, strAlcoholic } = drink;
  return (
    <Link
      href={{
        pathname: `/shop/${idDrink}`,
        query: {
          imgUrl: strDrinkThumb,
          type: strAlcoholic,
          name: strDrink,
          category: strCategory,
        },
      }}
      className="dark:dark-gradient flex flex-col items-center rounded-md bg-light-900  p-4 shadow-light-100 max-sm:w-full  "
    >
      <Image
        src={strDrinkThumb}
        width={200}
        height={200}
        alt={strCategory}
        className="rounded-md object-contain max-sm:size-full"
      ></Image>
      <h2 className="text-dark400_light800 h3-bold mt-6  " dir="ltr">
        {strGlass} <span className="mx-[2px] text-primary-500">{strDrink}</span>{" "}
      </h2>
    </Link>
  );
};

export default DrinkCard;
