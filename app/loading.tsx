import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
export default function Loading() {
  return (
    <main className="background-light850_dark100 relative ">
      <div className="background-light900_dark200 fixed z-50  flex w-full justify-between gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12 ">
        <div className="flex items-center gap-2">
          <Image src="/assets/images/site-logo.svg" alt="logo" width={25} height={25} />
          <p className="h3-bold text-dark-100 dark:text-light-900 max-sm:hidden">
            توسعه<span className="mr-1 text-primary-500">جریان</span>
          </p>
        </div>

        <div className="relative w-full max-w-[600px] max-lg:hidden">
          <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
            <Image
              src={"/assets/icons/search.svg"}
              width={24}
              height={24}
              alt="search-icon "
              className="cursor-pointer"
            />
            <Skeleton
              className=" flex h-9 
           w-full rounded-md border border-none
            border-slate-200 bg-transparent px-3
             py-1 text-sm shadow-none
              outline-none transition-colors
                file:border-0 
               file:bg-transparent file:text-sm
                file:font-medium placeholder:text-slate-500
                 focus-visible:outline-none focus-visible:ring-slate-950 
                 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 
                 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
            />
          </div>
        </div>

        <div className="flex justify-between gap-5"></div>
      </div>
      <div className="flex">
        <div
          className=" background-light900_dark200 light-border sticky right-0 top-0 hidden 
    h-screen w-fit flex-col gap-5  overflow-y-auto   
     p-4 pt-36 shadow-light-200  dark:shadow-none max-lg:w-20 sm:flex lg:w-[220px]"
        >
          <Skeleton className="primary-gradient h-[57px] w-[185px] self-end  rounded-md border " />
          <Skeleton className="background-light800_darkgradient h-[57px] w-[185px] self-end  rounded-md  " />
          <Skeleton className="background-light800_darkgradient h-[57px] w-[185px] self-end  rounded-md  " />
          <Skeleton className="background-light800_darkgradient h-[57px] w-[185px] self-end  rounded-md  " />
          <Skeleton className="background-light800_darkgradient h-[57px] w-[185px] self-end  rounded-md  " />
          <Skeleton className="background-light800_darkgradient h-[57px] w-[185px] self-end  rounded-md  " />
        </div>

        <section className="flex min-h-screen flex-1  flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14 ">
          <div className="mx-auto w-full max-w-5xl ">
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:justify-between">
              <div className="h1-bold text-dark100_light900">همه سوالات</div>
              <Skeleton className="primary-gradient h-[53px] w-[146px] self-end  rounded-md border " />
            </div>
            <Skeleton
              className="background-light800_darkgradient mt-6 flex 
                          h-12 w-full  rounded-md"
            />
            <Skeleton
              className="background-light800_darkgradient mt-4 flex 
                          h-12 w-full  rounded-md sm:hidden"
            />

            <div className="mt-14 flex flex-wrap gap-2 max-sm:hidden">
              <Skeleton className="background-light800_darkgradient  h-[50px] w-[120px]  rounded-md" />
              <Skeleton className="background-light800_darkgradient  h-[50px] w-[120px]  rounded-md" />
              <Skeleton className="background-light800_darkgradient  h-[50px] w-[120px]  rounded-md" />
              <Skeleton className="background-light800_darkgradient  h-[50px] w-[120px]  rounded-md" />
            </div>
            <div className=" mt-10 flex flex-col gap-3">
              <Skeleton className="background-light800_darkgradient  h-[185px] w-full  rounded-md" />
              <Skeleton className="background-light800_darkgradient  h-[185px] w-full  rounded-md" />
              <Skeleton className="background-light800_darkgradient  h-[185px] w-full  rounded-md" />
              <Skeleton className="background-light800_darkgradient  h-[185px] w-full  rounded-md" />
              <Skeleton className="background-light800_darkgradient  h-[185px] w-full  rounded-md" />
            </div>
          </div>
        </section>

        <div
          className=" background-light900_dark200  sticky
     left-0 top-0 flex h-screen w-fit  flex-col 
      overflow-y-auto border-r p-6 pt-36
       max-sm:hidden lg:w-[360px] "
        >
          <div className="text-dark400_light800 h3-bold">سوالات تاپ</div>
          <div className="mt-6 flex flex-col gap-3">
            <Skeleton className="background-light800_darkgradient h-[60px] w-full  rounded-md  " />
            <Skeleton className="background-light800_darkgradient h-[60px] w-full  rounded-md  " />
            <Skeleton className="background-light800_darkgradient h-[60px] w-full  rounded-md  " />
            <Skeleton className="background-light800_darkgradient h-[60px] w-full  rounded-md  " />
          </div>
          <div className="text-dark400_light800 h3-bold mt-5">تگ های ترند</div>
        </div>
      </div>
    </main>
  );
}
