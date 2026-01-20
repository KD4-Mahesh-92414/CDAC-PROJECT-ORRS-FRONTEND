import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import {
  ArrowsRightLeftIcon,
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { BookingContext } from "../../contexts/BookingContext";
import { useAuth } from "../../contexts/AuthContext";
import Modal from "../common/Modal";
import { Login } from "../../pages/auth/Login";
import toast from "react-hot-toast";

export default function SearchTrain() {
  const navigate = useNavigate();
  const { setSearchData } = useContext(BookingContext);
  const { isLoggedIn } = useAuth();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isSwapping, setIsSwapping] = useState(false);
  const [errors, setErrors] = useState({});
  const [showLogin, setShowLogin] = useState(false);
  const calendarRef = useRef(null);

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const formatDateDisplay = (dateString) => {
    if (!dateString) return "dd/mm/yyyy";
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
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const dayStr = String(selectedDate.getDate()).padStart(2, "0");
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
    const newErrors = {};

    if (!from.trim()) {
      newErrors.from = "Please enter departure station";
    }
    if (!to.trim()) {
      newErrors.to = "Please enter destination station";
    }
    if (from.trim() && to.trim() && from.toLowerCase() === to.toLowerCase()) {
      newErrors.same = "From and To stations cannot be the same";
    }
    if (!date) {
      newErrors.date = "Please select a date";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (!isLoggedIn) {
        toast.error("Please login to search trains");
        setShowLogin(true);
        return;
      }

      toast.success("Searching trains...");
      setSearchData({
        from: from.trim(),
        to: to.trim(),
        date: date,
      });
      navigate("/trains");
    } else {
      toast.error("Please fill all required fields correctly");
    }
  };

  const handleLoginSuccess = () => {
    setShowLogin(false);
    // After login, proceed with search
    setSearchData({
      from: from.trim(),
      to: to.trim(),
      date: date,
    });
    navigate("/trains");
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="relative w-full max-w-[900px] rounded-3xl bg-white/95 backdrop-blur-lg shadow-2xl shadow-violet-900/30 p-9 border border-white/20">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative flex w-full md:w-[520px] h-[80px] border-2 border-violet-600 bg-gradient-to-r from-white via-violet-50/30 to-white rounded-2xl overflow-hidden hover:shadow-lg hover:border-violet-700 transition-all duration-300 hover:scale-[1.02]">
              <div className="w-1/2 flex items-center justify-center">
                <input
                  type="text"
                  placeholder="From"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className={`w-full h-full text-center outline-none text-lg bg-transparent placeholder:text-gray-600 font-medium transition-opacity duration-150 ${
                    isSwapping ? "opacity-40" : "opacity-100"
                  }`}
                />
              </div>
              <div className="w-[2px] bg-gradient-to-b from-violet-500 via-violet-700 to-violet-500" />
              <div className="w-1/2 flex items-center justify-center">
                <input
                  type="text"
                  placeholder="To"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className={`w-full h-full text-center outline-none text-lg bg-transparent placeholder:text-gray-600 font-medium transition-opacity duration-150 ${
                    isSwapping ? "opacity-40" : "opacity-100"
                  }`}
                />
              </div>
              <button
                onClick={handleSwap}
                disabled={isSwapping}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-white to-violet-50 border-2 border-violet-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 hover:border-violet-700 disabled:opacity-50 group cursor-pointer"
              >
                <ArrowsRightLeftIcon className="w-6 h-6 text-violet-600 group-hover:text-violet-700 transition-colors duration-200" />
              </button>
            </div>

            <div className="w-full md:w-[140px] h-[80px] flex items-center justify-center">
              <div
                className="w-[140px] h-[46px] bg-gradient-to-r from-white to-violet-50 rounded-xl border-2 border-violet-600 flex items-center justify-center gap-2 shadow-lg transition-all duration-300 hover:border-violet-700 relative cursor-pointer px-2"
                onClick={() => setShowCalendar(!showCalendar)}
                ref={calendarRef}
              >
                <CalendarDaysIcon className="w-4 h-4 text-violet-500 flex-shrink-0" />
                <span className="text-black text-sm font-medium">
                  {date ? formatDateDisplay(date) : "dd/mm/yyyy"}
                </span>

                {showCalendar && (
                  <div className="absolute bottom-full left-0 mb-2 bg-white rounded-2xl shadow-2xl shadow-violet-300/50 border-2 border-violet-200 p-4 z-[100] w-72">
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
                          if (currentMonth === 11) {
                            setCurrentMonth(0);
                            setCurrentYear(currentYear + 1);
                          } else {
                            setCurrentMonth(currentMonth + 1);
                          }
                        }}
                        className="p-1 rounded-lg hover:bg-violet-100 text-violet-600"
                      >
                        <ChevronRightIcon className="w-5 h-5" />
                      </button>
                    </div>

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
          </div>

          <button
            onClick={handleSearch}
            className="absolute right-9 -bottom-5 w-[120px] h-[46px] rounded-xl text-white font-semibold bg-gradient-to-r from-violet-600 to-violet-700 shadow-xl shadow-violet-400/40 hover:from-violet-700 hover:to-violet-800 hover:border-violet-700 hover:shadow-2xl hover:shadow-violet-500/50 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span className="flex items-center justify-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Search
            </span>
          </button>
        </div>
      </div>

      {/* Error Messages - Below the search component */}
      {Object.keys(errors).length > 0 && (
        <div className="mt-4 max-w-[900px] mx-auto bg-red-50 border border-red-300 rounded-lg p-3">
          {errors.from && <p className="text-red-600 text-sm">{errors.from}</p>}
          {errors.to && <p className="text-red-600 text-sm">{errors.to}</p>}
          {errors.same && <p className="text-red-600 text-sm">{errors.same}</p>}
          {errors.date && <p className="text-red-600 text-sm">{errors.date}</p>}
        </div>
      )}

      {/* Login Modal */}
      <Modal open={showLogin} onClose={() => setShowLogin(false)}>
        <Login onLoginSuccess={handleLoginSuccess} />
      </Modal>
    </>
  );
}
