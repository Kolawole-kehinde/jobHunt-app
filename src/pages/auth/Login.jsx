import { useNavigate } from "react-router";
import CustomButton from '../../Components/CustomBotton'
import AuthLayout from '../../Components/layout/AuthLayout'
import useFormValidate from "../../hooks/useFormValidate";
import { loginInputs } from "../../constant/auth";
import { loginSchema } from "../../Schema/authSchema";
import { useState } from "react";
import { SignInApi } from "../../services/auth";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import CustomInput from "../../Components/CustomInput";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const {setUser} = useAuth();
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
       const res = await SignInApi(data);
       setUser(res);
       toast.success("User Login Successfully");
       return navigate("/dashboard");
     } catch (error) {
       toast.error(error?.message)
       }
       finally{
        setLoading(false)
       }
  };
  return (
    <AuthLayout
      title={"Login"}
      text={" Don't have an account?"}
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
        <CustomButton>Login</CustomButton>
      </form>
    </AuthLayout>
  );
};

export default Login;
