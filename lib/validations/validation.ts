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
    .max(1000, {
      message: " توضیحات باید حداکثر 1000 کاراکتر باشد. ",
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
