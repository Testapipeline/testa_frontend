import React, { createContext, useContext, useEffect, useState } from "react";

type Instructor = {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdDate: string;
};

type InstructorContextType = {
  instructors: Instructor[];
  isLoading: boolean;
  error: string | null;
  updateUserStatus: (userId: string, status: string) => Promise<void>;
};

const InstructorContext = createContext<InstructorContextType | undefined>(undefined);

const API_URL = import.meta.env.VITE_API_URL;

export const InstructorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await fetch(`${API_URL}/users/getInstructors`);
        if (!response.ok) {
          throw new Error("Failed to fetch instructors");
        }
        const data = await response.json();
        const formattedData = data.map((instructor: Instructor) => ({
          ...instructor,
          createdDate: new Date(instructor.createdDate).toISOString().split('T')[0]
        }));
        setInstructors(formattedData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstructors();
  }, []);

  const updateUserStatus = async (userId: string, status: string) => {
    try {
      const response = await fetch(`${API_URL}/users/userApproval/${userId}/${status}`);
      if (!response.ok) {
        throw new Error("Failed to update user status");
      }
      setInstructors(prevInstructors =>
          prevInstructors.map(instructor =>
              instructor._id === userId ? { ...instructor, status } : instructor
          )
      );
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
      <InstructorContext.Provider value={{ instructors, isLoading, error, updateUserStatus }}>
        {children}
      </InstructorContext.Provider>
  );
};

export const useInstructors = () => {
  const context = useContext(InstructorContext);
  if (context === undefined) {
    throw new Error("useInstructors must be used within an InstructorProvider");
  }
  return context;
};