import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "../components/DashboardLayout";
import { Download } from "lucide-react";
import { useExam } from "../contexts/ExamContext";
import { useAuth } from "../contexts/AuthContext";

interface Exam {
  _id: string;
  name: string;
  department: string;
}

export const StudentDashboard = () => {
  const [boughtExams, setBoughtExams] = useState<Exam[]>([]);
  const { getPurchasedExamsById } = useExam();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoughtExams = async () => {
      if (user) {
        const exams = await getPurchasedExamsById(user.id);
        setBoughtExams(exams);
      }
    };

    fetchBoughtExams();
  }, [user, getPurchasedExamsById]);

  const handleViewExam = (id: string) => {
    navigate(`/exam/${id}`);
  };

  return (
      <DashboardLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20 mb-5">
          <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Download className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Purchased Exams</dt>
                      <dd className="text-lg font-medium text-gray-900">{boughtExams.length}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-900">My Exams</h2>
            <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {boughtExams.map(exam => (
                    <li key={exam._id}>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-blue-600 truncate">{exam.name}</p>
                            <p className="mt-1 text-sm text-gray-500">{exam.department}</p>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <button
                                onClick={() => handleViewExam(exam._id)}
                                className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700"
                            >
                              View Exam
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </DashboardLayout>
  );
};