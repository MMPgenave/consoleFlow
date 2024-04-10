import { getUserAnswers } from "@/lib/actions/user.action";
import React from "react";
import QuestionCardForAnswersTab from "../Card/QuestionCardForAnswersTab";
import { SearchParamsProps } from "@/types";
import Pagination from "../Pagination/Pagination";
interface AnswerTabPropsType extends SearchParamsProps {
  userId: string;
  clerkId: string;
  userName: string;
}
const AnswerTab = async ({ userId, clerkId, searchParams, userName }: AnswerTabPropsType) => {
  const result = await getUserAnswers({ userId, page: searchParams.page ? +searchParams.page : 1 });
  const { answers } = result!;

  return (
    <>
      <div className="mt-6 flex flex-col gap-4">
        {answers.length > 0 ? (
          JSON.parse(JSON.stringify(answers)).map((answer: any) => {
            return (
              <QuestionCardForAnswersTab
                clerkId={clerkId}
                question={answer.question}
                answerUpvotes={answer.upvotes.length}
                key={answer.question._id}
                answer={answer}
              />
            );
          })
        ) : (
          <div className="h3-bold text-primary-500">
            <span>{userName}</span> به هیچ سوالی تاکنون پاسخ نداده است
          </div>
        )}
      </div>
      <Pagination pageNumber={searchParams?.page ? +searchParams.page : 1} isNext={result!.isNext} />
    </>
  );
};

export default AnswerTab;
