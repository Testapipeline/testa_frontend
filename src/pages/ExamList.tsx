import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ExamFilters } from "../components/ExamFilters";
import { ExamCard } from "../components/ExamCard";
import { useExam } from "../contexts/ExamContext";
import { useDepartments } from "../contexts/DepartmentContext";
import { useCourses } from "../contexts/CourseContext";

export const ExamList = () => {
  const [searchParams] = useSearchParams();
  const { getApprovedExams, approvedExams, isLoading, error } = useExam();
  const { isLoading: isLoadingDepartments, error: errorDepartments } = useDepartments();
  const { isLoading: isLoadingCourses, error: errorCourses } = useCourses();
  const [filters, setFilters] = useState({
    department: searchParams.get("department") || "All Departments",
    unit: "All Units",
    course: "All Courses",
    level: "All Levels"
  });

  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      department: searchParams.get("department") || "All Departments"
    }));
  }, [searchParams]);

  useEffect(() => {
    getApprovedExams();
  }, []);

  const filteredExams = approvedExams.filter(exam => {
    return (
        (filters.department === "All Departments" || exam.department === filters.department) &&
        (filters.unit === "All Units" || exam.unitName === filters.unit) &&
        (filters.course === "All Courses" || exam.course === filters.course) &&
        (filters.level === "All Levels" || exam.level === filters.level)
    );
  });

  const handleFilterChange = (newFilters: any) => {
    setFilters({
      ...filters,
      ...newFilters
    });
  };

  if (isLoading || isLoadingDepartments || isLoadingCourses) {
    return <div>Loading...</div>;
  }

  if (error || errorDepartments || errorCourses) {
    return <div>Error: {error || errorDepartments || errorCourses}</div>;
  }

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20 mb-5">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Available Exams</h1>
        </div>
        <ExamFilters
            selectedDepartment={filters.department}
            selectedUnit={filters.unit}
            selectedCourse={filters.course}
            selectedLevel={filters.level}
            onFilterChange={handleFilterChange}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map(exam => <ExamCard key={exam._id} exam={exam} />)}
        </div>
      </div>
  );
};