import gpsNavigation from "../../assets/gpsnavigation.gif";

/**
 * ImageSection Component
 * Responsibility: Display navigation image and description
 */
export default function ImageSection() {
  return (
    <div className="rounded-2xl w-full max-w-md flex flex-col items-center justify-center mx-auto">
      <img
        src={gpsNavigation}
        alt="GPS Navigation"
        className="w-full h-auto rounded-2xl"
      />
      <p className="text-center mt-4 text-slate-600 font-medium">
        Navigate Your Railway Journey with Ease
      </p>
    </div>
  );
}