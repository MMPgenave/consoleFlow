export const timeStampCalculator = (value: string): string => {
  const now = new Date();
  const diffInMillis = now.getTime() - new Date(value).getTime();
  const diffInSeconds = Math.floor(diffInMillis / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInYears > 0) {
    return `${diffInYears} ${diffInYears === 1 ? "سال" : "سال"} پیش`;
  } else if (diffInMonths > 0) {
    return `${diffInMonths} ${diffInMonths === 1 ? "ماه" : "ماه"} پیش`;
  } else if (diffInWeeks > 0) {
    return `${diffInWeeks} ${diffInWeeks === 1 ? "هفته" : "هفته"} پیش`;
  } else if (diffInDays > 0) {
    return `${diffInDays} ${diffInDays === 1 ? "روز" : "روز"} پیش`;
  } else if (diffInHours > 0) {
    return `${diffInHours} ${diffInHours === 1 ? "ساعت" : "ساعت"} پیش`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? "دقیقه" : "دقیقه"} پیش`;
  } else {
    return "همین الان";
  }
};

export function formatNumber(num: number): string {
  const suffixes = ["", "k", "m", "b", "t"];
  const suffixNum = Math.floor(("" + num).length / 3);
  let shortValue: number | string = parseFloat(
    (suffixNum !== 0 ? num / Math.pow(1000, suffixNum) : num).toPrecision(2),
  );
  if (shortValue % 1 !== 0) {
    shortValue = shortValue.toFixed(1);
  }
  return shortValue + suffixes[suffixNum];
}
export function getJoinMonthAndYear(joinDate: Date): string {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = monthNames[joinDate.getMonth()];
  const year = joinDate.getFullYear();

  return `${month}, ${year}`;
}
