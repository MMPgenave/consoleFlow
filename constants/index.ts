/* eslint-disable camelcase */
import { SidebarLink } from "@/types";

export const themes = [
  {
    value: "روشن",
    label: "light",
    icon: "/assets/icons/sun.svg",
  },
  {
    value: "تیره",
    label: "dark",
    icon: "/assets/icons/moon.svg",
  },
  {
    value: "سیستم",
    label: "system",
    icon: "/assets/icons/computer.svg",
  },
];

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "خانه",
  },
  {
    imgURL: "/assets/icons/users.svg",
    route: "/community",
    label: "کاربران",
  },
  {
    imgURL: "/assets/icons/star.svg",
    route: "/collection",
    label: "کلکسیون",
  },

  {
    imgURL: "/assets/icons/tag.svg",
    route: "/tags",
    label: "تگ ها",
  },
  {
    imgURL: "/assets/icons/user.svg",
    route: "/profile",
    label: " پروفایل من",
  },
  {
    imgURL: "/assets/icons/question.svg",
    route: "/ask-question",
    label: "سوالی بپرس",
  },
  {
    imgURL: "/assets/icons/coffee-shop.svg",
    route: "/shop",
    label: "کافه ",
  },
];
export const BADGE_CRITERIA = {
  QUESTION_COUNT: {
    BRONZE: 4,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_COUNT: {
    BRONZE: 4,
    SILVER: 50,
    GOLD: 100,
  },
  QUESTION_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  TOTAL_VIEWS: {
    BRONZE: 1000,
    SILVER: 10000,
    GOLD: 100000,
  },
};
