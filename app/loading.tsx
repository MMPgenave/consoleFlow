import { ReloadIcon } from "@radix-ui/react-icons";
import React from "react";

const loading = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center text-xl text-primary-500">
      <ReloadIcon className="my-2 size-20 animate-spin text-primary-500" />
    </div>
  );
};

export default loading;
