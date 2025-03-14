import { useNavigate } from "react-router";
import CustomButton from '../../Components/CustomBotton'
import CustomInput from "../../components/CustomInput";
import AuthLayout from '../../Components/layout/AuthLayout'
import useFormValidate from "../../hooks/useFormValidate";
import { loginSchema } from "../../utils/Schema/Schema";
import { loginInputs } from "../../constant/auth";

const Login = () => {
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
  const onSubmit = (data) => {
    if (data) return navigate("/dashboard");
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
