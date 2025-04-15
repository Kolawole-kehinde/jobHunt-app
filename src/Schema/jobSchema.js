// Schema/jobSchema.js

import { z } from "zod";

export const jobSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  salary: z.coerce
    .number({
      message: "Invalid salary format",
    })
    .min(1, "Salary must be greater than 0"),
  requirements: z.string().min(1, "Requirements are required"),
  benefits: z.string().min(1, "Benefits are required"),
  company: z.string().min(1, "Company name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email"),
  tags: z.string().min(1, "At least one tag is required"),
  company_website: z.string().url("Invalid URL"),
  job_type: z.string().min(1, "Job type is required"),
  work_mode: z.string().min(1, "Work mode is required"),
});
