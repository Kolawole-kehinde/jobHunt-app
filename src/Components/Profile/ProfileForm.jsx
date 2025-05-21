import CustomButton from "../CustomBotton";
import CustomInput from "../CustomInput";


const ProfileForm = ({ register, errors, onSubmit, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4 md:col-span-2">
        <h3 className="text-xl font-semibold text-gray-800">Update Profile</h3>
      </div>

      <CustomInput
        label="Full Name"
        name="name"
        placeholder="Enter full name"
        type="text"
        register={register}
        error={errors.name?.message}
      />

      <CustomInput
        label="Email Address"
        name="email"
        placeholder="Enter email"
        type="email"
        register={register}
        error={errors.email?.message}
      />

      <CustomInput
        label="Phone Number"
        name="phoneNumber"
        placeholder="Enter phone number"
        type="text"
        register={register}
        error={errors.phoneNumber?.message}
      />

      <div className="md:col-span-2 flex justify-end">
        <CustomButton className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition">
          Save Changes
        </CustomButton>
      </div>
    </form>
  );
};

export default ProfileForm;
