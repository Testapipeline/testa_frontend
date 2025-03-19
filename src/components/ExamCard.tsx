import React from "react";
import { FileText, Clock, BookOpen, Layers } from "lucide-react";
import { Link } from "react-router-dom";

type ExamCardProps = {
  exam: {
    _id: string;
    name: string;
    department: string;
    unitName: string;
    course: string;
    level: string;
    price: number;
    author: string;
    createdDate: string;
  };
};

export const ExamCard: React.FC<ExamCardProps> = ({ exam }) => {
  return (
      <Link to={`/exam/${exam._id}`} className="block transform transition-transform hover:scale-105">
        <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 overflow-hidden">
          <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2 truncate">
              {exam.name}
            </h3>
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-500">
                <BookOpen className="h-4 w-4 mr-2 text-blue-600" />
                <span className="font-medium">{exam.department}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Layers className="h-4 w-4 mr-2 text-green-600" />
                <span className="font-medium">{exam.unitName}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <FileText className="h-4 w-4 mr-2 text-purple-600" />
                <span className="font-medium">{exam.course}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <FileText className="h-4 w-4 mr-2 text-red-600" />
                <span className="font-medium">{exam.level}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-2 text-yellow-600" />
                <span className="font-medium">Updated : {exam.createdDate}</span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-gray-500">{exam.author}</span>
              <span className="text-lg font-bold text-blue-600">KSH {exam.price}</span>
            </div>
          </div>
        </div>
      </Link>
  );
};