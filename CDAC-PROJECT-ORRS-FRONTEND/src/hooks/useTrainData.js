import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

/**
 * useTrainData Hook
 * Responsibility: Manage train data fetching and validation
 */
export default function useTrainData(searchData) {
  const navigate = useNavigate();
  const [trains, setTrains] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Validate that search was performed
    if (!searchData.from || !searchData.to || !searchData.date) {
      navigate("/");
      return;
    }

    // Mock train data - in real app, fetch from API
    const mockTrains = [
      {
        id: 1,
        number: "15065",
        name: "Nanded Panvel Express",
        departure: "17:45",
        arrival: "12:10",
        duration: "6.25 Hrs",
        departureTime: "17:45",
        arrivalTime: "12:10",
        departureDate: searchData.date,
        arrivalDate: "24 Oct 2025",
        departureStation: searchData.from || "Hujur Sahib Nanded Station",
        arrivalStation: searchData.to || "Pune Railway Station",
        daysOfRun: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        coaches: [
          {
            type: "AC 1st Tier",
            available: 20,
            fare: 2500,
          },
          {
            type: "Sleeper Class",
            available: 123,
            fare: 550,
          },
          {
            type: "AC Chair Car",
            available: 180,
            fare: 1250,
          },
        ],
      },
      {
        id: 2,
        number: "12345",
        name: "SF Express",
        departure: "08:25",
        arrival: "12:10",
        duration: "3.45 Hrs",
        departureTime: "08:25",
        arrivalTime: "12:10",
        departureDate: searchData.date,
        arrivalDate: searchData.date,
        departureStation: searchData.from || "Hujur Sahib Nanded Station",
        arrivalStation: searchData.to || "Pune Railway Station",
        daysOfRun: ["Mon", "Wed", "Fri", "Sun"],
        coaches: [
          {
            type: "AC 2nd Tier",
            available: 45,
            fare: 1200,
          },
          {
            type: "AC 3rd Tier",
            available: 89,
            fare: 800,
          },
        ],
      },
    ];

    setTrains(mockTrains);
  }, [searchData, navigate]);

  return {
    trains,
    isLoading,
    error
  };
}