import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ExamFilters } from "../components/ExamFilters";
import { ExamCard } from "../components/ExamCard";

export const ExamList = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    department: searchParams.get("department") || "All Departments",
    unit: "All Units",
    course: "All Courses",
    level: "All Levels"
  });

  // Mock exam data - would come from API
  const exams = [
    {
      id: 1,
      title: "Advanced Programming",
      department: "Computer Studies/ICT",
      unit: "Core Unit",
      level: "Level 1",
      course: "Course 1",
      price: 1500,
      instructor: "Dr. John Smith",
      lastUpdated: "2023-08-15"
    },
    {
      id: 2,
      title: "Introduction to Business",
      department: "Business Studies",
      unit: "Basic Unit",
      level: "Level 1",
      course: "Course 2",
      price: 1200,
      instructor: "Prof. Jane Doe",
      lastUpdated: "2023-07-20"
    },
    {
      id: 3,
      title: "Civil Engineering Basics",
      department: "Building and Civil Engineering",
      unit: "Core Unit",
      level: "Level 2",
      course: "Course 3",
      price: 1800,
      instructor: "Dr. Alan Brown",
      lastUpdated: "2023-06-10"
    },
    {
      id: 4,
      title: "Health Science Fundamentals",
      department: "Health Science",
      unit: "Common Unit",
      level: "Level 1",
      course: "Course 4",
      price: 1300,
      instructor: "Dr. Emily White",
      lastUpdated: "2023-05-05"
    },
    {
      id: 5,
      title: "Fashion Design Principles",
      department: "Textile, Fashion Design and Cosmetology",
      unit: "Core Unit",
      level: "Level 3",
      course: "Course 5",
      price: 2000,
      instructor: "Ms. Sarah Green",
      lastUpdated: "2023-04-15"
    },
    {
      id: 6,
      title: "Automotive Engineering",
      department: "Mechanical and Automotive Engineering",
      unit: "Core Unit",
      level: "Level 2",
      course: "Course 6",
      price: 1700,
      instructor: "Mr. Michael Blue",
      lastUpdated: "2023-03-25"
    }
  ];

  const filteredExams = exams.filter(exam => {
    return (
        (filters.department === "All Departments" || exam.department === filters.department) &&
        (filters.unit === "All Units" || exam.unit === filters.unit) &&
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
          {filteredExams.map(exam => <ExamCard key={exam.id} exam={exam} />)}
        </div>
      </div>
  );
};