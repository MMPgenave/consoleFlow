import AnswersToQuestion from "@/components/shared/AnswersToQuestion/AnswersToQuestion";
import Metric from "@/components/shared/Metric/Metric";
import ParseHTML from "@/components/shared/ParseHTML/ParseHTML";
import Tag from "@/components/shared/Tag/Tag";
import { getQuestionById } from "@/lib/actions/question.action";
import { formatNumber, timeStampCalculator } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { getUserById } from "@/lib/actions/user.action";

export default async function QuestionDetailsPage({ params }: any) {
  const result = await getQuestionById({ questionId: params.id });
  const { author, tags, title, content, createdAt, answers, views } =
    result?.question;
  const { userId } = auth();
  const mongoUser = await getUserById({ userId });

  return (
    <>
      <div className="flex w-full flex-col justify-start ">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2 ">
          <Link
            href={`profile/${author.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              className="rounded-full"
              src={author.picture}
              alt={author.name}
              width={22}
              height={22}
            />
            <div className="paragraph-semibold text-dark300_light700 mt-1">
              {author.name}
            </div>
          </Link>
          <div className="flex justify-end"> Voting</div>
        </div>
        <div className="h2-semibold text-dark200_light900 mt-3.5 w-full text-right">
          {title}
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-6">
          <Metric
            imgUrl={"/assets/icons/clock.svg"}
            text="پرسیده شده "
            textClasses={"small-regular text-dark400_light800"}
            isAuthor={false}
            value={timeStampCalculator(createdAt)}
          />
          <Metric
            imgUrl="/assets/icons/message.svg"
            text="جواب ها"
            isAuthor={false}
            textClasses="small-regular text-dark400_light800"
            value={formatNumber(answers.length)}
          />
          <Metric
            imgUrl="/assets/icons/eye.svg"
            text=" بازدید"
            isAuthor={false}
            textClasses="small-regular text-dark400_light800"
            value={formatNumber(views)}
          />
        </div>
      </div>
      <ParseHTML data={content} />
      <div className="flex flex-wrap gap-4">
        {tags.map((tag: any) => {
          return (
            <Tag text={tag.text} showScore={false} url="/" key={tag._id} />
          );
        })}
      </div>

      <AnswersToQuestion
        questionId={params.id}
        userId={JSON.stringify(mongoUser._id)}
      />
    </>
  );
}
