import { useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import CustomInput from "../../CustomInput";
import CustomButton from "../../CustomBotton";
import useFormValidate from "../../../hooks/useFormValidate";
import useUpdateProfile from "../hooks/useUpdateProfile";
import { profileSchema } from "../../../Schema/authSchema";

const ProfileInfo = () => {
  const { user } = useAuth();
  const { handleImageChange, imagePreview, updateProfile } = useUpdateProfile();

  const initialState = {
    email: "",
    name: "",
    phoneNumber: "",
    profilePicture: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useFormValidate(initialState, profileSchema);

  useEffect(() => {
    if (user) {
      setValue("email", user?.email);
      setValue("name", user?.fullName);
      setValue("phoneNumber", user?.phoneNumber || "");
      setValue("profilePicture", user?.profilePicture);
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      await updateProfile(data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <section className="bg-white shadow-md p-4 space-y-5 h-[500px] rounded-md shadow-blue-900">
      {/* Top Section */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={imagePreview || user?.profilePicture}
          alt="Profile"
          className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
        />
        <div className="flex flex-col gap-5">
        <div>
          <h2 className="font-semibold text-lg md:text-xl">{user?.fullName}</h2>
          <p className="text-sm text-gray-700">{user?.email}</p>
        </div>

        {/* Just Change Picture Button */}
        <div className="">
          <label
            htmlFor="profilePicUpload"
            className="cursor-pointer bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded"
          >
            Change picture
          </label>
          <input
            id="profilePicUpload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
        </div>
      </div>

      {/* Bottom Form Section */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-black text-white p-6 rounded-b-lg grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Left: Profile Details */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">Profile Details</h3>
          <CustomInput
            label="Full name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            register={register}
            error={errors.name?.message}
          />
          <CustomInput
            label="Your email"
            name="email"
            type="text"
            placeholder="Enter your email"
            register={register}
            error={errors.email?.message}
          />
          <CustomInput
            label="Your phone number"
            name="phoneNumber"
            type="text"
            placeholder="Enter your phone number"
            register={register}
            error={errors.phoneNumber?.message}
          />
        </div>

        {/* Right: Change Password */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">Change Password</h3>
          <CustomInput
            label="Current password"
            name="currentPassword"
            type="password"
            placeholder="Enter your password here"
            register={register}
            error={errors.currentPassword?.message}
          />
          <CustomInput
            label="New password"
            name="newPassword"
            type="password"
            placeholder="Enter new password here"
            register={register}
            error={errors.newPassword?.message}
          />
          <CustomInput
            label="Confirm password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password here"
            register={register}
            error={errors.confirmPassword?.message}
          />
        </div>

        {/* Save Button */}
        <div className="md:col-span-2 flex justify-end">
          <CustomButton
            type="submit"
            
          >
            Save Changes
          </CustomButton>
        </div>
      </form>
    </section>
  );
};

export default ProfileInfo;
