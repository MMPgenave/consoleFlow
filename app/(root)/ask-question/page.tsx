import { QuestionForm } from "@/components/shared/Form/QuestionForm";
import React from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/actions/user.action";

const AskQuestion = async () => {
  // const { userId } = auth();
  const userId = "clerk123";
  if (!userId) {
    redirect("/sign-in");
  }

  const mongoUser = await getUserById({ userId });
  return (
    <div className="">
      <h1 className="text-dark100_light900 h1-bold">سوالی بپرس</h1>
      <div className="mt-9 flex flex-col gap-[80px]">
        <QuestionForm mongoUserId={JSON.stringify(mongoUser._id)}/>
      </div>
    </div>
  );
};

export default AskQuestion;
