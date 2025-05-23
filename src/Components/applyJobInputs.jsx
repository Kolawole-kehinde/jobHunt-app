export const InputField = ({ id, name, label, value, onChange }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium mb-1">
      {label}
    </label>
    <input
      id={id}
      name={name}
      required
      value={value}
      onChange={onChange}
      className="w-full px-4 py-4 border-2 rounded-xl"
    />
  </div>
);