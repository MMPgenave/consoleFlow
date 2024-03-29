import RightSidebar from "@/components/shared/RightSidebar/RightSidebar";
import Navbar from "@/components/shared/Navbar/Navbar";
import React from "react";
import LeftSidebar from "@/components/shared/LeftSidebar/LeftSidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light850_dark100 relative ">
      <Navbar />
      <div className="flex">
        <RightSidebar />
        <section className="flex min-h-screen flex-1  flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14 ">
          <div className="mx-auto w-full max-w-5xl ">{children}</div>
        </section>
        <LeftSidebar />
      </div>
      {/* Toaster */}
    </main>
  );
};

export default Layout;
