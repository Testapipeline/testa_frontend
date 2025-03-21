import React, { createContext, useContext, useEffect, useState } from "react";

type Course = {
  _id: string;
  name: string;
};

type CourseContextType = {
  courses: Course[];
  isLoading: boolean;
  error: string | null;
};

const CourseContext = createContext<CourseContextType | undefined>(undefined);

const API_URL = import.meta.env.VITE_API_URL;

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${API_URL}/exams/getCourses`);
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        setCourses(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
      <CourseContext.Provider value={{ courses, isLoading, error }}>
        {children}
      </CourseContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error("useCourses must be used within a CourseProvider");
  }
  return context;
};