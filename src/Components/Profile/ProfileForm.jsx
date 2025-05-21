const ProfileForm = ({ register, errors, onSubmit, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4 md:col-span-2">
        <h3 className="text-xl font-semibold text-gray-800">Update Profile</h3>
      </div>

      <div className="flex flex-col">
        <label htmlFor="name" className="mb-1 text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          placeholder="Enter full name"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          placeholder="Enter email"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="phoneNumber" className="mb-1 text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          id="phoneNumber"
          type="text"
          {...register("phoneNumber")}
          placeholder="Enter phone number"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
        )}
      </div>

      <div className="md:col-span-2 flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
