// import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
import "@/styles/prism.css";
import { ClerkProvider } from "@clerk/nextjs";
import ThemeProvider from "@/context/ThemeProvider";
import MobileMenubarProvider from "@/context/MobileMenubarProvider";
import { localization } from "@/constants/clerkConstant.js";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: " توسعه جریان",
  description:
    "   در پلتفرم توسعه جریان، سوالات و پاسخ های کاربران با تعداد بیش از 1000000 نفر در ضمینه فناوری اطلاعات و برنامه نویسی در جریان است.",
  icons: {
    icon: "/assets/icons/faq-svgrepo-com.svg",
  },
  openGraph: {
    images: "/assets/images/cover.jpg",
  },
  metadataBase: new URL("https://console-flow.vercel.app/"),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="yekan-bakh">
        <ClerkProvider localization={localization}>
          <ThemeProvider>
            <MobileMenubarProvider>{children}</MobileMenubarProvider>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
