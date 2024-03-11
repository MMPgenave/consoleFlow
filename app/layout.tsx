import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ThemeProvider from "@/context/ThemeProvider";
import MobileMenubarProvider from "@/context/MobileMenubarProvider";
import { localization } from "@/constants/clerkConstant.js";

export const metadata: Metadata = {
  title: "توسعه جریان",
  description: "Generated by create next app",
  icons: {
    icon: "../public/assets/icons/account.svg",
  },
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
