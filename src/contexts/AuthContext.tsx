import React, { useEffect, useState, createContext, useContext } from "react";
type User = {
  id: string;
  name: string;
  email: string;
  role: "student" | "instructor" | "admin";
};
type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
};
const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Check for stored auth token and validate
    const checkAuth = async () => {
      const token = localStorage.getItem("auth_token");
      if (token) {
        // Validate token with backend
        // For now, we'll just simulate a logged-in user
        setUser({
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          role: "instructor"
        });
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Implement actual login API call here
      // For now, simulate a successful login
      const mockUser = {
        id: "1",
        name: "John Doe",
        email,
        role: "instructor" as const
      };
      localStorage.setItem("auth_token", "mock_token");
      setUser(mockUser);
    } catch (error) {
      throw new Error("Login failed");
    } finally {
      setIsLoading(false);
    }
  };
  const signup = async (data: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => {
    setIsLoading(true);
    try {
      // Implement actual signup API call here
      // For now, simulate a successful signup
      const mockUser = {
        id: "1",
        name: data.name,
        email: data.email,
        role: data.role as "student" | "instructor" | "admin"
      };
      localStorage.setItem("auth_token", "mock_token");
      setUser(mockUser);
    } catch (error) {
      throw new Error("Signup failed");
    } finally {
      setIsLoading(false);
    }
  };
  const logout = () => {
    localStorage.removeItem("auth_token");
    setUser(null);
  };
  return <AuthContext.Provider value={{
    user,
    login,
    signup,
    logout,
    isLoading
  }}>
      {children}
    </AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};