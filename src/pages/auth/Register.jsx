import CustomButton from "../../Components/CustomBotton";
import AuthLayout from "../../Components/layout/AuthLayout";
import useFormValidate from "../../hooks/useFormValidate";
import { useNavigate } from "react-router";
import { registerInputs } from "../../constant/auth";
import { useState } from "react";
import { registerSchema } from "../../Schema/authSchema";
import { useAuth } from "../../hooks/useAuth";
import { signUpApi } from "../../services/auth";
import toast from "react-hot-toast";
import CustomInput from "../../Components/CustomInput";

const Register = () => {
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const initialState = {
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    passwordConfirmation: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useFormValidate(initialState, registerSchema);

  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    const payload = {
      fullName: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
    };

    setLoading(true);
    try {
      const res = await signUpApi(payload);
      setUser(res);
      reset();
      toast.success("User registered successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Registration failed, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Register"
      text="Already have an account?"
      subText="Login"
      textLink="/auth/login"
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {registerInputs.map(({ name, placeholder, type }) => (
          <CustomInput
            key={name}
            name={name}
            placeholder={placeholder}
            type={type}
            register={register}
            error={errors[name]?.message}
          />
        ))}

        <CustomButton disabled={loading}>
          {loading ? "Loading..." : "Register"}
        </CustomButton>
      </form>
    </AuthLayout>
  );
};

export default Register;
