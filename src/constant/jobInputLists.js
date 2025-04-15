// constants/jobFormFields.js

export const jobFormFields = [
  {
    title: "Job Info",
    fields: [
      { name: "title", placeholder: "Job Title", label: "Job Title", type: "text" },
      { name: "description", placeholder: "Job Description", label: "Job Description", type: "textarea" },
      { name: "salary", placeholder: "Annual Salary", label: "Salary", type: "text" },
      { name: "requirements", placeholder: "Requirements", label: "Requirements", type: "textarea" },
      { name: "benefits", placeholder: "Benefits", label: "Benefits", type: "textarea" },
      { name: "tags", placeholder: "Add tags, separated by commas", label: "Tags", type: "text" },
      {
        name: "job_type",
        placeholder: "Select Employment Type",
        label: "Employment Type",
        type: "select",
        options: [
          
          { value: "full-time", label: "Full-time" },
          { value: "part-time", label: "Part-time" },
        ],
      },
      {
        name: "work_mode",
        placeholder: "Select Work Mode",
        label: "Work Mode",
        type: "select",
        options: [
          
          { value: "remote", label: "Remote" },
          { value: "on-site", label: "On-site" },
        ],
      },
    ],
  },
  {
    title: "Company Info & Location",
    fields: [
      { name: "company", placeholder: "Company Name", label: "Company", type: "text" },
      { name: "company_website", placeholder: "Company Website", label: "Website", type: "text" },
      { name: "address", placeholder: "Address", label: "Address", type: "text" },
      { name: "city", placeholder: "City", label: "City", type: "text" },
      { name: "state", placeholder: "State", label: "State", type: "text" },
      { name: "phone", placeholder: "Phone", label: "Phone", type: "text" },
      { name: "email", placeholder: "Email", label: "Email", type: "email" },
    ],
  },
];
