import React from "react";
import { useDepartments } from "../contexts/DepartmentContext";
import { useCourses } from "../contexts/CourseContext";

type ExamFiltersProps = {
    onFilterChange: (filters: any) => void;
    selectedDepartment: string;
    selectedUnit: string;
    selectedCourse: string;
    selectedLevel: string;
};

export const ExamFilters: React.FC<ExamFiltersProps> = ({
                                                            onFilterChange,
                                                            selectedDepartment,
                                                            selectedUnit,
                                                            selectedCourse,
                                                            selectedLevel,
                                                        }) => {
    const { departments, isLoading: isLoadingDepartments, error: errorDepartments } = useDepartments();
    const { courses, isLoading: isLoadingCourses, error: errorCourses } = useCourses();
    const units = ["All Units", "Basic Unit", "Common Unit", "Core Unit"];
    const levels = ["All Levels", "Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Level 6"];

    if (isLoadingDepartments || isLoadingCourses) {
        return <div>Loading...</div>;
    }

    if (errorDepartments) {
        return <div>Error: {errorDepartments}</div>;
    }

    if (errorCourses) {
        return <div>Error: {errorCourses}</div>;
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                        Department
                    </label>
                    <select
                        id="department"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={selectedDepartment}
                        onChange={(e) => onFilterChange({ department: e.target.value })}
                    >
                        <option value="All Departments">All Departments</option>
                        {departments.map((dept) => (
                            <option key={dept._id} value={dept.name}>
                                {dept.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">
                        Unit Type
                    </label>
                    <select
                        id="unit"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={selectedUnit}
                        onChange={(e) => onFilterChange({ unit: e.target.value })}
                    >
                        {units.map((unit) => (
                            <option key={unit} value={unit}>
                                {unit}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
                        Course
                    </label>
                    <select
                        id="course"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={selectedCourse}
                        onChange={(e) => onFilterChange({ course: e.target.value })}
                    >
                        <option value="All Courses">All Courses</option>
                        {courses.map((course) => (
                            <option key={course._id} value={course.name}>
                                {course.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
                        Level
                    </label>
                    <select
                        id="level"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={selectedLevel}
                        onChange={(e) => onFilterChange({ level: e.target.value })}
                    >
                        {levels.map((level) => (
                            <option key={level} value={level}>
                                {level}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-500">
                <span className="mr-2">Quick filters:</span>
                <button
                    className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 mr-2"
                    onClick={() => onFilterChange({ unit: "Basic Unit" })}
                >
                    Basic Units
                </button>
                <button
                    className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 mr-2"
                    onClick={() => onFilterChange({ unit: "Core Unit" })}
                >
                    Core Units
                </button>
                <button
                    className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200"
                    onClick={() => onFilterChange({ unit: "Common Unit" })}
                >
                    Common Units
                </button>
            </div>
        </div>
    );
};