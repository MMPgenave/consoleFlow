import { z } from "zod";

export const questionSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: " ورودی باید حداقل 5 کاراکتر باشد. ",
    })
    .max(100, {
      message: " ورودی باید حداکثر 50 کاراکتر باشد. ",
    }),
  explanation: z
    .string()
    .min(50, {
      message: " توضیحات باید حداقل 50 کاراکتر باشد. ",
    })
    .max(2000, {
      message: " توضیحات باید حداکثر 2000 کاراکتر باشد. ",
    }),
  tags: z
    .array(z.string().min(1).max(15))
    .min(1, {
      message: " حداقل باید 1 تگ رو بنویسید ",
    })
    .max(3, {
      message: " حداکثر میتوان 3 تا تگ نوشت ",
    }),
});

export const answerSchema = z.object({
  answer: z.string().min(50, {
    message: " توضیحات باید حداقل 50 کاراکتر باشد. ",
  }),
});

export const editProfileSchema = z.object({
  fullName: z
    .string()
    .min(5, {
      message: " اسم باید حداقل 5 کاراکتر باشد. ",
    })
    .max(50, {
      message: " اسم باید حداکثر 50 کاراکتر باشد. ",
    }),
  userName: z
    .string()
    .min(5, {
      message: " اسم کاربری باید حداقل 5 کاراکتر باشد. ",
    })
    .max(50, {
      message: " اسم کاربری باید حداکثر 50 کاراکتر باشد. ",
    }),
  portfolioLink: z.string().url(),
  location: z
    .string()
    .min(5, {
      message: " لوکیشن باید حداقل 5 کاراکتر باشد. ",
    })
    .max(50, {
      message: " لوکیشن باید حداکثر 50 کاراکتر باشد. ",
    }),
  bio: z
    .string()
    .min(50, {
      message: " بیوگرافی باید حداقل 50 کاراکتر باشد. ",
    })
    .max(200, {
      message: " بیوگرافی باید حداکثر 200 کاراکتر باشد. ",
    }),
});
