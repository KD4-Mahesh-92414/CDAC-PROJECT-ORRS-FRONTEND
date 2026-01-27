import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedSeats, setFareData } from "../../store/slices/bookingSlice";
import toast from "react-hot-toast";

// Journey Info Card Component
const JourneyInfoCard = ({ train }) => {
  return (
    <div className="bg-yellow-100 rounded-xl p-6 border border-yellow-200">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xl font-bold text-gray-900">{train?.departure}</p>
          <p className="text-sm text-gray-600">{train?.departureStation}</p>
          <p className="text-xs text-gray-500 mt-1">{train?.departureDate}</p>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">Duration</p>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-violet-600"></div>
            <div className="w-16 h-2 bg-violet-600 rounded-full"></div>
            <div className="bg-white px-4 py-2 rounded-full border-2 border-violet-600 shadow-sm">
              <p className="text-sm font-bold text-violet-700">{train?.duration}</p>
            </div>
            <div className="w-16 h-2 bg-violet-600 rounded-full"></div>
            <svg className="w-5 h-5 text-violet-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xl font-bold text-gray-900">{train?.arrival}</p>
          <p className="text-sm text-gray-600">{train?.arrivalStation}</p>
          <p className="text-xs text-gray-500 mt-1">{train?.arrivalDate}</p>
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold text-violet-600">{train?.number}</p>
          <p className="text-sm text-gray-700">{train?.name}</p>
          <p className="text-xs text-green-600 font-medium mt-1">
            Seats Available - {train?.coaches?.[0]?.available || 0}
          </p>
        </div>
      </div>
    </div>
  );
};

// Seat Toggle Component
const SeatToggle = ({ mode, setMode }) => {
  const isAuto = mode === "auto";

  return (
    <div className="flex items-center gap-4">
      <span className={!isAuto ? "font-semibold text-gray-900" : "text-gray-600"}>
        Manually
      </span>

      <div
        onClick={() => setMode(isAuto ? "manual" : "auto")}
        className="w-14 h-7 bg-violet-200 rounded-full cursor-pointer relative transition-colors hover:bg-violet-300"
      >
        <div
          className={`w-6 h-6 bg-violet-600 rounded-full absolute top-0.5 transition-all shadow-md
            ${isAuto ? "left-7" : "left-1"}`}
        />
      </div>

      <span className={isAuto ? "font-semibold text-gray-900" : "text-gray-600"}>
        Automatically
      </span>
    </div>
  );
};

// Coach Selector Component
const CoachSelector = ({ selectedCoach, setSelectedCoach, farePerSeat, seatCount = 0 }) => {
  const coaches = ["H1", "H2", "H3", "H4"];
  const totalFare = farePerSeat * seatCount;

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3">
        {coaches.map((coach) => (
          <button
            key={coach}
            onClick={() => setSelectedCoach(coach)}
            className={`px-6 py-3 rounded-lg font-semibold border-2 transition-all
              ${
                selectedCoach === coach
                  ? "bg-violet-600 text-white border-violet-600 shadow-lg"
                  : "bg-white text-gray-700 border-violet-400 hover:border-violet-500 hover:bg-violet-50"
              }`}
          >
            Coach {coach}
          </button>
        ))}
      </div>

      <div className="bg-gradient-to-r from-orange-100 to-orange-200 px-6 py-3 rounded-lg border border-orange-300">
        <p className="text-sm text-gray-600">Total Fare</p>
        <p className="text-xl font-bold text-orange-600">₹{totalFare}</p>
      </div>
    </div>
  );
};

// Seat Component
const Seat = ({ number, topLabel, isSelected, onSelect, isBooked = false }) => {
  return (
    <div
      onClick={() => !isBooked && onSelect(number)}
      className={`relative w-8 h-8 flex items-center justify-center rounded border-2
        text-xs select-none transition-all
        ${
          isBooked
            ? "bg-gray-300 text-gray-500 cursor-not-allowed border-gray-400"
            : isSelected
            ? "bg-violet-600 text-white border-violet-600 cursor-pointer shadow-md"
            : "bg-white text-gray-700 border-violet-200 hover:bg-violet-50 hover:border-violet-400 cursor-pointer"
        }`}
    >
      {topLabel && (
        <span className="absolute -top-4 text-xs font-bold text-gray-600">
          {topLabel}
        </span>
      )}
      <span className="font-semibold">{number}</span>
    </div>
  );
};

// Side Label Component
const SideLabel = ({ text }) => (
  <div className="w-6 text-xs font-bold flex items-center justify-center text-gray-600">
    {text}
  </div>
);

