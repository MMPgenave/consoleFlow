import RightSidebar from "@/components/shared/RightSidebar/RightSidebar";
import Navbar from "@/components/shared/Navbar/Navbar";
import React from "react";
import LeftSidebar from "@/components/shared/LeftSidebar/LeftSidebar";
import { Toaster } from "@/components/ui/toaster";
import { auth } from "@clerk/nextjs";
import { Knock } from "@knocklabs/node";
import { getUserById } from "@/lib/actions/user.action";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();
  if (userId) {
    const mongoUser = await getUserById({ userId });
    const knockClient = new Knock("sk_test_amLsV98Sm_1FWsTVA--BKZYSMp0i2D9E7E3-S2AkC9Y");
    const knockUser = await knockClient.users.identify(userId, {
      name: mongoUser.name,
      email: mongoUser.email,
    });
    console.log(`knock client is :${JSON.stringify(knockUser)}`);
  }

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
      <Toaster />
    </main>
  );
};

export default Layout;
