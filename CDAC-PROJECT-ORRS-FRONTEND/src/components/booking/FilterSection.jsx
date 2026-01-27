/**
 * FilterSection Component
 * Responsibility: Render a single filter section with items
 */
export default function FilterSection({ 
  title, 
  items, 
  selectedItems, 
  onItemClick, 
  multiSelect = false,
  gridLayout = false 
}) {
  const isSelected = (item) => {
    return multiSelect 
      ? selectedItems.includes(item)
      : selectedItems.length > 0 && selectedItems[0] === item;
  };

  const handleItemClick = (item) => {
    if (multiSelect) {
      onItemClick(item);
    } else {
      // For single select, toggle the item
      onItemClick(isSelected(item) ? '' : item);
    }
  };

  const containerClass = gridLayout 
    ? "grid grid-cols-2 gap-2" 
    : "space-y-2";

  const buttonClass = (item) => {
    const baseClass = `transition-all duration-200 border-2 ${
      isSelected(item)
        ? 'bg-violet-600 text-white border-violet-600'
        : 'bg-violet-50 text-gray-700 border-violet-400 hover:bg-violet-100 hover:border-violet-500'
    }`;
    
    return gridLayout 
      ? `${baseClass} p-2 rounded-xl text-center`
      : `${baseClass} w-full p-3 rounded-xl text-left`;
  };

  return (
    <div>
      <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span>{title}</span>
      </h4>
      <div className={containerClass}>
        {items.map((item) => (
          <button
            key={item}
            onClick={() => handleItemClick(item)}
            className={buttonClass(item)}
          >
            {gridLayout ? (
              <div className="text-xs font-bold">{item}</div>
            ) : (
              <span className="text-sm font-medium">{item}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}