"use client";
import * as z from "zod";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { editProfileSchema } from "@/lib/validations/validation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { updateUser } from "@/lib/actions/user.action";

interface Props {
  mongoUser: string;
}
export function EditProfileForm({ mongoUser }: Props) {
  const parsedMongoUser = JSON.parse(mongoUser);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      fullName: parsedMongoUser.name || "",
      userName: parsedMongoUser.username || "",
      portfolioLink: parsedMongoUser.portfolioWebsite || "",
      location: parsedMongoUser.location || "",
      bio: parsedMongoUser.bio || "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof editProfileSchema>) {
    setIsEditing(true);
    try {
      console.log("fuck");
      alert("flsf");
      await updateUser({
        clerkId: parsedMongoUser.clerkId,
        updateData: {
          name: values.fullName,
          username: values.userName,
          portfolioWebsite: values.portfolioLink,
          location: values.location,
          bio: values.bio,
        },
        path: `/profile/${parsedMongoUser.clerkId}`,
      });
      router.back();
    } catch (error) {
      console.log(error);
    } finally {
      setIsEditing(false);
      alert("flsf");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" mt-9 flex w-full flex-col gap-9 lg:w-[60%]">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel className="paragraph-semibold text-dark400_light800 relative">
                اسم کامل
                <span className="absolute -left-3 -top-1 text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="no-focus paragraph-regular background-light700_dark300
                    light-border-2 text-dark300_light700 min-h-[56px] border outline-none"
                />
              </FormControl>

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-semibold text-dark400_light800 relative">
                نام کاربری
                <span className="absolute -left-3 -top-1 text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <>
                  <Input
                    {...field}
                    className="no-focus paragraph-regular background-light700_dark300
                    light-border-2 text-dark300_light700 min-h-[56px] border outline-none"
                  />
                </>
              </FormControl>

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="portfolioLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-semibold text-dark400_light800 relative">لینک سایتت رو بنویس</FormLabel>
              <FormControl>
                <>
                  <Input
                    {...field}
                    className="no-focus paragraph-regular background-light700_dark300
                    light-border-2 text-dark300_light700 min-h-[56px] border outline-none"
                  />
                </>
              </FormControl>

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-semibold text-dark400_light800 relative">لوکیشن</FormLabel>
              <FormControl>
                <>
                  <Input
                    {...field}
                    className="no-focus paragraph-regular background-light700_dark300
                    light-border-2 text-dark300_light700 min-h-[56px] border outline-none"
                  />
                </>
              </FormControl>

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-semibold text-dark400_light800 relative">
                بیوگرافی <span className="absolute -left-3 -top-1 text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <>
                  <Textarea
                    {...field}
                    className="no-focus paragraph-regular background-light700_dark300
                    light-border-2 text-dark300_light700 min-h-[56px] border outline-none"
                  />
                </>
              </FormControl>

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <div className="mt-7 flex justify-end">
          <Button
            type="submit"
            disabled={isEditing}
            // eslint-disable-next-line tailwindcss/no-custom-classname
            className=" !primary-gradient w-fit rounded-md px-4 py-2 !text-light-900"
          >
            {isEditing ? "در حال ویرایش پروفایل..." : "ویرایشk پروفایل"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
