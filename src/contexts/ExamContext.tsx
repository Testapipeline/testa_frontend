import React, { createContext, useContext, useState } from "react";

type ExamContextType = {
  uploadExam: (data: FormData) => Promise<void>;
  isLoading: boolean;
  error: string | null;
};

const ExamContext = createContext<ExamContextType | undefined>(undefined);

export const ExamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

  return (
      <ExamContext.Provider value={{ uploadExam, isLoading, error }}>
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