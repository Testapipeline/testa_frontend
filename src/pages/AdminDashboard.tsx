import { useEffect, useState } from "react";
import { DashboardLayout } from "../components/DashboardLayout";
import { FileText, Users, CheckSquare, UserPlus } from "lucide-react";
import { InstructorProvider, useInstructors } from "../contexts/InstructorContext";
import { useExam } from "../contexts/ExamContext";

export const AdminDashboard = () => {
    const { getExams, exams, isLoading, error } = useExam();
    const { instructors: recentUsers, isLoading: isUsersLoading, error: usersError } = useInstructors();

    const [approvedExamsCount, setApprovedExamsCount] = useState(0);
    const [pendingExamApprovalsCount, setPendingExamApprovalsCount] = useState(0);

    useEffect(() => {
        getExams();
    }, []);

    useEffect(() => {
        const approvedExams = exams.filter(exam => exam.status === "Approved").length;
        const pendingExams = exams.filter(exam => exam.status === "Pending").length;
        setApprovedExamsCount(approvedExams);
        setPendingExamApprovalsCount(pendingExams);
    }, [exams]);

    const approvedUsersCount = recentUsers.filter(user => user.status === "Approved").length;
    const pendingUserApprovalsCount = recentUsers.filter(user => user.status === "Pending").length;

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

    if (isLoading || isUsersLoading) {
        return <div>Loading...</div>;
    }

    if (error || usersError) {
        return <div>Error: {error || usersError}</div>;
    }

    return (
        <DashboardLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20 mb-5">
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <FileText className="h-6 w-6 text-gray-400" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Approved Exams</dt>
                                        <dd className="text-lg font-medium text-gray-900">{approvedExamsCount}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <Users className="h-6 w-6 text-gray-400" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Approved Users</dt>
                                        <dd className="text-lg font-medium text-gray-900">{approvedUsersCount}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <CheckSquare className="h-6 w-6 text-gray-400" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Pending Exam Approvals</dt>
                                        <dd className="text-lg font-medium text-gray-900">{pendingExamApprovalsCount}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <UserPlus className="h-6 w-6 text-gray-400" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Pending User Approvals</dt>
                                        <dd className="text-lg font-medium text-gray-900">{pendingUserApprovalsCount}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <h2 className="text-lg font-medium text-gray-900">Recently Added Exams</h2>
                    <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
                        <ul className="divide-y divide-gray-200">
                            {exams.map((exam) => (
                                <li key={exam._id}>
                                    <div className="px-4 py-4 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-blue-600 truncate">{exam.name}</p>
                                                <p className="mt-1 text-sm text-gray-500">Status: <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusLabelColor(exam.status)}`}>{exam.status}</span></p>
                                                <p className="mt-1 text-sm text-gray-500">Upload Date: {new Date(exam.createdDate).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="mt-8">
                    <h2 className="text-lg font-medium text-gray-900">Recent Users</h2>
                    <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
                        <ul className="divide-y divide-gray-200">
                            {recentUsers.map((user) => (
                                <li key={user._id}>
                                    <div className="px-4 py-4 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-blue-600 truncate">{user.name}</p>
                                                <p className="text-sm text-gray-500">Email: {user.email}</p>
                                                <p className="mt-1 text-sm text-gray-500">Status: <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusLabelColor(user.status)}`}>{user.status}</span></p>
                                                <p className="mt-1 text-sm text-gray-500">Join Date: {new Date(user.createdDate).toLocaleDateString()}</p>
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

export const AdminDashboardPage = () => (
    <InstructorProvider>
        <AdminDashboard />
    </InstructorProvider>
);