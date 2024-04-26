import DrinkCard from "@/components/shared/Card/DrinkCard";
import Filter from "@/components/shared/Filter/Filter";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { CocktailsFilters } from "@/constants/Filter";
import { getDrinks } from "@/lib/actions/drinks.action";
import { URLProps } from "@/types";
import React from "react";
const Shop = async ({ searchParams }: URLProps) => {
  const result = await getDrinks({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
  });

  return (
    <>
      <div className="h1-bold text-dark100_light900"> کوکتیل</div>
      <div className="mt-5 flex items-center gap-2 max-sm:flex-col max-sm:gap-3">
        <LocalSearch route="/shop" placeholder="جستجو نوشیدنی..." />
        <Filter filterData={CocktailsFilters} placeholder="فیلتری را انتخاب کنید" height="h-[50px]" />
      </div>
      <div className="mt-10">
        {result?.drinks.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-6 ">
            {result?.drinks.map((drink: any) => {
              return <DrinkCard key={drink.idDrink} drink={drink} />;
            })}
          </div>
        ) : (
          <div className="text-dark400_light800 h3-bold">نوشیدنی یافت نشد!</div>
        )}
      </div>
    </>
  );
};

export default Shop;
