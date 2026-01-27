import HeroSection from "../components/common/HeroSection";
import SearchSection from "../components/common/SearchSection";
import ImageSection from "../components/common/ImageSection";

/**
 * HomePage Component
 * Responsibility: Layout and composition of home page sections
 */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-violet-50">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row min-h-[75vh] items-stretch">
          {/* Left Side - Hero and Search */}
          <div className="w-full lg:w-[60%] flex flex-col justify-center px-4">
            <HeroSection />
            <SearchSection />
          </div>

          {/* Right Side - Image */}
          <div className="w-full lg:w-[40%] flex items-center">
            <ImageSection />
          </div>
        </div>
      </section>
    </div>
  );
}
