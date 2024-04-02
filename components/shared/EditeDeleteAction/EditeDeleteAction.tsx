"use client";
import { deleteQuestionAction } from "@/lib/actions/question.action";
import Image from "next/image";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { deleteAnswerAction } from "@/lib/actions/answer.action";
interface EditeDeleteActionPropTypes {
  itemId: string;
  type: string;
}
const EditeDeleteAction = ({ itemId, type }: EditeDeleteActionPropTypes) => {
  const currentPath = usePathname();
  const router = useRouter();
  async function deleteItem() {
    try {
      if (type === "Question") {
        await deleteQuestionAction({ questionId: itemId, path: currentPath });
      } else {
        await deleteAnswerAction({ answerId: itemId, path: currentPath });
      }
    } catch (error) {
      console.error(error);
    }
  }
  function editQuestion() {
    router.push(`/question/edit/${itemId}`);
  }
  return (
    <div className="flex items-center gap-3">
      {type === "Question" && (
        <Image
          src={"/assets/icons/edit.svg"}
          alt="delete"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={() => {
            editQuestion();
          }}
        />
      )}
      <Image
        src={"/assets/icons/trash.svg"}
        alt="delete"
        width={20}
        height={20}
        className="cursor-pointer"
        onClick={() => {
          deleteItem();
        }}
      />
    </div>
  );
};

export default EditeDeleteAction;
