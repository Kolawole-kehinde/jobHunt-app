// pages/JobCreation.jsx

import React from "react";
import useCreateJob from "../../Components/features/hooks/useCreateJob";
import ImageUploadAndPreview from "../../Components/CustomInput/ImageUploadAndPreview";
import JobTitle from "../../Components/features/jobs/JobTitle";
import { jobFormFields } from "../../constant/jobInputLists";
import FormSection from "../../Components/FormSection";

const JobCreation = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    handleImageChange,
    imagePreview,
    isPending, // ✅ Correct hook usage
  } = useCreateJob();

  return (
    <section className="flex justify-center items-center mt-20 px-4 lg:px-0 ">
      <div className="bg-white p-4 lg:p-8 rounded-lg shadow-md w-full md:w-600 lg:mx-6">
        <JobTitle className="text-4xl text-center font-bold mb-6">
          Create Job Listing
        </JobTitle>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {jobFormFields.map((section) => (
            <FormSection
              key={section.title}
              section={section}
              register={register}
              errors={errors}
            />
          ))}

          <ImageUploadAndPreview
            handleImageChange={handleImageChange}
            imagePreview={imagePreview}
          />

          <button
            disabled={isPending}
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 mt-6 rounded focus:outline-none"
          >
            {isPending ? "Loading..." : "Save"}
          </button>

          <a
            href="/"
            className="block text-center w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded focus:outline-none"
          >
            Cancel
          </a>

          {/* Safe display of validation messages */}
          {Object.keys(errors).length > 0 && (
            <ul className="text-red-500 text-sm mt-4 space-y-1">
              {Object.entries(errors).map(([field, error]) => (
                <li key={field}>
                  <strong>{field}:</strong> {error.message}
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>
    </section>
  );
};

export default JobCreation;
