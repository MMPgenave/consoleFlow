import { getUserAnsweredQuestions } from "@/lib/actions/user.action";
import React from "react";
import QuestionCardForAnswersTab from "../Card/QuestionCardForAnswersTab";

const AnswerTab = async ({ userId }: any) => {
  const result = await getUserAnsweredQuestions({ userId });
  const { answers } = result!;

  // If a user answered a question multiple times, only show the related question once
  const ques: {}[] = [];
  if (answers.length) {
    ques.push({
      question: answers[0].question,
      answerUpvotes: answers[0].upvotes.length,
    });
    for (let i = 1; i < answers.length; i++) {
      const questionId = JSON.parse(JSON.stringify(answers[i].question._id));
      for (let j = 0; j < answers.length; j++) {
        if (
          questionId !== JSON.parse(JSON.stringify(answers[j].question._id))
        ) {
          ques.push({
            question: answers[i],
            answerUpvotes: answers[i].upvotes.length,
          });
        }
      }
    }
  }

  return (
    <div className="mt-6 flex flex-col gap-4">
      {ques.length > 0 ? (
        JSON.parse(JSON.stringify(ques)).map((que: any) => {
          return (
            <QuestionCardForAnswersTab
              question={que.question}
              answerUpvotes={que.answerUpvotes}
              key={que.question._id}
            />
          );
        })
      ) : (
        <div className="h3-bold text-blue-500">
          این کاربر به هیچ سوالی تاکنون پاسخ نداده است
        </div>
      )}
    </div>
  );
};

export default AnswerTab;
