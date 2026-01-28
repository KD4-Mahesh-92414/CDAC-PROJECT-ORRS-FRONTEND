import { XMarkIcon } from '@heroicons/react/24/outline';

export default function FormModal({ 
  open, 
  onClose, 
  title, 
  children
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-violet-100">
          <h3 className="text-xl font-bold text-violet-700">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-violet-50 transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}