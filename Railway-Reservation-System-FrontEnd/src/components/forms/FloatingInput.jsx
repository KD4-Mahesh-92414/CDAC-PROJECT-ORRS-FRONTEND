import { useField } from "formik";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

export const FloatingInput = ({
  label = "Enter value",
  icon: Icon,
  colorScheme = "blue",
  size = "md",
  errorMessageClass = "text-sm text-red-500 mt-1 ml-1",
  ...props
}) => {
  const [field, meta] = useField(props);
  const { touched, error } = meta;
  const { value } = field;

  const sizeClasses = {
    sm: "text-sm py-2",
    md: "text-base py-3",
    lg: "text-lg py-4",
  };

  // const getColorClasses = (colorScheme) => ({
  //   border: `border-${colorScheme}-500 focus:border-${colorScheme}-600`,
  //   label: `text-${colorScheme}-600`,
  // });

  // const currentColors = getColorClasses(colorScheme);

  const colorClasses = {
    blue: {
      border: "border-blue-500 focus:border-blue-600",
      label: "text-blue-600",
    },
    violet: {
      border: "border-violet-500 focus:border-violet-600",
      label: "text-violet-600",
    },
    red: {
      border: "border-red-500 focus:border-red-600",
      label: "text-red-600",
    },
    green: {
      border: "border-green-500 focus:border-green-600",
      label: "text-green-600",
    },
  };

  const currentColors = colorClasses[colorScheme] || colorClasses.blue;

  return (
    <div className="relative w-full mb-6">
      {Icon && (
        <Icon className="absolute left-2 top-3 h-5 w-5 text-gray-700 pointer-events-none" />
      )}

      <input
        {...field}
        {...props}
        id={props.id || props.name}
        placeholder=" "
        className={`w-full outline-none border-b-2
          ${Icon ? "pl-9" : "pl-2"} pr-10
          ${sizeClasses[size]}
          ${
            touched && error
              ? "border-red-500 focus:border-red-600"
              : currentColors.border
          }`}
      />

      <label
        htmlFor={props.id || props.name}
        className={`absolute transition-all duration-300  ${
          Icon ? "left-9" : "left-2"
        } text-gray-700
          ${
            value
              ? "-top-2 text-xs " + currentColors.label
              : "top-3 text-xm text-gray-700"
          }`}
      >
        {label}
      </label>

      {touched && !error && (
        <CheckCircleIcon className="absolute right-2 top-3 h-5 w-5 text-green-500" />
      )}
      {touched && error && (
        <XCircleIcon className="absolute right-2 top-3 h-5 w-5 text-red-500" />
      )}

      {touched && error && <div className={errorMessageClass}>{error}</div>}
    </div>
  );
};
