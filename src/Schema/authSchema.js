import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Full Name must be at least 3 characters" })
      .trim(),
    email: z
      .string()
      .email({ message: "Kindly provide a valid email" })
      .trim(),
    phoneNumber: z
      .string()
      .min(7, { message: "Phone number must be at least 7 digits" })
      .trim(),
    password: z
      .string()
      .min(3, { message: "Password must be at least 3 characters" }),
    passwordConfirmation: z
      .string()
      .min(3, {
        message: "Password Confirmation must be at least 3 characters",
      })
      .trim(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });


export const loginSchema = z.object({
  email: z.string().email({ message: "Kindly provide a valid email" }).trim(),
  password: z
    .string()
    .min(3, { message: "Password must be at least 3 characters" }),
});


export const profileSchema = z.object({
  email: z.string().email({ message: "Kindly provide a valid email" }).trim(),
  name: z
    .string()
    .min(3, { message: "Full Name must be at least 3 characters" })
    .trim(),
  phoneNumber: z
    .string()
    .min(7, { message: "Phone number must be at least 7 digits" })
    .trim(),
});
