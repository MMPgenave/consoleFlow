import { timeStampCalculator } from "@/utils";
import Link from "next/link";
import Image from "next/image";
import ParseHTML from "@/components/shared/ParseHTML/ParseHTML";

export default function AnswerCard({ answer }: any) {
  const { author, content, createdAt } = answer;

  return (
    <div className="">
      <div className="flex justify-between">
        <Link
          href={`/profile/${author.clerkId}`}
          className="flex flex-1 items-start gap-1 sm:items-center"
        >
          <Image
            className="rounded-full object-cover max-sm:mt-0.5"
            src={author.picture}
            alt={author.name}
            width={18}
            height={18}
          />

          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="paragraph-semibold text-dark300_light700 mt-1">
              {author.name}
            </div>
            <div
              className="small-regular text-light400_light500  mr-1 mt-1 line-clamp-1"
              dir="rtl"
            >
              {` ${timeStampCalculator(createdAt)} `}
              <span>جواب داده شد </span>
            </div>
          </div>
        </Link>

        <div className="">vote</div>
      </div>

      <ParseHTML data={content} />
    </div>
  );
}
