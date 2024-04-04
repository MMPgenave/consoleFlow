import QuestionCard from "@/components/shared/Card/QuestionCard";
import NoResult from "@/components/shared/NoResult/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { getQuestionsByTagId } from "@/lib/actions/tag.action";
import { URLProps } from "@/types";
import React from "react";

const TagDetailsPage = async ({ params, searchParams }: URLProps) => {
  const result = await getQuestionsByTagId({
    tagId: params.id,
    page: 1,
    searchQuery: searchParams.q,
  });
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900 !uppercase ">{result!.tagName}</h1>
      <div className="mt-5 flex items-center gap-2 max-sm:flex-col max-sm:gap-3 ">
        <LocalSearch route={`/tags/${params.id}`} placeholder="جستجو در سوالات مربوط به این تگ مشخص ..." />
      </div>
      <div className="mt-12">
        {JSON.parse(JSON.stringify(result?.questions)).length > 0 ? (
          <div className="flex flex-col gap-6">
            {JSON.parse(JSON.stringify(result?.questions)).map((question: any) => {
              return <QuestionCard question={question} key={question._id} />;
            })}
          </div>
        ) : (
          <NoResult
            title="سوالی مربوط به این تگ وجود ندارد"
            description="  اولین کسی باشید که سکوت را می شکند! 🚀 یک سوال بپرسید و بحث را شروع
          کنید. درخواست ما می تواند چیز بزرگ بعدی باشد که دیگران از آن یاد می
          گیرند. مشارکت کنید! 💡"
            button_href="/ask-question"
            button_content=" سوالی بپرس"
          />
        )}
      </div>
    </div>
  );
};

export default TagDetailsPage;
