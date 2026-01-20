export default function HeroText() {
  return (
    <div className="w-full">
      {/* Heading */}
      <h1
        className="text-5xl font-bold text-gray-900 leading-tight"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        Book Your Journey <br />
        <span className="text-violet-600">With Confidence</span>
      </h1>

      {/* Description */}
      <p
        className="mt-6 text-lg text-gray-600 leading-relaxed w-[85%]"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        Experience seamless railway reservation, search schedules, check
        availability and book tickets in real time.
      </p>
    </div>
  );
}
