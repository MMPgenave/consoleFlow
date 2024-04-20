"use client";
import Image from "next/image";
import { answersToQuestion } from "@/lib/actions/answer.action";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Editor } from "@tinymce/tinymce-react";
import * as z from "zod";
import React, { useRef, useState } from "react";
import { answerSchema } from "@/lib/validations/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
export default function AnswersToQuestion({ questionId, userId }: any) {
  const editorRef = useRef(null);
  const path = usePathname();
  const [answering, setIsAnswering] = useState(false);

  const form = useForm<z.infer<typeof answerSchema>>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
      answer: "",
    },
  });

  async function hanlderSubmit(value: z.infer<typeof answerSchema>) {
    try {
      setIsAnswering(true);
      await answersToQuestion({
        content: value.answer,
        question: questionId,
        author: JSON.parse(userId),
        path,
      });
      form.reset();
      if (editorRef.current) {
        const editor = editorRef.current as any;
        editor.setContent("");
      }
      return toast({
        title: "پاسخ شما با موفقیت ثبت شد",
      });
    } catch (error) {
      console.error("when submitting you answer an Error happend.");
      return toast({
        title: "در ثبت پاسخ شما مشکلی به وجود آمد",
        description: "لطفا دوباره تلاش کنید",
        variant: "destructive",
      });
    } finally {
      setIsAnswering(false);
    }
  }

  if (!userId) {
    return (
      <div className="text-dark400_light800 paragraph-semibold mt-5 text-center">
        برای پاسخ دان به سوال شما باید
        <Link href="/sign-in" className="mx-1 text-primary-500">
          وارد سایت
        </Link>
        شوید
      </div>
    );
  }

  return (
    <div className="mt-10">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="text-dark400_light800 paragraph-semibold ">جوابتون رو اینجا بنویسید</h4>
        <Button
          // eslint-disable-next-line tailwindcss/no-custom-classname
          className="light-border-2 btn flex w-fit 
          gap-1.5 rounded-md bg-gray-100 px-4 
         py-2.5 text-primary-500 shadow-none"
        >
          <Image src="/assets/icons/stars.svg" alt="star" width={12} height={12} />
          پاسخ هوش مصنوعی ایجاد کنید
        </Button>
      </div>
      <Form {...form}>
        <form className="mt-12 flex w-full flex-col items-start gap-10 " onSubmit={form.handleSubmit(hanlderSubmit)}>
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    // @ts-ignore
                    onInit={(evt, editor) => (editorRef.current = editor)}
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
                      content_style: "body { font-family:'yekan-bakh'; font-size:14px; direction: rtl; }",
                      // skin: mode === "dark" ? "oxide-dark" : "dark",
                      // content_css: mode === "dark" ? "dark" : "light",
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
    </div>
  );
}
