import { createContext, useState, useCallback } from "react";

export const BookingContext = createContext();

export function BookingProvider({ children }) {
  // Search state
  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
    date: "",
  });

  // Selected train
  const [selectedTrain, setSelectedTrain] = useState(null);

  // Selected seats
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Passengers
  const [passengers, setPassengers] = useState([]);

  // Fare data
  const [fareData, setFareData] = useState({
    baseFare: 0,
    taxes: 0,
    totalFare: 0,
  });

  // Reset booking state
  const resetBooking = useCallback(() => {
    setSearchData({ from: "", to: "", date: "" });
    setSelectedTrain(null);
    setSelectedSeats([]);
    setPassengers([]);
    setFareData({ baseFare: 0, taxes: 0, totalFare: 0 });
  }, []);

  const value = {
    // Search state
    searchData,
    setSearchData,

    // Train selection
    selectedTrain,
    setSelectedTrain,

    // Seats
    selectedSeats,
    setSelectedSeats,

    // Passengers
    passengers,
    setPassengers,

    // Fare
    fareData,
    setFareData,

    // Utils
    resetBooking,
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}
