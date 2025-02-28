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
       
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none"
        >
          Login
        </button>
      </form>
    </AuthLayout>
  );
};

export default Login;
