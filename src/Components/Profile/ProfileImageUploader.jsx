const ProfileImageUploader = ({ imageSrc, onChange }) => {
  return (
    <div className="relative">
      <img
        src={imageSrc}
        alt="Profile"
        className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
      />
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={onChange}
        className="hidden"
      />
      <label
        htmlFor="fileInput"
        className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 cursor-pointer shadow-md"
        title="Change Picture"
      >
        📷
      </label>
    </div>
  );
};

export default ProfileImageUploader;
