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
    imgURL: "/assets/icons/suitcase.svg",
    route: "/jobs",
    label: "پیدا کردن شغل",
  },
  {
    imgURL: "/assets/icons/tag.svg",
    route: "/tags",
    label: "تگ ها",
  },
  {
    imgURL: "/assets/icons/user.svg",
    route: "/profile",
    label: "پروفایل",
  },
  {
    imgURL: "/assets/icons/question.svg",
    route: "/ask-question",
    label: "سوالی بپرس",
  },
];
export const BADGE_CRITERIA = {
  QUESTION_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_COUNT: {
    BRONZE: 10,
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
export const RightSidebar_data = [
  {
    id: "1",
    URL: "/DF",
    text: " همواره با استفاده از پیمان",
  },
  {
    id: "2",
    URL: "/DF",
    text: "اچ‌تی‌تی‌پی می‌توان به آن دسترسی پیدا کرد. پیمان اچ‌تی‌تی‌پی اطلاعااعات برای کاربر نمایش داده شوند.",
  },
  {
    id: "3",
    URL: "/DF",
    text: "وبگاه‌ها نقش‌های مختلفی دارند و به حال بزرگ از اطلاعات را درست می‌کنند.",
  },
  {
    id: "4",
    URL: "/DF",
    text: "صفحهٔ وب سندی اهمواره با استفاده از پیمان",
  },
  {
    id: "5",
    URL: "/DF",
    text: "اچ‌تی‌تی‌پی می‌توان به آن دسترسی پیدا کرد. پیمان اچ‌تی‌تی‌پی اطلاعات راای کاربر نمایش داده شوند.",
  },
  {
    id: "6",
    URL: "/DF",
    text: "وبگ وبگاه ممکن است وبگاه شخصی، یا وبگاه تجاری یند.",
  },
];
export const PoplularTags = [
  { id: "1", text: "Reactjs", socre: 50, url: "/" },
  { id: "2", text: "Nextjs", socre: 12, url: "/" },
  { id: "3", text: "JavaScript", socre: 5, url: "/" },
  { id: "4", text: "HTML", socre: 20, url: "/" },
  { id: "5", text: "CSS", socre: 31, url: "/" },
];
export const questions = [
  {
    id: 1,
    title:
      "بهترین روش ها برای واکشی داده ها در برنامه Next.js با رندر سمت سرور (SSR)؟",
    tags: [
      { id: 1, name: "javascript" },
      { id: 2, name: "nextjs" },
    ],
    author: {
      id: 1,
      name: "محمد",
      picture: "/assets/images/chines.png",
    },
    votes: 20535353,
    answers: [],
    views: 10253522,
    createdAt: "1707598411680",
  },
  {
    id: 2,
    title: "Redux Toolkit وضعیت را همانطور که انتظار می رفت به روز نمی کند",
    tags: [
      { id: 1, name: "javascript" },
      { id: 2, name: "nextjs" },
      { id: 3, name: "vuejs" },
    ],
    author: { id: 1, name: " 🧚‍♀️مائده", picture: "/assets/images/rock.png" },
    askedBy: "Maedeh",
    votes: 70,
    answers: [],
    views: 1200,
    createdAt: "1707598411680",
  },
  {
    id: 3,
    title: "عملکرد Async/Await به درستی خطاها را مدیریت نمی کند",
    tags: [
      { id: 1, name: "html" },
      { id: 2, name: "css" },
    ],
    author: { id: 1, name: "نیله", picture: "/assets/images/jak.png" },

    votes: 200,
    answers: [],
    views: 1020,
    createdAt: "1707598411680",
  },
];
