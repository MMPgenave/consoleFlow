import TagCard from "@/components/shared/Card/TagCard";
import Filter from "@/components/shared/Filter/Filter";
import NoResult from "@/components/shared/NoResult/NoResult";
import Pagination from "@/components/shared/Pagination/Pagination";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { TagFilters } from "@/constants/Filter";
import { getAllTags } from "@/lib/actions/tag.action";
import { SearchParamsProps } from "@/types";

export default async function TagsPage({ searchParams }: SearchParamsProps) {
  const result = await getAllTags({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900"> تگ ها</h1>
      <div className="mt-5 flex items-center gap-2 max-sm:flex-col max-sm:gap-3 ">
        <LocalSearch route="/tags" placeholder="جستجو را با اسم تگ شروع کنید..." />
        <Filter filterData={TagFilters} placeholder="فیلتری را انتخاب کنید" height="h-[50px]" />
      </div>
      <section className="mt-12 flex flex-wrap gap-4">
        {result!.tags.length > 0 ? (
          result!.tags.map((tag) => {
            return (
              <div key={tag._id}>
                {" "}
                <TagCard data={tag} />
              </div>
            );
          })
        ) : (
          <NoResult
            title="تگ پیدا نشد"
            description="بنظر میرسد که تگی وجود ندارد"
            button_content="سوالی بپرس"
            button_href="/ask-question"
          />
        )}
      </section>
      <Pagination pageNumber={searchParams?.page ? +searchParams.page : 1} isNext={result!.isNext} />
    </>
  );
}
