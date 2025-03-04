import { DashboardLayout } from "./DashboardLayout.tsx";
import { DollarSign } from "lucide-react";

export const Earnings = () => {
  const earnings = [
    { id: 1, course: "Advanced Programming", price: 900 },
    { id: 2, course: "Data Structures", price: 0 },
    { id: 3, course: "Web Development", price: 460 }
  ];

  const totalEarnings = earnings.reduce((total, earning) => total + earning.price, 0);

  return (
      <DashboardLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20 mb-5">
          <h1 className="text-2xl font-bold text-gray-900">Earnings</h1>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <DollarSign className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Earnings</dt>
                      <dd className="text-lg font-medium text-gray-900">KSH {totalEarnings}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700">
              Withdraw Earnings
            </button>
          </div>
          <h2 className="mt-8 text-lg font-medium text-gray-900">Earnings List</h2>
          <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              <li className="bg-gray-50 px-4 py-2 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-500">Course Name</p>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <p className="text-sm font-medium text-gray-500">Price</p>
                  </div>
                </div>
              </li>
              {earnings.map((earning) => (
                  <li key={earning.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-blue-600 truncate">{earning.course}</p>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <p className="text-sm font-medium text-gray-900">KSH {earning.price}</p>
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