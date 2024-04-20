import { getDrinks } from "@/lib/actions/drinks.action";
import React from "react";
const Shop = async () => {
  const result = await getDrinks();

  return <div>drinks :{result?.drinks.length} </div>;
};

export default Shop;
