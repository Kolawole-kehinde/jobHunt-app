import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import CustomInput from "../../CustomInput";
import CustomButton from "../../CustomBotton";
import ImageUploadAndPreview from "../../CustomInput/ImageUploadAndPreview";
import useFormValidate from "../../../hooks/useFormValidate";
import useUpdateProfile from "../hooks/useUpdateProfile";
import { profileSchema } from "../../../Schema/authSchema";


const ProfileInfo = () => {
  const { user } = useAuth();
  const { handleImageChange, imagePreview, updateProfile } = useUpdateProfile();

  const initialState = {
    email: user?.email || "",
    name: user?.fullName || "",
    profilePicture: user?.profilePicture || "",
  };

  // Use custom form validation hook
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
      setValue("profilePicture", user?.profilePicture);
    }
  }, [user, setValue]);

  // Handle the form submission
  const onSubmit = (data) => {
    updateProfile(data); // Call the updateProfile function to update Supabase
  };

  return (
    <section className="bg-white shadow-md p-4 space-y-5 h-[500px] rounded-md shadow-blue-900">
      <h2 className="text-blue-900 text-2xl font-semibold">Profile Info</h2>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
          label={"Full Name"}
          name={"name"}
          placeholder={"Enter Full Name"}
          type={"text"}
          register={register}
          error={errors.name?.message}
        />
        <CustomInput
          label={"Email"}
          name={"email"}
          placeholder={"Enter Email"}
          type={"text"}
          register={register}
          error={errors.email?.message}
        />

        {/* Profile Picture Upload Section */}
        <ImageUploadAndPreview
          handleImageChange={handleImageChange}
          imagePreview={imagePreview}
          heading="Upload Profile Picture"
        />

        <CustomButton type="submit">Update</CustomButton>
      </form>
    </section>
  );
};

export default ProfileInfo;
