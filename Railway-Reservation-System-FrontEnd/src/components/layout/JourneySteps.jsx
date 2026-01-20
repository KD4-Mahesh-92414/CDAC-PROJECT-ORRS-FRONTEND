import { useLocation } from "react-router";

export default function JourneySteps({ currentStep }) {
  const location = useLocation();

  const steps = [
    {
      number: 1,
      label: "Select Train",
      path: "/trains",
    },
    {
      number: 2,
      label: "Select Seat",
      path: "/seats",
    },
    {
      number: 3,
      label: "Passengers",
      path: "/passengers",
    },
    {
      number: 4,
      label: "Review & Pay",
      path: "/review",
    },
  ];

  const getStepStatus = (stepNumber) => {
    if (stepNumber === currentStep) return "active";
    if (stepNumber < currentStep) return "completed";
    return "pending";
  };

  // Don't show on home or auth pages
  const hideOnPages = ["/", "/login", "/register", "/confirmation"];
  if (hideOnPages.includes(location.pathname)) {
    return null;
  }

  return (
    <div className="bg-white border-b border-violet-100 py-4">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-center gap-4">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              {/* Step Circle */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-200 ${
                    getStepStatus(step.number) === "active"
                      ? "bg-violet-600 text-white ring-4 ring-violet-200 shadow-lg"
                      : getStepStatus(step.number) === "completed"
                      ? "bg-green-500 text-white shadow-md"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {getStepStatus(step.number) === "completed" ? (
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    step.number
                  )}
                </div>

                {/* Step Label */}
                <div className="hidden sm:block">
                  <p
                    className={`text-sm font-semibold transition-colors ${
                      getStepStatus(step.number) === "active"
                        ? "text-violet-600"
                        : getStepStatus(step.number) === "completed"
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={`mx-6 h-1 w-16 transition-all duration-200 ${
                    getStepStatus(step.number + 1) !== "pending"
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
