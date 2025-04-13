import { useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { profileSchema } from "../../../Schema/authSchema";
import CustomInput from "../../CustomInput";
import CustomButton from "../../CustomBotton";
import ImageUploadAndPreview from "../../CustomInput/ImageUploadAndPreview";
import useFormValidate from "../../../hooks/useFormValidate";


const ProfileInfo = () => {
  const { user } = useAuth();
  const initialState = {
    email: "",
    name: "",
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
    }
  }, [user, setValue]);
  return (
    <section className="bg-white shadow-md p-4 space-y-5 h-[500px] rounded-md shadow-blue-900">
      <h2 className="text-blue-900 text-2xl font-semibold">Profile Info</h2>

      <form className="space-y-4 ">
        <CustomInput
          label={"Full Name"}
          name={"name"}
          placeholder={"Enter Full Name"}
          type={"text"}
          register={register}
          error={errors[name]?.message}
        />
        <CustomInput
          label={"Email"}
          name={"email"}
          placeholder={"Enter Email"}
          type={"text"}
          register={register}
          error={errors[name]?.message}
        />
        <ImageUploadAndPreview
         handleImageChange ={() => {}}
         imagePreview ={""}
          heading={"Upload Profile Picture"}
        />
        <CustomButton>Update</CustomButton>
      </form>
    </section>
  );
};

export default ProfileInfo;
