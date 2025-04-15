import CustomInput from "./CustomInput";
import JobTitle from "./features/jobs/JobTitle";


const FormSection = ({ section, register, errors }) => {
  return (
    <div className="space-y-4">
      <JobTitle className="text-2xl font-bold mb-4 text-center text-gray-500">
        {section.title}
      </JobTitle>
      {section.fields.map((field) => (
        <CustomInput
          key={field.name}
          {...field}
          register={register}
          error={errors[field.name]?.message}
        />
      ))}
    </div>
  );
};

export default FormSection;
