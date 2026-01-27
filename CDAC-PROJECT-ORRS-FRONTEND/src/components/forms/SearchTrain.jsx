import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import { searchStart, searchSuccess, searchFailure } from "../../store/slices/trainSlice";
import { setSearchData } from "../../store/slices/bookingSlice";
import Calendar from "../ui/Calendar";
import Modal from "../common/Modal";
import { Login } from "../../pages/auth/Login";
import toast from "react-hot-toast";

/**
 * SearchTrain Component
 * Responsibility: Handle train search form UI, validation, and navigation
 */
export default function SearchTrain() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.trains);
  
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [isSwapping, setIsSwapping] = useState(false);
  const [errors, setErrors] = useState({});
  const [showLogin, setShowLogin] = useState(false);

  const handleSwap = () => {
    setIsSwapping(true);
    setTimeout(() => {
      const temp = from;
      setFrom(to);
      setTo(temp);
      setIsSwapping(false);
    }, 150);
  };

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const handleSearch = async () => {
    const newErrors = {};

    // Validation
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
      if (!isAuthenticated) {
        toast.error("Please login to search trains");
        setShowLogin(true);
        return;
      }

      try {
        dispatch(searchStart());
        
        const searchParams = {
          from: from.trim(),
          to: to.trim(),
          date: date,
        };

        // Update both slices for compatibility
        dispatch(setSearchData(searchParams));

        // TEMPORARY: Using mock data instead of backend call
        const mockTrainResults = [
          {
            id: 1,
            trainNumber: "12025",
            trainName: "Rajdhani Express",
            number: "12025",
            name: "Rajdhani Express",
            from: searchParams.from,
            to: searchParams.to,
            departure: "06:00",
            arrival: "14:30",
            departureTime: "06:00",
            arrivalTime: "14:30",
            duration: "8h 30m",
            departureDate: searchParams.date,
            arrivalDate: searchParams.date,
            departureStation: searchParams.from,
            arrivalStation: searchParams.to,
            daysOfRun: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            classes: [
              { name: "AC First Class", price: 3500, available: 12 },
              { name: "AC 2-Tier", price: 2200, available: 45 },
              { name: "AC 3-Tier", price: 1650, available: 78 },
            ],
            coaches: [
              { type: "AC First Class", fare: 3500, available: 12 },
              { type: "AC 2nd Tier", fare: 2200, available: 45 },
              { type: "AC 3rd Tier", fare: 1650, available: 78 },
            ]
          },
          {
            id: 2,
            trainNumber: "12345",
            trainName: "Shatabdi Express",
            number: "12345",
            name: "Shatabdi Express",
            from: searchParams.from,
            to: searchParams.to,
            departure: "07:15",
            arrival: "15:45",
            departureTime: "07:15",
            arrivalTime: "15:45",
            duration: "8h 30m",
            departureDate: searchParams.date,
            arrivalDate: searchParams.date,
            departureStation: searchParams.from,
            arrivalStation: searchParams.to,
            daysOfRun: ["Mon", "Wed", "Fri", "Sun"],
            classes: [
              { name: "Chair Car", price: 850, available: 32 },
              { name: "Executive Chair", price: 1200, available: 18 },
            ],
            coaches: [
              { type: "AC Chair Car", fare: 850, available: 32 },
              { type: "Executive Chair", fare: 1200, available: 18 },
            ]
          },
          {
            id: 3,
            trainNumber: "12987",
            trainName: "Deccan Express",
            number: "12987",
            name: "Deccan Express",
            from: searchParams.from,
            to: searchParams.to,
            departure: "22:30",
            arrival: "06:15",
            departureTime: "22:30",
            arrivalTime: "06:15",
            duration: "7h 45m",
            departureDate: searchParams.date,
            arrivalDate: searchParams.date,
            departureStation: searchParams.from,
            arrivalStation: searchParams.to,
            daysOfRun: ["Tue", "Thu", "Sat"],
            classes: [
              { name: "Sleeper", price: 450, available: 95 },
              { name: "AC 3-Tier", price: 1200, available: 56 },
              { name: "AC 2-Tier", price: 1800, available: 23 },
            ],
            coaches: [
              { type: "Sleeper Class", fare: 450, available: 95 },
              { type: "AC 3rd Tier", fare: 1200, available: 56 },
              { type: "AC 2nd Tier", fare: 1800, available: 23 },
            ]
          }
        ];

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        dispatch(searchSuccess({
          results: mockTrainResults,
          params: searchParams
        }));

        toast.success("Trains found successfully!");
        navigate("/trains");
      } catch (error) {
        const errorMessage = error.message || "Failed to search trains";
        dispatch(searchFailure(errorMessage));
        toast.error(errorMessage);
      }
    } else {
      toast.error("Please fill all required fields correctly");
    }
  };

  const handleLoginSuccess = () => {
    setShowLogin(false);
    // After login, proceed with search
    handleSearch();
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

            {/* Calendar Component */}
            <Calendar 
              selectedDate={date}
              onDateChange={handleDateChange}
              placeholder="dd/mm/yyyy"
            />
          </div>

          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="absolute right-9 -bottom-5 w-[120px] h-[46px] rounded-xl text-white font-semibold bg-gradient-to-r from-violet-600 to-violet-700 shadow-xl shadow-violet-400/40 hover:from-violet-700 hover:to-violet-800 hover:border-violet-700 hover:shadow-2xl hover:shadow-violet-500/50 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
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
              {isLoading ? "Searching..." : "Search"}
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
