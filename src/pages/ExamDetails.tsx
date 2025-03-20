import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {FileText, Clock, CheckCircle, ShieldUser} from "lucide-react";
import { DPOPaymentModal } from "../components/DPOPaymentModal";
import { useExam } from "../contexts/ExamContext";

export const ExamDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { getApprovedExamByExamId } = useExam();
  const [examDetails, setExamDetails] = useState<any>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    const fetchExamDetails = async () => {
      if (id) {
        const decodedId = atob(id);
        const exam = await getApprovedExamByExamId(decodedId);
        setExamDetails(exam);
      }
    };
    fetchExamDetails();
  }, [id, getApprovedExamByExamId]);

  if (!examDetails) {
    return <div>Loading...</div>;
  }

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20 mb-5">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-8 text-white">
            <h1 className="text-3xl font-bold mb-2">{examDetails.name}</h1>
            <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              {examDetails.department}
            </span>
              <span className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Updated {examDetails.createdDate}
            </span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 p-6">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-gray-600">{examDetails.description}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4">Topics Covered</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {examDetails.topics.map((topic: string, index: number) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        {topic}
                      </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4">Instructor</h2>
                <div className="flex items-center">
                  <ShieldUser className="h-12 w-12 text-gray-500" />
                  <div className="ml-4">
                    <div className="text-lg font-medium">{examDetails.author}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900">
                    KSH {examDetails.price}
                  </div>
                </div>
                <button
                    onClick={() => setShowPaymentModal(true)}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors mb-4"
                >
                  Purchase Now
                </button>
                <div className="mt-6 space-y-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Instant digital access
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Verified content
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    24/7 support
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DPOPaymentModal
            isOpen={showPaymentModal}
            onClose={() => setShowPaymentModal(false)}
            amount={examDetails.price}
            examTitle={examDetails.name}
        />
      </div>
  );
};