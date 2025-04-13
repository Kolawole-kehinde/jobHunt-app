import React from "react";
import { companyInfoFields, jobInfoFields } from "../../constant/jobInputLists";
import JobTitle from "../../Components/features/jobs/JobTitle";
import useCreateJob from "../../Components/features/hooks/useCreateJob";
import ImageUploadAndPreview from "../../Components/CustomInput/ImageUploadAndPreview";
import CustomInput from "../../Components/CustomInput";

const JobCreation = () => {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isPending,
    handleImageChange,
    imagePreview,
  } = useCreateJob();

  return (
    <section className="flex justify-center items-center mt-20">
      <div className="bg-white p-8 rounded-lg w-full md:w-600 mx-6">
        <JobTitle className="text-4xl text-center font-bold mb-4">
          Create Job Listing
        </JobTitle>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Job Info Section */}
          <JobTitle className="text-2xl font-bold mb-6 text-center text-gray-500">
            Job Info
          </JobTitle>
          {jobInfoFields.map(({ name, type, placeholder }) => (
            <CustomInput
              key={name}
              name={name}
              placeholder={placeholder}
              type={type}
              register={register}
              error={errors[name]?.message}
            />
          ))}

          {/* Company Info & Location Section */}
          <JobTitle className="text-2xl font-bold mt-10 mb-6 text-center text-gray-500">
            Company Info & Location
          </JobTitle>
          {companyInfoFields.map(({ name, type, placeholder }) => (
            <CustomInput
              key={name}
              name={name}
              placeholder={placeholder}
              type={type}
              register={register}
              error={errors[name]?.message}
            />
          ))}
           
          {/* Image Upload Section */}
          <ImageUploadAndPreview handleImageChange={handleImageChange} imagePreview={imagePreview}/>

          <button
            disabled={isPending}
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 mt-6 rounded focus:outline-none"
          >
            {isPending ? "Loading" : "Save"}
          </button>

          <a
            href="/"
            className="block text-center w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded focus:outline-none"
          >
            Cancel
          </a>
        </form>
      </div>
    </section>
  );
};

export default JobCreation;
