import { DashboardLayout } from "../components/DashboardLayout";
import { FileText, Download, Clock } from "lucide-react";

export const StudentDashboard = () => {
  const recentExams = [
    { id: 1, title: "Computer Programming", department: "Computer Studies/ICT", price: 20 },
    { id: 2, title: "Digital Electronics", department: "Electrical Engineering", price: 15 },
    { id: 3, title: "Business Communication", department: "Business Studies", price: 18 }
  ];

  return (
      <DashboardLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20 mb-5">
          <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FileText className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Available Exams</dt>
                      <dd className="text-lg font-medium text-gray-900">245</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Download className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Downloaded Exams</dt>
                      <dd className="text-lg font-medium text-gray-900">12</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Clock className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Recent Activity</dt>
                      <dd className="text-lg font-medium text-gray-900">5 days ago</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h2 className="mt-8 text-lg font-medium text-gray-900">Recent Exams</h2>
          <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {recentExams.map(exam => (
                  <li key={exam.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-blue-600 truncate">{exam.title}</p>
                          <p className="mt-1 text-sm text-gray-500">{exam.department}</p>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                            KSH {exam.price}
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
              ))}
            </ul>
          </div>
        </div>
      </DashboardLayout>
  );
};