import React from "react";
import Image from "next/image";
import { formatNumber } from "@/utils";

interface StatsCardPropsType {
  imgUrl: string;
  title: string;
  value: number;
}
function StatsCard({ imgUrl, title, value }: StatsCardPropsType) {
  return (
    <div
      className="light-border background-light900_dark300 flex 
  flex-wrap items-center justify-start  gap-4 rounded-md border 
  p-6 shadow-light-300 dark:shadow-dark-200"
    >
      <Image src={imgUrl} width={40} height={50} alt="icon" />
      <div>
        <div className="paragraph-semibold text-dark200_light900">{value}</div>
        <div className="body-medium text-dark400_light700">{title}</div>
      </div>
    </div>
  );
}
interface StatsPropsType {
  NumberOfQuestion: number;
  NumberOfAnswer: number;
}
const Stats = ({ NumberOfQuestion, NumberOfAnswer }: StatsPropsType) => {
  return (
    <div className="mt-10">
      <h4 className="h3-semibold text-dark200_light900">وضعیت</h4>
      <div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4">
        <div
          className="light-border background-light900_dark300 flex 
        flex-wrap items-center justify-evenly gap-4 rounded-md border 
        p-6 shadow-light-300 dark:shadow-dark-200"
        >
          <div>
            <div className="paragraph-semibold text-dark200_light900">
              {formatNumber(NumberOfQuestion)}
            </div>
            <div className="body-medium text-dark400_light700">سوال</div>
          </div>
          <div>
            <div className="paragraph-semibold text-dark200_light900">
              {formatNumber(NumberOfAnswer)}
            </div>
            <div className="body-medium text-dark400_light700">پاسخ</div>
          </div>
        </div>
        <StatsCard
          imgUrl={"/assets/icons/gold-medal.svg"}
          value={0}
          title={"نشان طلا"}
        />
        <StatsCard
          imgUrl={"/assets/icons/silver-medal.svg"}
          value={0}
          title={"نشان نقره"}
        />
        <StatsCard
          imgUrl={"/assets/icons/bronze-medal.svg"}
          value={0}
          title={"نشان برنز"}
        />
      </div>
    </div>
  );
};

export default Stats;
