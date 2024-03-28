"use client";
import * as z from "zod";
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { questionSchema } from "@/lib/validations/validation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { createQuestion } from "@/lib/actions/question.action";
import { useRouter, usePathname } from "next/navigation";
// import { useTheme } from "@/context/ThemeProvider";
const type: string = "create";
interface Props {
  mongoUserId: string;
}
export function QuestionForm({ mongoUserId }: Props) {
  // const { mode } = useTheme()!;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  const editorRef = useRef(null);
  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      title: "",
      explanation: "",
      tags: [],
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof questionSchema>) {
    setIsSubmitting(true);
    try {
      await createQuestion({
        title: values.title,
        content: values.explanation,
        tags: values.tags,
        author: JSON.parse(mongoUserId),
        path: pathName,
      });
      // navigate to home page
      router.push("/");
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  }

  function onkeydownHandler(
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any,
  ) {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();
      const inputElement = e.target as HTMLInputElement;
      const inputValue = inputElement.value.trim();

      if (inputValue !== "") {
        if (inputValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "تعداد کاراکتر هر تگ باید کمتر از 15 عدد باشد",
          });
        }
      }
      if (!field.value.includes(inputValue)) {
        form.setValue("tags", [...field.value, inputValue]);
        inputElement.value = "";

        form.clearErrors();
      } else {
        form.trigger();
      }
    }
  }
  function removeTagHandler(field: any, tag: string) {
    const newTags = field.value.filter((item: string) => item !== tag);
    form.setValue("tags", newTags);
    console.log(field.value);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-12"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel className="paragraph-semibold text-dark400_light800 relative">
                عنوان سوال
                <span className="absolute -left-3 -top-1 text-primary-500">
                  *
                </span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="no-focus paragraph-regular background-light900_dark300
                    light-border-2 text-dark300_light700 min-h-[56px] border outline-none"
                />
              </FormControl>
              <FormDescription className="body-regular mt-2 text-light-500 ">
                دقیق باشید و تصور کنید دارید از شخص دیگری سوال می‌پرسید
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-semibold text-dark400_light800 relative">
                توضیح مفصلی در مورد سوال شما؟
                <span className="absolute -left-3 -top-1 text-primary-500">
                  *
                </span>
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
                    // skin: mode === "dark" ? "oxide-dark" : "dark",
                    // content_css: mode === "dark" ? "dark" : "light",
                  }}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2 text-light-500 ">
                سوال را معرفی کنید و آنچه را که در عنوان قرار داده اید بسط دهید.
                حداقل 20 کاراکتر.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-semibold text-dark400_light800 relative">
                تگ ها
                <span className="absolute -left-3 -top-1 text-primary-500">
                  *
                </span>
              </FormLabel>
              <FormControl>
                <>
                  <Input
                    onKeyDown={(e) => onkeydownHandler(e, field)}
                    placeholder=" چند تا تگ اضافه کنید"
                    className="no-focus paragraph-regular background-light900_dark300
                    light-border-2 text-dark300_light700 min-h-[56px] border outline-none"
                  />
                  {field.value.length > 0 && (
                    <div className="mt-2 flex items-center gap-4">
                      {
                        // @ts-ignore
                        field.value.map((tag) => {
                          return (
                            <div
                              key={tag}
                              className=" subtle-medium background-light800_dark300  flex items-center gap-2 rounded-md border-none
                                 px-4 py-2 capitalize text-light-800 dark:text-dark-400"
                            >
                              <Image
                                src="assets/icons/close.svg"
                                width={15}
                                height={15}
                                alt="close-btn"
                                className="dark:invert "
                                onClick={() => removeTagHandler(field, tag)}
                              />
                              <div className="text-dark400_light900">{tag}</div>
                            </div>
                          );
                        })
                      }
                    </div>
                  )}
                </>
              </FormControl>
              <FormDescription className="body-regular mt-2 text-light-500 ">
                حداکثر 5 تگ اضافه کنید تا توضیح دهید سوال شما در مورد چیست. برای
                دیدن پیشنهادات شروع به تایپ کنید
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          // eslint-disable-next-line tailwindcss/no-custom-classname
          className=" !primary-gradient w-fit rounded-md px-4 py-2 !text-light-900"
        >
          {isSubmitting ? (
            <>
              {type === "edit" ? "در حال ویرایش سوال..." : "در حال ثبت سوال..."}
            </>
          ) : (
            <>{type === "edit" ? "ویرایش سوال" : " ثبت سوال"}</>
          )}
        </Button>
      </form>
    </Form>
  );
}
