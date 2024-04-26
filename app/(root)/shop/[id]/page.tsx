import { URLProps } from "@/types";
import React from "react";

const DrinkDetailsPage = ({ params }: URLProps) => {
  return <div>DrinkDetailsPage :{params.id} </div>;
};

export default DrinkDetailsPage;
