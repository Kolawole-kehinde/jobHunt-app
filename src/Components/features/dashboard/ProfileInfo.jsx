import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useFormValidate from "../../../hooks/useFormValidate";
import { profileSchema } from "../../../Schema/authSchema";
import useCreateJob from "../hooks/useCreateJob";
import CustomInput from "../../CustomInput";
import CustomButton from "../../CustomBotton";
import AuthContext from "../../../contextApi/authContext";

const ProfileInfo = () => {
  const { user, updatePassword, updateProfile } = useContext(AuthContext);

  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { handleImageChange, imagePreview } = useCreateJob();

  const initialState = {
    email: "",
    name: "",
    phoneNumber: "",
    profilePicture: "",
    password: "",
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
      setValue("email", user.email || "");
      setValue("name", user.fullName || "");
      setValue("phoneNumber", user.phoneNumber || "");
      setValue("profilePicture", user.profilePicture || "");
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      // Update profile data
      await updateProfile({
        fullName: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        profilePicture: imagePreview || user?.profilePicture || "",
      });

      // Update password if provided
      if (password && password === confirmPassword) {
        await updatePassword(password);
        toast.success("Password updated successfully!");
      } else if (password && password !== confirmPassword) {
        toast.error("Passwords do not match!");
      }
    } catch (error) {
      toast.error("Profile update failed");
      console.error("Update error:", error);
    }
  };

  return (
    <section className="bg-white shadow-md p-4 space-y-5 h-auto rounded-md shadow-blue-900">
      {/* Header */}
      <div className="flex items-center px-8 py-6">
        <img
          src={imagePreview || user?.profilePicture || "/default-avatar.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full border-2 border-white object-cover"
        />
        <div className="ml-5 flex-1">
          <h2 className="text-2xl font-semibold text-gray-900">{user?.fullName}</h2>
          <p className="text-gray-700">{user?.email}</p>
        </div>

        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        <label
          htmlFor="fileInput"
          className="bg-blue-400 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded-full cursor-pointer"
        >
          Change picture
        </label>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-900 px-8 py-6 grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* Left Column: Profile Details */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Profile Details</h3>

          <CustomInput
            label="Full name"
            name="name"
            placeholder="Enter full name"
            type="text"
            register={register}
            error={errors.name?.message}
            className="bg-gray-800 text-white placeholder-gray-500 border border-gray-600 rounded-md p-3 w-full"
            labelClassName="text-gray-300"
          />

          <CustomInput
            label="Your email"
            name="email"
            placeholder="Enter your email"
            type="email"
            register={register}
            error={errors.email?.message}
            className="bg-gray-800 text-white placeholder-gray-500 border border-gray-600 rounded-md p-3 w-full"
            labelClassName="text-gray-300"
          />

          <CustomInput
            label="Your phone number"
            name="phoneNumber"
            placeholder="Enter your phone number"
            type="text"
            register={register}
            error={errors.phoneNumber?.message}
            className="bg-gray-800 text-white placeholder-gray-500 border border-gray-600 rounded-md p-3 w-full"
            labelClassName="text-gray-300"
          />
        </div>

        {/* Right Column: Change Password */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Change Password</h3>

          <CustomInput
            label="Current password"
            name="currentPassword"
            placeholder="Enter your password here"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            error={errors.currentPassword?.message}
            className="bg-gray-800 text-gray-300 placeholder-gray-500 border border-gray-600 rounded-md p-3 w-full relative"
            labelClassName="text-gray-300"
          />

          <CustomInput
            label="New password"
            name="password"
            placeholder="Enter new password here"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password?.message}
            className="bg-gray-800 text-gray-300 placeholder-gray-500 border border-gray-600 rounded-md p-3 w-full"
            labelClassName="text-gray-300"
          />

          <CustomInput
            label="Confirm password"
            name="confirmPassword"
            placeholder="Confirm your password here"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword?.message}
            className="bg-gray-800 text-gray-300 placeholder-gray-500 border border-gray-600 rounded-md p-3 w-full"
            labelClassName="text-gray-300"
          />
        </div>

        {/* Save Button */}
        <div className="md:col-span-2 flex justify-end">
          <CustomButton className="bg-blue-400 hover:bg-blue-500 text-black font-semibold px-6 py-3 rounded-md">
            Save Changes
          </CustomButton>
        </div>
      </form>
    </section>
  );
};

export default ProfileInfo;
