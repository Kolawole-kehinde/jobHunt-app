import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const CustomInput = ({
  type,
  name,
  placeholder,
  className,
  label,
  register = () => {},
  error,
}) => {
  const [show, setShow] = useState(false);

  const togglePassword = () => {
    return setShow((currentState) => !currentState);
  };

  // Check if the input type should be "textarea"
  const isTextArea = type === "textarea";

  return (
    <div className="space-y-2">
      {label && <label htmlFor={name}>{label}</label>}
      <div className="relative">
        {isTextArea ? (
          <textarea
            name={name}
            placeholder={placeholder}
            className={`w-full px-4 py-2 border rounded focus:outline-none ${className}`}
            {...register(name, { required: true })}
          />
        ) : (
          <input
            type={show && type === "password" ? "text" : type}
            name={name}
            placeholder={placeholder}
            className={`w-full px-4 py-2 border rounded focus:outline-none ${className}`}
            {...register(name, { required: true })}
          />
        )}
        {type === "password" && (
          <div
            className="absolute top-1/2 right-2 -translate-y-1/2"
            onClick={togglePassword}
          >
            {show ? <FaRegEye /> : <FaRegEyeSlash />}
          </div>
        )}
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
};

export default CustomInput;
