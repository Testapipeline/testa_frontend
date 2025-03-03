import { BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
const departments = ["Agriculture and Aquaculture", "Applied Sciences", "Building and Civil Engineering", "Business Studies", "Computer Studies/ICT", "Electrical and Electronic Engineering", "Health Science", "Hospitality", "Mechanical and Automotive Engineering", "Social Work", "Textile, Fashion Design and Cosmetology"];
export const DepartmentGrid = () => {
  const navigate = useNavigate();
  const handleDepartmentClick = (dept: string) => {
    navigate(`/exams?department=${encodeURIComponent(dept)}`);
  };
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {departments.map((dept, index) => <div key={index} onClick={() => handleDepartmentClick(dept)} className="p-6 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer transform hover:scale-105 duration-200">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">{dept}</h3>
              <p className="mt-1 text-sm text-gray-500">
                Browse all examinations
              </p>
            </div>
          </div>
        </div>)}
    </div>;
};