import { timeStampCalculator } from "@/utils";
import Link from "next/link";
import Image from "next/image";
import ParseHTML from "@/components/shared/ParseHTML/ParseHTML";
import Voting from "../Voting/Voting";
import { auth } from "@clerk/nextjs";
import { getUserById } from "@/lib/actions/user.action";

export default async function AnswerCard({ answer }: any) {
  const { author, content, createdAt, _id, upvotes, downvotes } = answer;
  const { userId } = auth();
  const mongoUser = await getUserById({ userId: userId! });

  let hasUpvoted: boolean = false;

  upvotes.forEach((user: any) => {
    if (JSON.stringify(user._id) === JSON.stringify(mongoUser._id)) {
      hasUpvoted = true;
    }
  });
  let hasDownvoted: boolean = false;
  downvotes.forEach((user: any) => {
    if (JSON.stringify(user._id) === JSON.stringify(mongoUser._id)) {
      hasDownvoted = true;
    }
  });

  return (
    <div className=" ">
      <div className="flex justify-between">
        <Link href={`/profile/${author.clerkId}`} className="flex flex-1 items-start gap-1 sm:items-center">
          <Image
            className="rounded-full object-cover max-sm:mt-0.5"
            src={author.picture}
            alt={author.name}
            width={18}
            height={18}
          />

          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="paragraph-semibold text-dark300_light700 mt-1">{author.name}</div>
            <div className="small-regular text-light400_light500  mr-1 mt-1 line-clamp-1" dir="rtl">
              {` ${timeStampCalculator(createdAt)} `}
              <span>جواب داده شد </span>
            </div>
          </div>
        </Link>

        <div className="">
          <Voting
            type="Answer"
            ItemId={JSON.stringify(_id)}
            userId={JSON.stringify(mongoUser._id)}
            upvoteNumber={upvotes.length}
            hasUpvoted={hasUpvoted!}
            downvotes={downvotes.length}
            hasDownvoted={hasDownvoted}
            showSaveIcon={false}
          />
        </div>
      </div>

      <ParseHTML data={content} />
    </div>
  );
}
