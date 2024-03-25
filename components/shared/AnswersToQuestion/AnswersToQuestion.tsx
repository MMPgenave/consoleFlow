"use client";
import { answersToQuestion } from "@/lib/actions/answer.action";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Editor } from "@tinymce/tinymce-react";
import * as z from "zod";
import React, { useRef, useState } from "react";
import { answerSchema } from "@/lib/validations/validation";
import { zodResolver } from "@hookform/resolvers/zod";

export default function AnswersToQuestion({ questionId, userId }: any) {
  const editorRef = useRef(null);
  const [answering, setIsAnswering] = useState(false);

  const form = useForm<z.infer<typeof answerSchema>>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
      answer: "",
    },
  });

  async function hanlderSubmit(value: z.infer<typeof answerSchema>) {
    try {
      console.log(value);
      setIsAnswering(true);
      await answersToQuestion({
        content: value.answer,
        question: questionId,
        author: JSON.parse(userId),
        path: "/",
      });
    } catch (error) {
      console.error("when submitting you answer an Error happend.");
    } finally {
      setIsAnswering(false);
    }
  }

  return (
    <Form {...form}>
      <form
        className="mt-12 flex w-full flex-col items-start gap-10 "
        onSubmit={form.handleSubmit(hanlderSubmit)}
      >
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-dark400_light800 text-lg ">
                جوابتون رو اینجا بنویسید
              </FormLabel>
              <FormControl>
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                  // @ts-ignore
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue=""
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
                  init={{
                    height: 350,
                    menubar: false,
                    plugins: [
                      "advlist autolink lists link image charmap  preview anchor",
                      "searchreplace visualblocks codesample fullscreen",
                      "insertdatetime media table  ",
                    ].join(", "),
                    toolbar:
                      "undo redo |  " +
                      "codesample | bold italic forecolor | alignleft aligncenter |" +
                      "alignright alignjustify | bullist numlist ",
                    content_style:
                      "body { font-family:'yekan-bakh'; font-size:14px; direction: rtl; }",
                  }}
                />
              </FormControl>

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={answering}
          // eslint-disable-next-line tailwindcss/no-custom-classname
          className=" !primary-gradient w-fit rounded-md px-4 py-2 !text-light-900"
        >
          {answering ? "در حال ثبت جواب..." : "ثبت جواب"}{" "}
        </Button>
      </form>
    </Form>
  );
}
