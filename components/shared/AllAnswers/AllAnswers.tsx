import Filter from "@/components/shared/Filter/Filter";
import { AnswerFilters } from "@/constants/Filter";
import AnswerCard from "@/components/shared/Card/AnswersCard";
import { getAllAnswers } from "@/lib/actions/answer.action";
import NoResult from "../NoResult/NoResult";

interface Props {
  questionId: string;
  userId: string;
  page?: number;
  filter?: number;
}
export default async function AllAnswers({
  questionId,
  userId,
  page,
  filter,
}: Props) {
  const results = await getAllAnswers({ questionId });

  return (
    <div className="mt-11">
      {results!.length > 0 ? (
        <div>
          <div className="flex items-center justify-between">
            <h4 className="primary-text-gradient">
              {results?.length} <span className="ml-2">جواب</span>
            </h4>
            <Filter
              filterData={AnswerFilters}
              placeholder="نوع فیلتر"
              otherClasses="flex"
              height="h-[50px]"
            />
          </div>

          <div className="mt-5">
            {results!.map((answer: any) => {
              return (
                <article className="border-y py-10" key={answer._id}>
                  <AnswerCard answer={answer} />
                </article>
              );
            })}
          </div>
        </div>
      ) : (
        <NoResult
          title="هنوز به این سوال جواب داده نشده است."
          button_content="در قسمت پایین پاسخت رو بنویس"
          button_href=""
          description="هنوز این سوال جواب داده نشده. اگر این سوال رو جواب بدی 10 امتیاز میگیری"
        />
      )}
    </div>
  );
}
