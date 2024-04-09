import { getUserQuestions } from "@/lib/actions/user.action";
import React from "react";
import QuestionCard from "../Card/QuestionCard";
import { SearchParamsProps } from "@/types";
import Pagination from "../Pagination/Pagination";
interface QuestionTabPropsType extends SearchParamsProps {
  userId: string;
  clerkId?: string;
}
const QuestionTab = async ({ userId, clerkId, searchParams }: QuestionTabPropsType) => {
  const result = await getUserQuestions({ userId, page: searchParams.page ? +searchParams.page : 1 });

  return (
    <div>
      <div className="mt-6 flex flex-col gap-4">
        {result!.questions.length > 0 ? (
          JSON.parse(JSON.stringify(result?.questions)).map((question: any) => {
            return <QuestionCard question={question} key={question._id} clerkId={clerkId} />;
          })
        ) : (
          <div className=" text-dark200_light900">شما تاکنون سوالی نپرسیده این!</div>
        )}
      </div>
      <Pagination pageNumber={searchParams?.page ? +searchParams.page : 1} isNext={result!.isNext} />
    </div>
  );
};

export default QuestionTab;
