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

  // If a user answered a question multiple times, only show the related question once
  // const ques: {}[] = [];
  // if (answers.length) {
  //   ques.push({
  //     question: answers[0].question,
  //     answerUpvotes: answers[0].upvotes.length,
  //     answer: answers[0],
  //   });
  //   for (let i = 1; i < answers.length; i++) {
  //     const questionId = JSON.parse(JSON.stringify(answers[i].question._id));
  //     for (let j = 0; j < answers.length; j++) {
  //       if (questionId !== JSON.parse(JSON.stringify(answers[j].question._id))) {
  //         ques.push({
  //           question: answers[i],
  //           answerUpvotes: answers[i].upvotes.length,
  //           answer: answers[i],
  //         });
  //       }
  //     }
  //   }
  // }

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
