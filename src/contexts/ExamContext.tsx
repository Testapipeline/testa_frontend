import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";

type Exam = {
  _id: string;
  authorId: string;
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
  getExamsByAuthor: (authorId: string) => Promise<void>;
  getApprovedExams: () => Promise<void>;
  getApprovedExamByExamId: (examId: string) => Promise<Exam | null>;
  approveExams: (examId: string, status: string) => Promise<void>;
  getPurchasedExamsById: (userId: string) => Promise<Exam[]>;
  exams: Exam[];
  approvedExams: Exam[];
  authorExams: Exam[];
  isLoading: boolean;
  error: string | null;
};

const ExamContext = createContext<ExamContextType | undefined>(undefined);

export const ExamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [approvedExams, setApprovedExams] = useState<Exam[]>([]);
  const [authorExams, setAuthorExams] = useState<Exam[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

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
      const formattedData = data.map((exam: Exam) => ({
        ...exam,
        createdDate: new Date(exam.createdDate).toISOString().split('T')[0]
      }));
      setExams(formattedData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getExamsByAuthor = async (authorId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/testa/api/exams/getExamsByAuthor/${authorId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch exams by author");
      }
      const data: Exam[] = await response.json();
      setAuthorExams(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getApprovedExams = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/testa/api/exams/getApprovedExams");
      if (!response.ok) {
        throw new Error("Failed to fetch approved exams");
      }
      const data: Exam[] = await response.json();
      const formattedData = data.map((exam: Exam) => ({
        ...exam,
        createdDate: new Date(exam.createdDate).toISOString().split('T')[0]
      }));
      setApprovedExams(formattedData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getApprovedExamByExamId = useCallback(async (examId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/testa/api/exams/getApprovedExamByExamId/${examId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch exam details");
      }
      const data: Exam = await response.json();
      return {
        ...data,
        createdDate: new Date(data.createdDate).toISOString().split('T')[0]
      };
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const approveExams = async (examId: string, status: string) => {
    try {
      const response = await fetch(`http://localhost:5000/testa/api/exams/examApproval/${examId}/${status}`);
      if (!response.ok) {
        throw new Error("Failed to update exam status");
      }
      setExams(prevExams =>
          prevExams.map(exam =>
              exam._id === examId ? { ...exam, status } : exam
          )
      );
    } catch (err: any) {
      setError(err.message);
    }
  };

  const getPurchasedExamsById = useCallback(async (userId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/testa/api/exams/getPurchasedExams/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch purchased exams");
      }
      const data: Exam[] = await response.json();
      const formattedData = data.map((exam: Exam) => ({
        ...exam,
        createdDate: new Date(exam.createdDate).toISOString().split('T')[0]
      }));
      return formattedData;
    } catch (err: any) {
      setError(err.message);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getExams();
    if (user) {
      getExamsByAuthor(user.id);
    }
  }, [user]);

  return (
      <ExamContext.Provider value={{ uploadExam, getExams, getExamsByAuthor, getApprovedExams, getApprovedExamByExamId, approveExams, getPurchasedExamsById, exams, approvedExams, authorExams, isLoading, error }}>
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