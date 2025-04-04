import { z } from "zod";

export const jobSchema = z.object({
  title: z.string().min(1, 'Job title is required'),
  description: z.string().min(1, 'Job description is required'),
  salary: z.coerce.number({
    message: "Invalid salary format",
  }).min(1, "Salary must be greater than 0"),
  requirements: z.string().min(1, 'Requirements are required'),
  benefits: z.string().min(1, 'Benefits are required'),
  company: z.string().min(1, 'Company name is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  phone: z.string().min(1, 'Phone is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
});
