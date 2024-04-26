import Link from "next/link";
import LocalSearch from "@/components/shared/search/LocalSearch";
import Filter from "@/components/shared/Filter/Filter";
import { HomePageFilters } from "@/constants/Filter";
import HomePageFilter from "@/components/home/HomePageFilter";
import QuestionCard from "@/components/shared/Card/QuestionCard";
import NoResult from "@/components/shared/NoResult/NoResult";
import { getAllQuestions } from "@/lib/actions/question.action";
import { SearchParamsProps } from "@/types";
import Pagination from "@/components/shared/Pagination/Pagination";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "خانه | توسعه جریان",
  description: "شبکه اجتماعی شامل 1000000+ کاربر است. به ما ملحق شوید.",
};
export default async function Home({ searchParams }: SearchParamsProps) {
  const results = await getAllQuestions({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
    pageSize: 10,
  });
  return (
    <>
     
      <main className="">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:justify-between">
          <div className="h1-bold text-dark100_light900">همه سوالات</div>
          <Link
            href={"/ask-question"}
            className="primary-gradient self-end rounded-md border  px-6 py-3 text-lg text-slate-100 dark:border-none"
          >
            سوالی بپرس
          </Link>
        </div>
        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:justify-between md:flex-col">
          <LocalSearch route="/" placeholder="در سوالات جستجو کن" />
          <div className="md:hidden">
            <Filter filterData={HomePageFilters} placeholder="نوع فیلتر" otherClasses="flex" height="h-[50px]" />
          </div>
          <HomePageFilter filterData={HomePageFilters} />
        </div>
        <div className="mt-10 flex w-full flex-col gap-6">
          {results!.questions.length > 0 ? (
            JSON.parse(JSON.stringify(results?.questions)).map((question: any) => {
              return <QuestionCard question={question} key={question._id} />;
            })
          ) : (
            <NoResult
              title="  سوالی برای نشان دادن وجود ندارد"
              description="  اولین کسی باشید که سکوت را می شکند! 🚀 یک سوال بپرسید و بحث را شروع
          کنید. درخواست ما می تواند چیز بزرگ بعدی باشد که دیگران از آن یاد می
          گیرند. مشارکت کنید! 💡"
              button_href="/ask-question"
              button_content=" سوالی بپرس"
            />
          )}
        </div>

        <Pagination pageNumber={searchParams?.page ? +searchParams.page : 1} isNext={results!.isNext} />
      </main>
    </>
  );
}
