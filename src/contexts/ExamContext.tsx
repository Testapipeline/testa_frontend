import React, { createContext, useContext, useState, useEffect } from "react";

type Exam = {
  _id: string;
  author: string;
  name: string;
  department: string;
  course: string;
  level: string;
  unitName: string;
  description: string;
  filePath: string;
  price: number;
  topics: string[];
  status: string;
  createdDate: string;
};

type ExamContextType = {
  uploadExam: (data: FormData) => Promise<void>;
  getExams: () => Promise<void>;
  exams: Exam[];
  isLoading: boolean;
  error: string | null;
};

const ExamContext = createContext<ExamContextType | undefined>(undefined);

export const ExamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadExam = async (data: FormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/testa/api/exams/upload", {
        method: "POST",
        body: data,
      });
      if (!response.ok) {
        throw new Error("Failed to upload exam");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getExams = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/testa/api/exams/getExams");
      if (!response.ok) {
        throw new Error("Failed to fetch exams");
      }
      const data: Exam[] = await response.json();
      setExams(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getExams();
  }, []);

  return (
      <ExamContext.Provider value={{ uploadExam, getExams, exams, isLoading, error }}>
        {children}
      </ExamContext.Provider>
  );
};

export const useExam = () => {
  const context = useContext(ExamContext);
  if (context === undefined) {
    throw new Error("useExam must be used within an ExamProvider");
  }
  return context;
};