import { useLocation } from "react-router";
import { useContext } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../AfterSearch/Components/SearchBar";
import JourneySteps from "../AfterSearch/Components/JourneySteps";
import { BookingContext } from "../contexts/BookingContext";

export default function HeaderLayout() {
  const location = useLocation();
  const { searchData, setSearchData } = useContext(BookingContext);

  const hideSearchBar = ["/login", "/register", "/confirmation", "/"].includes(
    location.pathname
  );
  const hideJourneySteps = [
    "/login",
    "/register",
    "/confirmation",
    "/",
  ].includes(location.pathname);

  const getCurrentStep = () => {
    const path = location.pathname;
    if (path.includes("/trains")) return 1;
    if (path.includes("/seats")) return 2;
    if (path.includes("/passengers")) return 3;
    if (
      path.includes("/review") ||
      path.includes("/payment") ||
      path.includes("/confirmation")
    )
      return 4;
    return 1;
  };

  return (
    <div className="w-full bg-white shadow-sm">
      <Navbar />
      {!hideSearchBar && (
        <div className="border-t border-violet-100">
          <SearchBar searchData={searchData} setSearchData={setSearchData} />
        </div>
      )}
      {!hideJourneySteps && (
        <div className="border-t border-violet-100">
          <JourneySteps currentStep={getCurrentStep()} />
        </div>
      )}
    </div>
  );
}
