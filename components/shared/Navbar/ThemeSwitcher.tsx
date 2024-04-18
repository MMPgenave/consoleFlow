"use client";
import React from "react";
import Image from "next/image";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

import { useTheme } from "@/context/ThemeProvider";
import { themes } from "@/constants";
import "./themeSwitcher.css";
const ThemeSwitcher = () => {
  const { mode, setMode } = useTheme()!;
  return (
    <Menubar className="relative border-none bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="hover:cursor-pointer focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200">
          {mode === "light" ? <div className="sun"></div> : <div className="moon"></div>}
        </MenubarTrigger>
        <MenubarContent className="absolute -left-12 mt-3 min-w-[100px]  rounded  border bg-light-900 py-2 dark:border-dark-400 dark:bg-dark-300  ">
          {themes.map((item) => (
            <MenubarItem
              key={item.label}
              className="flex flex-row-reverse gap-4 hover:cursor-pointer"
              onClick={() => {
                setMode(item.label);
                if (item.label !== "system") {
                  localStorage.theme = item.label;
                } else {
                  localStorage.removeItem("theme");
                }
              }}
            >
              <Image src={item.icon} width={16} height={16} alt={item.label} />
              <div className={`body-semibold  ${mode === item.label ? "text-primary-500 " : "text-dark100_light900"}`}>
                {item.value}
              </div>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default ThemeSwitcher;
