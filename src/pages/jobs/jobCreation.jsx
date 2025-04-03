import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { jobSchema } from '../../Schema/jobSchema';
import CustomInput from '../../Components/CustomInput';
import { companyInfoFields, jobInfoFields } from '../../constant/jobInputLists';


// Default values for the form
const defaultValues = {
  title: '',
  description: '',
  salary: '',
  requirements: '',
  benefits: '',
  company: '',
  address: '',
  city: '',
  state: '',
  phone: '',
  email: '',
};

const JobCreation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues, // Set default values
  });


  // Handle form submission
  const onSubmit = (data) => {
    console.log(data);
    // Reset the form if needed
    reset();
  };

  return (
    <section className="flex justify-center items-center mt-20">
      <div className="bg-white p-8 rounded-lg w-full md:w-600 mx-6">
        <h2 className="text-4xl text-center font-bold mb-4">Create Job Listing</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          
          {/* Job Info Section */}
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-500">Job Info</h2>
          {jobInfoFields.map(({name, type, placeholder}) => (
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
          <h2 className="text-2xl font-bold mt-10 mb-6 text-center text-gray-500">Company Info & Location</h2>
          {companyInfoFields.map(({name, type, placeholder}) => (
            <CustomInput
              key={name}
              name={name}
              placeholder={placeholder}
              type={type}
              register={register}
              error={errors[name]?.message}
            />
          ))}

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 mt-6 rounded focus:outline-none"
          >
            Save
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

export default JobCreation ;
