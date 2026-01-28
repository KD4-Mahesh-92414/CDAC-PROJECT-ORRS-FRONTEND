export default function AdminSelect({
  label,
  name,
  value,
  onChange,
  options,
  error,
  required = false,
  placeholder = "Select an option",
  ...props
}) {
  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-gray-900 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value || ''}
        onChange={onChange}
        className={`w-full px-4 py-3 border-2 rounded-xl focus:border-violet-600 focus:outline-none transition-colors ${
          error ? 'border-red-400' : 'border-violet-200'
        }`}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}
