
import CustomButton from '../../Components/CustomBotton';
import AuthLayout from '../../Components/layout/AuthLayout';
import useFormValidate from "../../hooks/useFormValidate";
import { loginInputs } from "../../constant/auth";
import { loginSchema } from "../../Schema/authSchema";
import { useState } from "react";
import { SignInApi } from "../../services/auth";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { Link, useNavigate } from 'react-router';
import CustomInput from '../../Components/CustomInput';


const Login = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const initialState = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormValidate(initialState, loginSchema);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Call SignInApi with the form data
      const user = await SignInApi(data);
      setUser(user); // Set user in context or state

      toast.success("User logged in successfully!");
      return navigate("/dashboard"); // Redirect to dashboard after successful login
    } catch (error) {
      toast.error(error?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title={"Login"}
      text={"Don't have an account?"}
      subText={"Register"}
      textLink={"/auth/register"}
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {loginInputs.map(({ name, placeholder, type, label }) => (
          <CustomInput
            label={label}
            name={name}
            placeholder={placeholder}
            type={type}
            key={name}
            register={register}
            error={errors[name]?.message}
          />
        ))}
         <p className="text-sm  text-right">
        <Link to="/auth/forgot-password" className="text-blue-500 text-base hover:underline">
          Forgot Password?
        </Link>
      </p>
        <CustomButton isLoading={loading}>Login</CustomButton>
      </form>
    </AuthLayout>
  );
};

export default Login;
