import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function DataTable({ 
  columns, 
  data, 
  onEdit, 
  onDelete, 
  showActions = true,
  hideEdit = false,
  customActions = null,
  loading = false
}) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-8">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
          <span className="ml-2 text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8">
        <div className="text-center text-gray-500">
          No data available
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-violet-600 to-violet-700">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
              {showActions && (
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
                {showActions && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {!hideEdit && onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          className="text-violet-600 hover:text-violet-900"
                          title="Edit"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                      )}
                      {customActions && customActions(row)
                        .filter(action => action.show !== false)
                        .map((action, actionIndex) => (
                        <button
                          key={actionIndex}
                          onClick={action.onClick}
                          className={action.className || "text-blue-600 hover:text-blue-900"}
                          title={action.label}
                        >
                          {action.icon || (
                            <span className="text-xs px-2 py-1 rounded">
                              {action.label}
                            </span>
                          )}
                        </button>
                      ))}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}