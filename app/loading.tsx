"use client";
import React from "react";
// @ts-ignore
import { BoxesLoader } from "react-awesome-loaders";

const loading = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <BoxesLoader boxColor={"#FF7000"} style={{ marginBottom: "20px" }} desktopSize={"128px"} mobileSize={"80px"} />
    </div>
  );
};

export default loading;
