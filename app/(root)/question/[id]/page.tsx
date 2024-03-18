import { getQuestionById } from "@/lib/actions/question.action";

export default async function QuestionDetailsPage({ params }: any) {
  const result = await getQuestionById({ questionId: params.id });
  return (
    <>
      <div>{params.id}</div>

      <div>{result!.question.title}</div>
    </>
  );
}
