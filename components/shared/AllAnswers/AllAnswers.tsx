import Filter from "@/components/shared/Filter/Filter";
import { AnswerFilters } from "@/constants/Filter";
import AnswerCard from "@/components/shared/Card/AnswersCard";
import { getAllAnswers } from "@/lib/actions/answer.action";

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

          {results!.map((answer: any) => {
            return (
              <article className="light-border border-b py-10" key={answer._id}>
                <AnswerCard answer={answer} />
              </article>
            );
          })}
        </div>
      ) : (
        "no answers yet"
      )}
    </div>
  );
}
