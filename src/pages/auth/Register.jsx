import AuthLayout from "../../Components/layout/AuthLayout";
import { registerInput } from "../../constant/auth";
import CustomInput from "../../CustomInput";


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
        
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none"
        >
          Register
        </button>
      </form>
    </AuthLayout>
  );
};

export default Register;
