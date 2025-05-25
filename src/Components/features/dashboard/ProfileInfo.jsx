import { useContext, useEffect } from "react";
import { toast } from "react-hot-toast";
import AuthContext from "../../../contextApi/authContext";
import useCreateJob from "../hooks/useCreateJob";
import useFormValidate from "../../../hooks/useFormValidate";
import { profileSchema } from "../../../Schema/authSchema";
import ProfileImageUploader from "../../Profile/ProfileImageUploader";
import ProfileForm from "../../Profile/ProfileForm";

const ProfileInfo = () => {
  const { user, updateProfile } = useContext(AuthContext);
  const { handleImageChange, imagePreview } = useCreateJob();

  const initialState = {
    email: "",
    name: "",
    phoneNumber: "",
    profilePicture: "",
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
      await updateProfile({
        fullName: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        profilePicture: imagePreview || user?.profilePicture || "",
      });
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    }
  };

  return (
    <section className="bg-white shadow-md p-4 space-y-5 h-[650] md:h-[550px] rounded-md shadow-blue-900">
      <div className="flex flex-col md:flex-row justify-center items-center gap-6">
        <ProfileImageUploader
          imageSrc={imagePreview || user?.profilePicture || "/default-avatar.png"}
          onChange={handleImageChange}
        />
        <div className="text-center">
          <h2 className="text-2xl font-semibold">{user?.fullName}</h2>
          <p className="text-gray-600">{user?.email}</p>
          <p className="text-gray-600">{user?.phoneNumber}</p>
        </div>
      </div>

      <ProfileForm
        register={register}
        errors={errors}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
      />
    </section>
  );
};

export default ProfileInfo;
