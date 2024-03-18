import Link from "next/link";

interface PropType {
  data: {
    text: string;
    description: string;
    inQuestionsUsed: {}[];
    _id: string;
  };
}
export default function TagCard({ data }: PropType) {
  return (
    <Link
      href={`/tags/${data._id}`}
      className="shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]"
    >
      <article
        className="background-light900_dark200 light-border 
      flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]"
      >
        <div className="background-light800_dark400 w-fit rounded-sm px-5 py-1.5">
          <p className="paragraph-semibold text-dark300_light900">
            {data.text}
          </p>
        </div>

        <p className="small-regular text-dark500_light700 mt-4">
          جاوا اسکریپت که اغلب به اختصار JS نامیده می شود، یک زبان برنامه نویسی
          است که در کنار HTML و CSS یکی از فناوری های اصلی شبکه جهانی وب است.
        </p>
        <p className="small-medium text-dark400_light500 mt-3.5">
          <span className="body-semibold primary-text-gradient ml-1.5">
            {data.inQuestionsUsed.length}+
          </span>
          سوال
        </p>
      </article>
    </Link>
  );
}
