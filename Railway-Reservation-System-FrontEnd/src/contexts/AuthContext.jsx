import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([
    {
      id: 1,
      fullName: "Mahesh Kumar",
      email: "mahesh@example.com",
      password: "Mahesh@1234",
      mobile: "9876543210",
    },
    {
      id: 2,
      fullName: "Abhi Singh",
      email: "abhi@example.com",
      password: "Abhi@5678",
      mobile: "9123456789",
    },
    {
      id: 3,
      fullName: "Vineet Sharma",
      email: "vineet@example.com",
      password: "Vineet@999",
      mobile: "9988776655",
    },
  ]);

  const login = (email, password) => {
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      setIsLoggedIn(true);
      setUser({
        id: foundUser.id,
        fullName: foundUser.fullName,
        email: foundUser.email,
        mobile: foundUser.mobile,
      });
      return { success: true, message: "Login successful" };
    }

    return { success: false, message: "Invalid email or password" };
  };

  const register = (fullName, email, password, confirmPassword, mobile) => {
    // Check if user already exists
    const userExists = users.find((u) => u.email === email);
    if (userExists) {
      return { success: false, message: "Email already registered" };
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return { success: false, message: "Passwords do not match" };
    }

    // Create new user
    const newUser = {
      id: users.length + 1,
      fullName,
      email,
      password,
      mobile,
    };

    setUsers([...users, newUser]);
    return { success: true, message: "Registration successful. Please login." };
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const value = {
    isLoggedIn,
    user,
    users,
    login,
    register,
    logout,
    setIsLoggedIn,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
