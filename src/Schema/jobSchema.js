import { z } from "zod";

export const jobSchema = z.object({
  // Job Info Fields
  title: z.string().min(1, "Job title is required"),
  description: z.string().min(1, "Job description is required"),
  salary: z.coerce
    .number({
      message: "Invalid salary format",
    })
    .min(1, "Salary must be greater than 0"),
  requirements: z.string().min(1, "Requirements are required"),
  benefits: z.string().min(1, "Benefits are required"),
  tags: z.string().min(3, {
    message: "Tags must be at least 3 characters",
  }),
  job_type: z.enum(["full-time", "part-time"], {
    required_error: "Job type is required",
  }),
  work_mode: z.enum(["remote", "on-site"], {
    required_error: "Work mode is required",
  }),

  // Company Info Fields
  company: z.string().min(1, "Company name is required"),
  company_website: z.string().url("Invalid URL format for company website"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
});
