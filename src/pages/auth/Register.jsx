import AuthLayout from "../../Components/layout/AuthLayout";
import { registerInput } from "../../constant/auth";
import CustomInput from "../../CustomInput";
import CustomButton from "../../Components/CustomBotton";


const Register = () => {

  return (
    <AuthLayout
      title={"Register"}
      text={" Already have an account?"}
      subText={"Login"}
      textLink={"/auth/login"}
    >
      <form className="space-y-4">
        {
          registerInput?.map(({name, type, placeholder}) =>(
           <CustomInput
           key={name}
           name={name}
           type={type}
           placeholder={placeholder}
           />
          ))
        }
       <CustomButton>Register</CustomButton>
      </form>
    </AuthLayout>
  );
};

export default Register;
