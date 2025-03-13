import { useState, useEffect } from "react";
import { DashboardLayout } from "./DashboardLayout.tsx";
import { useNavigate } from "react-router-dom";

interface Exam {
    id: number;
    title: string;
    department: string;
}

export const MyExams = () => {
    const [boughtExams, setBoughtExams] = useState<Exam[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch bought exams from the backend or local storage
        const fetchBoughtExams = async () => {
            // Simulate fetching data
            const exams: Exam[] = [
                { id: 1, title: "Advanced Mathematics", department: "Mathematics" },
                { id: 2, title: "Physics", department: "Science" }
            ];
            setBoughtExams(exams);
        };

        fetchBoughtExams();
    }, []);

    const handleViewExam = (id: number) => {
        navigate(`/exam/${id}`);
    };

    return (
        <DashboardLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20 mb-5">
                <h2 className="text-2xl font-bold text-gray-900">My Exams</h2>
                <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                        {boughtExams.map(exam => (
                            <li key={exam.id}>
                                <div className="px-4 py-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-blue-600 truncate">{exam.title}</p>
                                            <p className="mt-1 text-sm text-gray-500">{exam.department}</p>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <button
                                                onClick={() => handleViewExam(exam.id)}
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
        </DashboardLayout>
    );
};