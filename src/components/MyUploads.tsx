import { DashboardLayout } from "./DashboardLayout.tsx";
import { FileText } from "lucide-react";
import {useNavigate} from "react-router-dom";

export const MyUploads = () => {
  const navigate = useNavigate();

  const uploads = [
    { id: 1, title: "Advanced Programming", status: "Approved", downloads: 45, earnings: 900 },
    { id: 2, title: "Data Structures", status: "Pending", downloads: 0, earnings: 0 },
    { id: 3, title: "Web Development", status: "Approved", downloads: 23, earnings: 460 }
  ];

  const totalUploads = uploads.length;

  const handleUploadClick = () => {
    navigate("/dashboard/instructor/upload");
  };

  return (
      <DashboardLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20 mb-5">
          <h1 className="text-2xl font-bold text-gray-900">My Uploads</h1>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FileText className="h-6 w-6 text-gray-400"/>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Uploads</dt>
                      <dd className="text-lg font-medium text-gray-900">{totalUploads}</dd>
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
                {uploads.map((upload) => (
                    <li key={upload.id}>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-blue-600 truncate">{upload.title}</p>
                            <p className="mt-1 text-sm text-gray-500">
                              Status:{" "}
                              <span className={upload.status === "Approved" ? "text-green-600" : "text-yellow-600"}>
                            {upload.status}
                          </span>
                            </p>
                          </div>
                          <div className="ml-4 flex items-center space-x-4">
                            <div className="text-sm text-gray-500">{upload.downloads} downloads</div>
                            <div className="text-sm font-medium text-green-600">KSH {upload.earnings}</div>
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