import React, { useEffect, useState, createContext, useContext } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role: "student" | "instructor" | "admin" | null;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: { name: string; email: string; password: string; role: string }) => Promise<void>;
  logout: () => void;
  deleteUser: () => Promise<void>;
  resetPassword: (email: string, newPassword: string) => Promise<string>;
  sendVerificationCode: (email: string) => Promise<string>;
  verifyOTP: (email: string, code: string) => Promise<string>;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

const API_URL = import.meta.env.VITE_API_URL;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await response.json();
      const userData = {
        id: data.user._id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role || null,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: { name: string; email: string; password: string; role: string }) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Signup failed");
      }

      localStorage.setItem("user", JSON.stringify(result.user));
      setUser(result.user);
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const deleteUser = async () => {
    if (!user) return;
    try {
      const response = await fetch(`${API_URL}/users/deleteUser/${user.role}/${user.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete account");
      }

      localStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      throw new Error("Failed to delete account");
    }
  };

  const resetPassword = async (email: string, newPassword: string): Promise<string> => {
    try {
      const response = await fetch(`${API_URL}/users/resetPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password:newPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to reset password");
      }

      const data = await response.json();
      return data.message;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const sendVerificationCode = async (email: string): Promise<string> => {
    try {
      const response = await fetch(`${API_URL}/users/sendVerificationCode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send verification code");
      }

      const data = await response.json();
      return data.message;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const verifyOTP = async (email: string, code: string): Promise<string> => {
    try {
      const response = await fetch(`${API_URL}/users/verifyOTP/${email}/${code}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Invalid or expired code");
      }

      const data = await response.json();
      return data.message;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return (
      <AuthContext.Provider value={{ user, login, signup, logout, deleteUser, resetPassword, sendVerificationCode, verifyOTP, isLoading }}>
        {children}
      </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};