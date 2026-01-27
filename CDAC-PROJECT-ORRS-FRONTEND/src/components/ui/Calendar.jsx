import { useState, useRef, useEffect } from "react";
import {
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

/**
 * Calendar Component
 * Responsibility: Handle date selection with calendar UI and logic
 */
export default function Calendar({ selectedDate, onDateChange, placeholder = "dd/mm/yyyy" }) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const calendarRef = useRef(null);

  const formatDateDisplay = (dateString) => {
    if (!dateString) return placeholder;
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
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const dayStr = String(selectedDate.getDate()).padStart(2, "0");
    const dateString = `${year}-${month}-${dayStr}`;
    
    onDateChange(dateString);
    setShowCalendar(false);
  };

  const navigateMonth = (direction) => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
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

  return (
    <div className="w-full md:w-[140px] h-[80px] flex items-center justify-center">
      <div
        className="w-[140px] h-[46px] bg-gradient-to-r from-white to-violet-50 rounded-xl border-2 border-violet-600 flex items-center justify-center gap-2 shadow-lg transition-all duration-300 hover:border-violet-700 relative cursor-pointer px-2"
        onClick={() => setShowCalendar(!showCalendar)}
        ref={calendarRef}
      >
        <CalendarDaysIcon className="w-4 h-4 text-violet-500 flex-shrink-0" />
        <span className="text-black text-sm font-medium">
          {formatDateDisplay(selectedDate)}
        </span>

        {showCalendar && (
          <div className="absolute bottom-full left-0 mb-2 bg-white rounded-2xl shadow-2xl shadow-violet-300/50 border-2 border-violet-200 p-4 z-[100] w-72">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateMonth('prev');
                }}
                className="p-1 rounded-lg hover:bg-violet-100 text-violet-600"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <h3 className="text-violet-700 font-semibold">
                {new Date(currentYear, currentMonth).toLocaleDateString(
                  "en-US",
                  { month: "long", year: "numeric" }
                )}
              </h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateMonth('next');
                }}
                className="p-1 rounded-lg hover:bg-violet-100 text-violet-600"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Days of Week */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-medium text-violet-500 py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for days before month starts */}
              {Array.from({
                length: getFirstDayOfMonth(currentMonth, currentYear),
              }).map((_, index) => (
                <div key={`empty-${index}`} className="h-8"></div>
              ))}

              {/* Days of the month */}
              {Array.from({
                length: getDaysInMonth(currentMonth, currentYear),
              }).map((_, index) => {
                const day = index + 1;
                const isDisabled = isDateDisabled(day, currentMonth, currentYear);
                const isSelected =
                  selectedDate &&
                  new Date(selectedDate).getDate() === day &&
                  new Date(selectedDate).getMonth() === currentMonth &&
                  new Date(selectedDate).getFullYear() === currentYear;

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
                        ? "bg-violet-600 text-white shadow-lg"
                        : isDisabled
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-black hover:bg-violet-100 hover:scale-110"
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
    </div>
  );
}