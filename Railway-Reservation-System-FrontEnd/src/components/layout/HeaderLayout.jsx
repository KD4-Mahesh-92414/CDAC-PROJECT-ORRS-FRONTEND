import { useLocation } from "react-router";
import { useContext } from "react";
import BookingNavbar from "./BookingNavbar";
import HeaderSearchBar from "./HeaderSearchBar";
import JourneySteps from "./JourneySteps";
import { BookingContext } from "../../contexts/BookingContext";

export default function HeaderLayout() {
  const location = useLocation();
  const { searchData, setSearchData } = useContext(BookingContext);

  const getCurrentStep = () => {
    const path = location.pathname;
    if (path.includes('/trains')) return 1;
    if (path.includes('/seats')) return 2;
    if (path.includes('/passengers')) return 3;
    if (path.includes('/review') || path.includes('/payment') || path.includes('/confirmation')) return 4;
    return 1;
  };

  return (
    <div className="w-full">
      {/* Main Header with Violet Background */}
      <div className="bg-gradient-to-r from-violet-600 via-violet-700 to-violet-800 shadow-lg">
        {/* Navigation Bar */}
        <BookingNavbar />
        
        {/* Search Bar */}
        <HeaderSearchBar 
          searchData={searchData}
          setSearchData={setSearchData}
        />
      </div>
      
      {/* Journey Steps */}
      <JourneySteps currentStep={getCurrentStep()} />
    </div>
  );
}
