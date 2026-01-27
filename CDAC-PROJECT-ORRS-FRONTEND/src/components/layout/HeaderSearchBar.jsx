import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowsRightLeftIcon,
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function HeaderSearchBar({ searchData, setSearchData }) {
  const navigate = useNavigate();
  const [from, setFrom] = useState(searchData?.from || "");
  const [to, setTo] = useState(searchData?.to || "");
  const [date, setDate] = useState(searchData?.date || "");
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isSwapping, setIsSwapping] = useState(false);
  const calendarRef = useRef(null);

  const formatDateDisplay = (dateString) => {
    if (!dateString) return "Select Date";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const isDateDisabled = (day, month, year) => {
    const date = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleDateSelect = (day) => {
    const selectedDate = new Date(currentYear, currentMonth, day);
    // Ensure we get the correct date in local timezone
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const dayStr = String(selectedDate.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${dayStr}`;
    setDate(dateString);
    setShowCalendar(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSwap = () => {
    setIsSwapping(true);
    setTimeout(() => {
      const temp = from;
      setFrom(to);
      setTo(temp);
      setIsSwapping(false);
    }, 150);
  };

  const handleSearch = () => {
    if (from.trim() && to.trim() && date) {
      setSearchData({
        from: from.trim(),
        to: to.trim(),
        date: date,
      });
      navigate("/trains");
    }
  };

  return (
    <div className="flex items-center justify-center px-6 py-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-4 flex items-center gap-4 max-w-4xl w-full">
        {/* From/To Section */}
        <div className="relative flex items-center bg-gray-50 rounded-xl border-2 border-violet-600 overflow-hidden flex-1 max-w-md">
          <div className="flex-1 flex items-center">
            <input
              type="text"
              placeholder="From"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className={`w-full px-4 py-3 text-center outline-none bg-transparent text-gray-800 placeholder:text-gray-500 font-medium transition-opacity duration-150 ${
                isSwapping ? "opacity-40" : "opacity-100"
              }`}
            />
          </div>
          
          <div className="w-px bg-gray-300 h-8" />
          
          <div className="flex-1 flex items-center">
            <input
              type="text"
              placeholder="To"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className={`w-full px-4 py-3 text-center outline-none bg-transparent text-gray-800 placeholder:text-gray-500 font-medium transition-opacity duration-150 ${
                isSwapping ? "opacity-40" : "opacity-100"
              }`}
            />
          </div>
          
          <button
            onClick={handleSwap}
            disabled={isSwapping}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white border-2 border-violet-500 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 hover:scale-110 active:scale-95 hover:border-violet-600 disabled:opacity-50 group"
          >
            <ArrowsRightLeftIcon className="w-4 h-4 text-violet-600 group-hover:text-violet-700 transition-colors" />
          </button>
        </div>

        {/* Date Section */}
        <div className="relative" ref={calendarRef}>
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-50 rounded-xl border-2 border-violet-600 hover:border-violet-700 transition-all duration-200 w-[180px]"
          >
            <CalendarDaysIcon className="w-4 h-4 text-violet-500" />
            <span className="text-gray-700 font-medium text-sm whitespace-nowrap">
              {formatDateDisplay(date)}
            </span>
          </button>

          {showCalendar && (
            <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-50 w-72">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (currentMonth === 0) {
                      setCurrentMonth(11);
                      setCurrentYear(currentYear - 1);
                    } else {
                      setCurrentMonth(currentMonth - 1);
                    }
                  }}
                  className="p-1 rounded-lg hover:bg-gray-100 text-gray-600"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>
                <h3 className="text-gray-700 font-semibold">
                  {new Date(currentYear, currentMonth).toLocaleDateString(
                    "en-US",
                    { month: "long", year: "numeric" }
                  )}
                </h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (currentMonth === 11) {
                      setCurrentMonth(0);
                      setCurrentYear(currentYear + 1);
                    } else {
                      setCurrentMonth(currentMonth + 1);
                    }
                  }}
                  className="p-1 rounded-lg hover:bg-gray-100 text-gray-600"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-medium text-gray-500 py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {Array.from({
                  length: getFirstDayOfMonth(currentMonth, currentYear),
                }).map((_, index) => (
                  <div key={`empty-${index}`} className="h-8"></div>
                ))}

                {Array.from({
                  length: getDaysInMonth(currentMonth, currentYear),
                }).map((_, index) => {
                  const day = index + 1;
                  const isDisabled = isDateDisabled(
                    day,
                    currentMonth,
                    currentYear
                  );
                  const isSelected =
                    date &&
                    new Date(date).getDate() === day &&
                    new Date(date).getMonth() === currentMonth &&
                    new Date(date).getFullYear() === currentYear;

                  return (
                    <button
                      key={day}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isDisabled) handleDateSelect(day);
                      }}
                      disabled={isDisabled}
                      className={`h-8 w-8 rounded-lg text-sm font-medium transition-all ${
                        isSelected
                          ? "bg-violet-600 text-white shadow-md"
                          : isDisabled
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-gray-700 hover:bg-violet-100 hover:text-violet-700"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 text-white rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <MagnifyingGlassIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Search</span>
        </button>
      </div>
    </div>
  );
}