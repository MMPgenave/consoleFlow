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
  title: " خانه | توسعه جریان",
  description: "Generated by create next app",
  icons: {
    icon: "/assets/icons/faq-svgrepo-com.svg",
  },
  openGraph: {
    images: "/assets/images/auth-dark.png",
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
