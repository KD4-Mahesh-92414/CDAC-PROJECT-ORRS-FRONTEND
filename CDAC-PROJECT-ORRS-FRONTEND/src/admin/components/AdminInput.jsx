export default function AdminInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  multiline = false,
  rows = 3,
  ...props
}) {
  const InputComponent = multiline ? 'textarea' : 'input';
  
  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-gray-900 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <InputComponent
        id={name}
        name={name}
        type={multiline ? undefined : type}
        rows={multiline ? rows : undefined}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 border-2 rounded-xl focus:border-violet-600 focus:outline-none transition-colors resize-none ${
          error ? 'border-red-400' : 'border-violet-200'
        }`}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}
