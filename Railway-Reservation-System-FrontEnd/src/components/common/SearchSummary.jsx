export default function SearchSummary({ searchData }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-gradient-to-r from-violet-50 to-blue-50 rounded-xl p-6 mb-6 border border-violet-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">From</p>
            <p className="font-bold text-lg text-gray-900">{searchData.from}</p>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-0.5 bg-gradient-to-r from-violet-400 to-blue-400"></div>
            <div className="mx-2 p-2 bg-white rounded-full shadow-sm">
              <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-violet-400"></div>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">To</p>
            <p className="font-bold text-lg text-gray-900">{searchData.to}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Date</p>
            <p className="font-bold text-lg text-gray-900">{formatDate(searchData.date)}</p>
          </div>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-violet-600 to-violet-700 text-white rounded-lg text-sm font-semibold hover:from-violet-700 hover:to-violet-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
          Modify Search
        </button>
      </div>
    </div>
  );
}