import HeroText from "../components/common/HeroText";
import SearchTrain from "../components/forms/SearchTrain";
import gpsNavigation from "../assets/gpsnavigation.gif";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-violet-50">
      {/* HERO + IMAGE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* IMPORTANT: min-h added + items-stretch */}
        <div className="flex flex-col lg:flex-row min-h-[75vh] items-stretch ">
          {/* LEFT SIDE (70%) */}
          <div className="w-full lg:w-[60%] flex flex-col justify-center px-4">
            <HeroText />
            <div className="mt-8 pr-4">
              <SearchTrain />
            </div>
          </div>

          {/* RIGHT SIDE (30%) */}
          <div className="w-full lg:w-[40%] flex items-center">
            <div className="rounded-2xl w-full  max-w-md flex flex-col items-center justify-center mx-auto ">
              <img
                src={gpsNavigation}
                alt="GPS Navigation"
                className="w-full h-auto rounded-2xl"
              />
              <p className="text-center mt-4 text-slate-600 font-medium">
                Navigate Your Railway Journey with Ease
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
