import { useState } from "react";
import Modal from "../common/Modal";
import { Login } from "../../pages/auth/Login";
import Register from "../../pages/auth/Register";

export default function AuthModal({ isOpen, onClose, initialTab = "login" }) {
  const [currentTab, setCurrentTab] = useState(initialTab);

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="w-full max-w-md">
        {/* Tab Navigation */}
        <div className="flex gap-4 mb-6 border-b-2 border-violet-100">
          <button
            onClick={() => setCurrentTab("login")}
            className={`pb-3 font-semibold transition-colors ${
              currentTab === "login"
                ? "text-violet-600 border-b-2 border-violet-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setCurrentTab("register")}
            className={`pb-3 font-semibold transition-colors ${
              currentTab === "register"
                ? "text-violet-600 border-b-2 border-violet-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Register
          </button>
        </div>

        {/* Tab Content */}
        {currentTab === "login" ? (
          <Login
            onLoginSuccess={() => {
              onClose();
            }}
            onSwitchToRegister={() => setCurrentTab("register")}
          />
        ) : (
          <Register
            onRegisterSuccess={() => {
              setCurrentTab("login");
            }}
            onSwitchToLogin={() => setCurrentTab("login")}
          />
        )}
      </div>
    </Modal>
  );
}
