import React from "react";
import { getUserInfo } from "@/lib/actions/user.action";
import Image from "next/image";
import { getJoinMonthAndYear } from "@/utils";
import { URLProps } from "@/types";
import { SignedIn, auth } from "@clerk/nextjs";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileLink from "@/components/shared/ProfileLink/ProfileLink";
import Stats from "@/components/shared/Stats/Stats";
import QuestionTab from "@/components/shared/QuestionTab/QuestionTab";
import AnswerTab from "@/components/shared/AnswerTab/AnswerTab";
import Tag from "@/components/shared/Tag/Tag";
const ProfilePage = async ({ params, searchParams }: URLProps) => {
  const result = await getUserInfo({ userId: params.id });
  const { userId: clerkId } = auth();

  // extract all tags that this user used
  const UserTags: { text: string; id: string }[] = [];
  if (result!.questions.length) {
    const { questions } = result!;

    // add all question's tags to the "UserTags" variable
    for (let i = 0; i < questions.length; i++) {
      questions[i].tags.forEach((tag: any) => {
        const { _id, text } = tag;
        UserTags.push({ text, id: _id });
      });
    }
  }

  // Create an object to store the count of each object
  const countMap: any = {};
  // Loop through the array
  UserTags.forEach((item) => {
    // Convert the object to a string to use it as a key in the countMap
    const key = item.text;

    // Check if the key exists in the countMap
    if (countMap[key]) {
      // Increment the count if the key exists
      countMap[key]++;
    } else {
      // Initialize the count to 1 if the key doesn't exist
      countMap[key] = 1;
    }
  });

  // Create a Set to store unique elements
  const uniqueSet = new Set();

  // Create an array to store the result
  const uniqueArray: { text: string; id: string }[] = [];

  // Loop through the original array
  UserTags.forEach((item) => {
    // Convert the object to a string to check for uniqueness
    const key = JSON.stringify(item);

    // Check if the element is already in the set
    if (!uniqueSet.has(key)) {
      // If not, add it to the set and the result array
      uniqueSet.add(key);
      uniqueArray.push(item);
    }
  });

  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 sm:flex-row">
          <Image src={result!.user.picture} width={140} height={140} alt="user" className="rounded-full object-cover" />
          <div className="mt-3">
            <h2 className="h2-bold   text-dark100_light900">{result!.user.name}</h2>
            <h4 className="paragraph-regular text-dark200_light800">{result!.user.username}@</h4>
            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {result?.user.portfolioWebsite && (
                <ProfileLink imgUrl="/assets/icons/link.svg" href={result?.user.portfolioWebsite} title="پورتفولیو" />
              )}
              {result?.user.location && (
                <ProfileLink imgUrl="/assets/icons/location.svg" title={result?.user.location} />
              )}
              <ProfileLink
                imgUrl="/assets/icons/calendar.svg"
                title={`${getJoinMonthAndYear(result!.user.joinedAt)} ملحق شد`}
              />
              {result?.user.bio && <p className="paragraph-regular text-dark400_light800 mt-8">{result?.user.bio}</p>}
            </div>
          </div>
        </div>
        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <SignedIn>
            {clerkId === result?.user.clerkId && (
              <Link href="/profile/edit">
                <div
                  className="paragraph-medium  primary-gradient flex min-h-[46px] min-w-[176px] justify-center rounded-lg px-4 
                    py-3 text-slate-100 hover:opacity-80"
                >
                  ویرایش پروفایل
                </div>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>
      <Stats
        NumberOfQuestion={result!.NumberOfQuestionAskedByThisUser}
        NumberOfAnswer={result!.NumberOfAnsweredQuestionByThisUser}
        bronzeBadge={result!.badgeCounts.BRONZE}
        silverBadge={result!.badgeCounts.SILVER}
        goldBadge={result!.badgeCounts.GOLD}
        reputation={result!.reputation}
      />
      <div className="mt-10 flex items-start gap-10 max-sm:flex-col">
        <Tabs dir="rtl" defaultValue="پست های برتر" className="w-3/5   max-sm:w-full">
          <TabsList className="background-light800_dark400 min-h-[42px] p-1 ">
            <TabsTrigger value="top-posts" className=" bg-orange-50 text-orange-600">
              پست های برتر
            </TabsTrigger>
            <TabsTrigger value="answers" className=" bg-orange-50 text-orange-600">
              پاسخ ها
            </TabsTrigger>
          </TabsList>
          <TabsContent value="top-posts">
            <QuestionTab userId={result!.user._id} clerkId={clerkId!} searchParams={searchParams} />
          </TabsContent>
          <TabsContent value="answers">
            <AnswerTab
              userId={result!.user._id}
              userName={result!.user.name}
              clerkId={clerkId!}
              searchParams={searchParams}
            />
          </TabsContent>
        </Tabs>
        <div className="flex-1">
          <div className="h3-bold text-dark200_light900">تگ های برتر</div>
          <div className=" mt-4">
            {UserTags.length > 0 ? (
              <div className="flex flex-col gap-3">
                {uniqueArray.map((tag: any) => {
                  return (
                    <Tag key={tag.id} text={tag.text} showScore={true} score={countMap[tag.text]} url={`${tag.id}`} />
                  );
                })}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
