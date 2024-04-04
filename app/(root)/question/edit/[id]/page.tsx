import { QuestionForm } from "@/components/shared/Form/QuestionForm";
import { URLProps } from "@/types";
import { auth } from "@clerk/nextjs";
import React from "react";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/actions/user.action";
import { getQuestionById } from "@/lib/actions/question.action";

const EditQuestionPage = async ({ params }: URLProps) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const mongoUser = await getUserById({ userId });

  const result = await getQuestionById({ questionId: params.id });
  const oldQuestionVersion = result?.question;

  return (
    <div className="">
      <h1 className="text-dark100_light900 h1-bold"> ویرایش سوال</h1>
      <div className="mt-9 flex flex-col gap-[80px]">
        <QuestionForm
          mongoUserId={JSON.stringify(mongoUser?._id)}
          type="edit"
          QuestionToBeEdited={JSON.stringify(oldQuestionVersion)}
        />
      </div>
    </div>
  );
};

export default EditQuestionPage;
