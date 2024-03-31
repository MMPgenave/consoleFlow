import { getUserQuestions } from "@/lib/actions/user.action";
import React from "react";
import QuestionCard from "../Card/QuestionCard";

const QuestionTab = async ({ userId }: any) => {
  const result = await getUserQuestions({ userId });

  return (
    <div className="mt-6 flex flex-col gap-4">
      {result!.questions.length > 0
        ? JSON.parse(JSON.stringify(result?.questions)).map((question: any) => {
            return <QuestionCard question={question} key={question._id} />;
          })
        : "no asked question"}
    </div>
  );
};

export default QuestionTab;
