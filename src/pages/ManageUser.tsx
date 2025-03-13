import { DashboardLayout } from "../components/DashboardLayout";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

export const ManageUser = () => {
  const users = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", joinDate: "2023-08-15", status: "pending" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", joinDate: "2023-08-16", status: "pending" }
    // Add more mock data
  ];

  return (
      <DashboardLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
          <div className="mt-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {users.map(user => (
                    <li key={user.id}>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center">
                              <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                              <p className="text-sm font-medium text-blue-600 truncate">{user.name}</p>
                            </div>
                            <div className="mt-2">
                              <p className="text-sm text-gray-500">Email: {user.email}</p>
                              <p className="text-sm text-gray-500">Join Date: {user.joinDate}</p>
                            </div>
                          </div>
                          <div className="flex space-x-3">
                            <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </button>
                            <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700">
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
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