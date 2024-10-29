interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  placeholder: string;
  isValid: (value: string) => boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ id, label, type, value, placeholder, isValid, onChange }) => {

  return (
    <div className="">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 text-left dark:text-white dark:bg-gray-800">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        placeholder={placeholder}
        className={`block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 dark:text-gray-800
          ${isValid(value) ? "" : "border-red-600 focus:ring-red-600"}`}
        minLength={2}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default InputField;
