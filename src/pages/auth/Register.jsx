import CustomButton from '../../Components/CustomBotton'
import CustomInput from "../../components/CustomInput";
import AuthLayout from '../../Components/layout/AuthLayout'
import useFormValidate from '../../hooks/useFormValidate'
import { useNavigate } from "react-router";
import { registerInputs } from '../../constant/auth';
import { useState } from 'react';
import { registerSchema } from '../../Schema/authSchema';
import { axiosInstance } from '../../services/axiosInstance';



const Register = () => {
  const [loading, setLoading] = useState(false);
  const initialState = {
    name: "",
    email: "",
    city: "",
    password: "",
    passwordConfirmation: "",
    state: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useFormValidate(initialState, registerSchema);

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const payload = {
      ...data,
      username: data.name,
      email: data.email,
    password: data.password,
  }
    setLoading(true);
    try {
      const res  = await axiosInstance.post("/auth/register", payload);
      console.log(res.data)
      console.log(data)
      
    } catch (error) {
       console.log(error);
    }
    finally {
        setLoading(false)
    }
    // if (data) return navigate("/dashboard");
  
    reset()
  };
  return (
    <AuthLayout
      title={"Register"}
      text={" Already have an account?"}
      subText={"Login"}
      textLink={"/auth/login"}
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {registerInputs.map(({ name, placeholder, type }) => (
          <CustomInput
            name={name}
            placeholder={placeholder}
            type={type}
            key={name}
            register={register}
            error={errors[name]?.message}
          />
        ))}
        <CustomButton>{loading ? "Loadind" : "Register"}</CustomButton>
      </form>
    </AuthLayout>
  );
};

export default Register;