// Seat Grid Component
const SeatGrid = ({ selectedSeats, onSeatSelect }) => {
  const TOTAL_SEATS = 72;
  const BLOCK_SIZE = 8;
  const blocks = TOTAL_SEATS / BLOCK_SIZE;

  // Mock some booked seats
  const bookedSeats = [5, 12, 23, 34, 45, 56];

  return (
    <div className="bg-white border-2 border-violet-400 rounded-xl p-6">
      <div className="flex justify-center gap-6 overflow-x-auto">
        {Array.from({ length: blocks }).map((_, blockIndex) => {
          const base = blockIndex * BLOCK_SIZE;
          const isFirst = blockIndex === 0;
          const isLast = blockIndex === blocks - 1;

          return (
            <div
              key={blockIndex}
              className="grid grid-cols-[auto_auto_auto_auto] gap-x-3 gap-y-2 flex-shrink-0"
            >
              {/* Row 1 - Lower */}
              <SideLabel text={isFirst ? "L" : ""} />
              <Seat
                number={base + 1}
                isSelected={selectedSeats.includes(base + 1)}
                isBooked={bookedSeats.includes(base + 1)}
                onSelect={onSeatSelect}
              />
              <Seat
                number={base + 4}
                isSelected={selectedSeats.includes(base + 4)}
                isBooked={bookedSeats.includes(base + 4)}
                onSelect={onSeatSelect}
              />
              <SideLabel text={isLast ? "L" : ""} />

              {/* Row 2 - Middle */}
              <SideLabel text={isFirst ? "M" : ""} />
              <Seat
                number={base + 2}
                isSelected={selectedSeats.includes(base + 2)}
                isBooked={bookedSeats.includes(base + 2)}
                onSelect={onSeatSelect}
              />
              <Seat
                number={base + 5}
                isSelected={selectedSeats.includes(base + 5)}
                isBooked={bookedSeats.includes(base + 5)}
                onSelect={onSeatSelect}
              />
              <SideLabel text={isLast ? "M" : ""} />

              {/* Row 3 - Upper */}
              <SideLabel text={isFirst ? "U" : ""} />
              <Seat
                number={base + 3}
                isSelected={selectedSeats.includes(base + 3)}
                isBooked={bookedSeats.includes(base + 3)}
                onSelect={onSeatSelect}
              />
              <Seat
                number={base + 6}
                isSelected={selectedSeats.includes(base + 6)}
                isBooked={bookedSeats.includes(base + 6)}
                onSelect={onSeatSelect}
              />
              <SideLabel text={isLast ? "U" : ""} />

              {/* Gap */}
              <div className="h-3 col-span-4" />

              {/* Lower side berths */}
              <SideLabel text="" />
              <Seat
                number={base + 7}
                topLabel="L"
                isSelected={selectedSeats.includes(base + 7)}
                isBooked={bookedSeats.includes(base + 7)}
                onSelect={onSeatSelect}
              />
              <Seat
                number={base + 8}
                topLabel="U"
                isSelected={selectedSeats.includes(base + 8)}
                isBooked={bookedSeats.includes(base + 8)}
                onSelect={onSeatSelect}
              />
              <SideLabel text="" />
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-6 pt-4 border-t border-violet-400">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-white border-2 border-violet-400 rounded"></div>
          <span className="text-sm text-gray-600">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-violet-600 border-2 border-violet-600 rounded"></div>
          <span className="text-sm text-gray-600">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-300 border-2 border-gray-400 rounded"></div>
          <span className="text-sm text-gray-600">Booked</span>
        </div>
      </div>
    </div>
  );
};

// Counter Group Component
const CounterGroup = ({ title, value, setValue }) => {
  return (
    <div>
      <h3 className="font-semibold mb-3 text-gray-900">{title}</h3>
      <div className="flex gap-2 flex-wrap">
        {Array.from({ length: 7 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setValue(i)}
            className={`w-10 h-10 rounded-lg border-2 font-semibold transition-all
              ${
                value === i
                  ? "bg-violet-600 text-white border-violet-600 shadow-md"
                  : "bg-white text-gray-700 border-violet-400 hover:border-violet-500 hover:bg-violet-50"
              }`}
          >
            {i}
          </button>
        ))}
      </div>
    </div>
  );
};

// Automatic Seat Selection Component
const AutomaticSeatSelection = () => {
  const [adults, setAdults] = useState(2);
  const [childWithSeat, setChildWithSeat] = useState(1);
  const [childWithoutSeat, setChildWithoutSeat] = useState(0);
  const [berth, setBerth] = useState("Any");

  return (
    <div className="bg-white border-2 border-violet-400 rounded-xl p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT */}
        <div className="space-y-6">
          <CounterGroup
            title="Number Of Adults Travelling"
            value={adults}
            setValue={setAdults}
          />

          <CounterGroup
            title="Number Of Child With Seat"
            value={childWithSeat}
            setValue={setChildWithSeat}
          />

          <CounterGroup
            title="Number Of Child Without Seat"
            value={childWithoutSeat}
            setValue={setChildWithoutSeat}
          />
        </div>

        {/* RIGHT */}
        <div>
          <h3 className="font-semibold mb-4 text-gray-900">Select Berth Type</h3>
          <div className="space-y-3">
            {["Any", "Lower", "Middle", "Upper"].map((type) => (
              <button
                key={type}
                onClick={() => setBerth(type)}
                className={`w-full py-3 rounded-lg border-2 text-lg font-semibold transition-all
                  ${
                    berth === type
                      ? "bg-violet-600 text-white border-violet-600 shadow-md"
                      : "bg-white text-gray-700 border-violet-400 hover:border-violet-500 hover:bg-violet-50"
                  }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Fare Summary Component
const FareSummary = ({ seatCount, farePerSeat, onProceed }) => {
  const total = seatCount * farePerSeat;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-violet-50 p-6 rounded-xl border border-violet-400">
      <div className="text-center mb-4">
        <p className="text-lg font-semibold text-gray-900">
          Total Fare: {seatCount} × ₹{farePerSeat} = 
          <span className="text-2xl font-bold text-violet-600 ml-2">₹{total}</span>
        </p>
      </div>

      <div className="flex justify-center">
        <button
          disabled={seatCount === 0}
          onClick={onProceed}
          className="px-4 py-2 rounded-lg font-medium text-white transition-all
            bg-orange-500 hover:bg-orange-600
            disabled:bg-gray-400 disabled:cursor-not-allowed
            shadow-sm hover:shadow-md"
        >
          Go To Passenger Details
        </button>
      </div>
    </div>
  );
};

// Main Component
const NewSeatSelection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedTrain, selectedSeats } = useSelector((state) => state.booking);
  const [mode, setMode] = useState("manual");
  const [selectedCoach, setSelectedCoach] = useState("H1");

  const coachFareMap = {
    H1: 2500,
    H2: 2200, 
    H3: 2000,
    H4: 1800,
  };

  const farePerSeat = coachFareMap[selectedCoach] || 2500;

  // Validate previous steps
  useEffect(() => {
    if (!selectedTrain) {
      navigate("/");
      return;
    }
  }, [selectedTrain, navigate]);

  // Reset seats when coach changes
  useEffect(() => {
    dispatch(setSelectedSeats([]));
  }, [selectedCoach, dispatch]);

  // Auto-seat logic
  useEffect(() => {
    if (mode === "auto") {
      dispatch(setSelectedSeats([1, 2, 3]));
    }
  }, [mode, dispatch]);

  // Update fare data when coach or seats change
  useEffect(() => {
    const baseFare = selectedSeats.length * farePerSeat;
    const taxes = Math.round(baseFare * 0.05);
    const totalFare = baseFare + taxes;
    
    dispatch(setFareData({
      baseFare,
      taxes,
      totalFare,
      farePerSeat
    }));
  }, [selectedSeats.length, farePerSeat, dispatch]);

  const handleSeatSelect = (seat) => {
    dispatch(setSelectedSeats(
      selectedSeats.includes(seat)
        ? selectedSeats.filter((s) => s !== seat)
        : [...selectedSeats, seat]
    ));
  };

  const handleProceed = () => {
    if (selectedSeats.length === 0) {
      toast.error("Please select at least one seat");
      return;
    }
    toast.success(`${selectedSeats.length} seat(s) selected successfully!`);
    navigate("/passengers");
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Select Seats</h1>

      <JourneyInfoCard train={selectedTrain} />

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Choose Your Seats</h2>
        <SeatToggle mode={mode} setMode={setMode} />
      </div>

      <CoachSelector
        selectedCoach={selectedCoach}
        setSelectedCoach={setSelectedCoach}
        farePerSeat={farePerSeat}
        seatCount={selectedSeats.length}
      />

      {mode === "manual" ? (
        <SeatGrid
          selectedSeats={selectedSeats}
          onSeatSelect={handleSeatSelect}
        />
      ) : (
        <AutomaticSeatSelection />
      )}

      <FareSummary
        seatCount={selectedSeats.length}
        farePerSeat={farePerSeat}
        onProceed={handleProceed}
      />
    </div>
  );
};

export default NewSeatSelection;