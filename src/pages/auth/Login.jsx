import CustomButton from "../../Components/CustomButton";
import AuthLayout from "../../Components/layout/AuthLayout";
import { loginLists } from "../../constant/auth";
import CustomInput from "../../CustomInput";

const Login = () => {
 
  return (
    <AuthLayout
      title={"Login"}
      text={" Don't have an account?"}
      subText={"Register"}
      textLink={"/auth/register"}
    >
      <form>
        {loginLists.map(({ name, type, placeholder }) => (
         <CustomInput
         key={name}
          name={name}
          type={type}
          placeholder={placeholder}
         />
        ))}
       
       <CustomButton>
        Login

       </CustomButton>
      </form>
    </AuthLayout>
  );
};

export default Login;
