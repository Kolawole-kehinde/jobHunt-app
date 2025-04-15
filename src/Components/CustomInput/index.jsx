import React from "react";

const CustomInput = ({
  name,
  type = "text",
  placeholder,
  label,
  register,
  error,
  options = [], // For select inputs
}) => {
  const sharedStyles =
    "w-full px-4 py-2 border border-gray-300 rounded focus:outline-none placeholder-gray-500 text-gray-700";

  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* Handle textarea, select, and input types dynamically */}
      {type === "textarea" ? (
        <textarea
          id={name}
          {...register(name)}
          placeholder={placeholder}
          className={sharedStyles}
          rows={4}
        />
      ) : type === "select" ? (
        <select
          id={name}
          {...register(name)}
          className={`${sharedStyles} text-gray-500`}
          defaultValue=""
        >
          {/* Placeholder for select */}
          <option value="" disabled className="text-gray-500">
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value} className="text-gray-700">
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          type={type}
          {...register(name)}
          placeholder={placeholder}
          className={sharedStyles}
        />
      )}

      {/* Display error message if there is one */}
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default CustomInput;
