import Filter from "@/components/shared/Filter/Filter";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { QuestionFilters } from "@/constants/Filter";
import React from "react";
import { auth } from "@clerk/nextjs";
import { getAllQuestionCollection } from "@/lib/actions/user.action";
import NoResult from "@/components/shared/NoResult/NoResult";
import QuestionCard from "@/components/shared/Card/QuestionCard";
const CollectionPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const questionCollection = await getAllQuestionCollection({
    clerkId: userId!,
  });

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900"> سوالات ذخیره شده</h1>
      <div className="mt-5 flex items-center gap-2 max-sm:flex-col max-sm:gap-3">
        <LocalSearch
          route="/collection"
          placeholder=" سوالات ذخیره شده رو جستجو کن..."
        />
        <Filter
          filterData={QuestionFilters}
          placeholder="فیلتری را انتخاب کنید"
          height="h-[50px]"
        />
      </div>
      <div className="mt-10">
        {questionCollection.length > 0 ? (
          <div>
            {JSON.parse(JSON.stringify(questionCollection)).map(
              (question: any) => {
                return <QuestionCard question={question} key={question._id} />;
              },
            )}
          </div>
        ) : (
          <NoResult
            title="سوال ذخیره شده ای یافت نشد!"
            description=".بنظر میرسد که در کلکسیون شما در این لحظه سوال ذخیره شده ای وجود ندارد. کاوش سوالات رو آغاز کنید و سوال مورد علاقه خود را ذخیره کنید"
            button_href="/"
            button_content="کاوش سوالات"
          />
        )}
      </div>
    </div>
  );
};

export default CollectionPage;
