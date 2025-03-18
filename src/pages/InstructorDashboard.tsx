import { DashboardLayout } from "../components/DashboardLayout";
import { FileText, DollarSign, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useExam } from "../contexts/ExamContext";

export const InstructorDashboard = () => {
  const navigate = useNavigate();
  const { exams, isLoading, error } = useExam();

  const handleUploadClick = () => {
    navigate("/dashboard/instructor/upload");
  };

  const getStatusLabelColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-orange-100 text-orange-800";
      case "Deleted":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
      <DashboardLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20 mb-5">
          <h1 className="text-2xl font-bold text-gray-900">Instructor Dashboard</h1>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Upload className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Uploads</dt>
                      <dd className="text-lg font-medium text-gray-900">{exams.length}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FileText className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Pending Approval</dt>
                      <dd className="text-lg font-medium text-gray-900">{exams.filter(exam => exam.status === "Pending").length}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <DollarSign className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Earnings</dt>
                      <dd className="text-lg font-medium text-gray-900">KSH {exams.reduce((total, exam) => total + exam.price, 0)}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Recent Uploads</h2>
              <button
                  onClick={handleUploadClick}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Upload New Exam
              </button>
            </div>
            <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {exams.map((upload) => (
                    <li key={upload._id}>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-blue-600 truncate">{upload.name}</p>
                            <p className="mt-1 text-sm text-gray-500">
                              Status:{" "}
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusLabelColor(upload.status)}`}>
                            {upload.status}
                          </span>
                            </p>
                            <p className="mt-1 text-sm text-gray-500">Uploaded Date: {new Date(upload.createdDate).toLocaleDateString()}</p>
                          </div>
                          <div className="ml-4 flex items-center space-x-4">
                            <div className="text-sm font-medium text-green-600">KSH {upload.price}</div>
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