import React, { createContext, useContext, useEffect, useState } from "react";

type Department = {
  _id: string;
  name: string;
};

type DepartmentContextType = {
  departments: Department[];
  isLoading: boolean;
  error: string | null;
};

const DepartmentContext = createContext<DepartmentContextType | undefined>(undefined);

const API_URL = import.meta.env.VITE_API_URL;

export const DepartmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(`${API_URL}/exams/getDepartments`);
        if (!response.ok) {
          throw new Error("Failed to fetch departments");
        }
        const data = await response.json();
        setDepartments(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  return (
      <DepartmentContext.Provider value={{ departments, isLoading, error }}>
        {children}
      </DepartmentContext.Provider>
  );
};

export const useDepartments = () => {
  const context = useContext(DepartmentContext);
  if (context === undefined) {
    throw new Error("useDepartments must be used within a DepartmentProvider");
  }
  return context;
};