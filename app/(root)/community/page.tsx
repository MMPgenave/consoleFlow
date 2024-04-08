import Filter from "@/components/shared/Filter/Filter";
import UserCard from "@/components/shared/Card/UserCard";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { UserFilters } from "@/constants/Filter";
import { getAllUser } from "@/lib/actions/user.action";
import Link from "next/link";
import { URLProps } from "@/types";
import Pagination from "@/components/shared/Pagination/Pagination";

export default async function Community({ params, searchParams }: URLProps) {
  const result = await getAllUser({ searchQuery: searchParams.q, filter: searchParams.filter });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900"> تمام کاربران</h1>
      <div className="mt-5 flex items-center gap-2 max-sm:flex-col max-sm:gap-3">
        <LocalSearch route="/community" placeholder="مغز متفکر هارو اینجا جستجو کن..." />
        <Filter filterData={UserFilters} placeholder="فیلتری را انتخاب کنید" height="h-[50px]" />
      </div>
      <section className="mt-12 flex flex-wrap  gap-4">
        {result!.users.length > 0 ? (
          result!.users.map((user: any, i: number) => {
            return <UserCard userData={user} key={user._id} />;
          })
        ) : (
          <div>
            <p>هنوز کاربری وجود ندارد</p>
            <Link href="/sign-up">اولین نفر باشید که عضو میشوید.</Link>
          </div>
        )}
      </section>

      <Pagination pageNumber={searchParams?.page ? +searchParams.page : 1} isNext={result!.isNext} />
    </>
  );
}
