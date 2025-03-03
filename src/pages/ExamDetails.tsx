import { useState } from "react";
import { useParams } from "react-router-dom";
import { FileText, Download, Clock, CheckCircle } from "lucide-react";
import { DPOPaymentModal } from "../components/DPOPaymentModal";

const examDetailsData: { [key: string]: any } = {
  1: {
    id: 1,
    title: "Advanced Programming",
    department: "Computer Studies/ICT",
    level: "Core Unit",
    price: 1500,
    description: "Comprehensive examination covering advanced programming paradigms, data structures, and algorithms.",
    instructor: "Dr. John Smith",
    lastUpdated: "2023-08-15",
    topics: ["Object-Oriented Programming", "Design Patterns", "Algorithm Analysis", "Advanced Data Structures"],
    previewUrl: "path/to/preview.pdf"
  },
  2: {
    id: 2,
    title: "Introduction to Business",
    department: "Business Studies",
    level: "Basic Unit",
    price: 1200,
    description: "Fundamentals of business concepts, including management, marketing, and finance.",
    instructor: "Prof. Jane Doe",
    lastUpdated: "2023-07-20",
    topics: ["Management Principles", "Marketing Basics", "Financial Accounting", "Business Ethics"],
    previewUrl: "path/to/preview.pdf"
  },
  3: {
    id: 3,
    title: "Civil Engineering Basics",
    department: "Building and Civil Engineering",
    level: "Core Unit",
    price: 1800,
    description: "Introduction to civil engineering principles, including structural analysis and construction materials.",
    instructor: "Dr. Alan Brown",
    lastUpdated: "2023-06-10",
    topics: ["Structural Analysis", "Construction Materials", "Surveying", "Geotechnical Engineering"],
    previewUrl: "path/to/preview.pdf"
  },
  4: {
    id: 4,
    title: "Health Science Fundamentals",
    department: "Health Science",
    level: "Common Unit",
    price: 1300,
    description: "Basic concepts in health science, including human anatomy, physiology, and public health.",
    instructor: "Dr. Emily White",
    lastUpdated: "2023-05-05",
    topics: ["Human Anatomy", "Physiology", "Public Health", "Nutrition"],
    previewUrl: "path/to/preview.pdf"
  },
  5: {
    id: 5,
    title: "Fashion Design Principles",
    department: "Textile, Fashion Design and Cosmetology",
    level: "Core Unit",
    price: 2000,
    description: "Principles of fashion design, including textile selection, pattern making, and garment construction.",
    instructor: "Ms. Sarah Green",
    lastUpdated: "2023-04-15",
    topics: ["Textile Selection", "Pattern Making", "Garment Construction", "Fashion Illustration"],
    previewUrl: "path/to/preview.pdf"
  },
  6: {
    id: 6,
    title: "Automotive Engineering",
    department: "Mechanical and Automotive Engineering",
    level: "Core Unit",
    price: 1700,
    description: "Fundamentals of automotive engineering, including engine systems, vehicle dynamics, and maintenance.",
    instructor: "Mr. Michael Blue",
    lastUpdated: "2023-03-25",
    topics: ["Engine Systems", "Vehicle Dynamics", "Automotive Maintenance", "Electrical Systems"],
    previewUrl: "path/to/preview.pdf"
  }
};

export const ExamDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  if (!id) {
    return <div>Exam not found</div>;
  }

  const examDetails = examDetailsData[id];

  if (!examDetails) {
    return <div>Exam not found</div>;
  }

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-8 text-white">
            <h1 className="text-3xl font-bold mb-2">{examDetails.title}</h1>
            <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              {examDetails.department}
            </span>
              <span className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Updated {examDetails.lastUpdated}
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
                  <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt={examDetails.instructor}
                      className="h-12 w-12 rounded-full"
                  />
                  <div className="ml-4">
                    <div className="text-lg font-medium">{examDetails.instructor}</div>
                    <div className="text-gray-500">Senior Lecturer</div>
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
                  <div className="text-sm text-gray-500">One-time purchase</div>
                </div>
                <button
                    onClick={() => setShowPaymentModal(true)}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors mb-4"
                >
                  Purchase Now
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center">
                  <Download className="h-5 w-5 mr-2" />
                  Preview Sample
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
            examTitle={examDetails.title}
        />
      </div>
  );
};