import React from "react";
import { getUserInfo } from "@/lib/actions/user.action";
import Image from "next/image";
import { getJoinMonthAndYear } from "@/utils";
import { URLProps } from "@/types";
import { SignedIn, auth } from "@clerk/nextjs";
import { Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const ProfilePage = async ({ params, searchParams }: URLProps) => {
  const result = await getUserInfo({ userId: params.id });
  const { userId: clerkId } = auth();

  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 sm:flex-row">
          <Image
            src={result!.user.picture}
            width={140}
            height={140}
            alt="user"
            className="rounded-full object-cover"
          />
          <div className="mt-3">
            <h2 className="h2-bold   text-dark100_light900">
              {result!.user.name}
            </h2>
            <h4 className="paragraph-regular text-dark200_light800">
              {result!.user.username}@
            </h4>
            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {result?.user.location && <div>location</div>}
              <div className="next flex items-center gap-3">
                <Image
                  src={"/assets/icons/calendar.svg"}
                  width={18}
                  height={18}
                  alt="calendar"
                />
                <div className="flex gap-1">
                  <div>{getJoinMonthAndYear(result!.user.joinedAt)}</div>
                  <div>ملحق شد</div>
                </div>
              </div>
              {result?.user.bio && <p>{result?.user.bio}</p>}
            </div>
          </div>
        </div>
        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <SignedIn>
            {clerkId === result?.user.clerkId && (
              <Link href="/profile/edit">
                <Button
                  className="paragraph-medium text-dark300_light900 min-h-[46px] min-w-[176px] 
                    px-4 py-3 "
                >
                  ویرایش پروفایل
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>
      وضعیت
      <div className="mt-10 flex gap-10">
        <Tabs dir="rtl" defaultValue="پست های برتر" className="flex-1">
          <TabsList className="background-light800_dark400 min-h-[42px] p-1 ">
            <TabsTrigger
              value="top-posts"
              className=" bg-orange-50 text-orange-600"
            >
              پست های برتر
            </TabsTrigger>
            <TabsTrigger
              value="answers"
              className=" bg-orange-50 text-orange-600"
            >
              پاسخ ها
            </TabsTrigger>
          </TabsList>
          <TabsContent value="top-posts">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="answers">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ProfilePage;
