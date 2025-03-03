import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { ExamList } from "./pages/ExamList";
import { StudentDashboard } from "./pages/StudentDashboard";
import { InstructorDashboard } from "./pages/InstructorDashboard";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AdminApprovals } from "./pages/AdminApprovals";
import { ExamDetails } from "./pages/ExamDetails";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ExamUploadForm } from "./components/ExamUploadForm";
import { AuthProvider } from "./contexts/AuthContext";

export function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <div className="min-h-screen bg-gray-50 flex flex-col">
                    <Header />
                    <div className="flex-grow">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/signup" element={<SignupPage />} />
                            <Route path="/exams" element={<ExamList />} />
                            <Route path="/exam/:id" element={<ExamDetails />} />
                            <Route path="/dashboard/student/*" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
                            <Route path="/dashboard/instructor/*" element={<ProtectedRoute role="instructor"><InstructorDashboard /></ProtectedRoute>} />
                            <Route path="/dashboard/instructor/upload" element={<ProtectedRoute role="instructor"><ExamUploadForm onSubmit={function(data: FormData): Promise<void> { throw new Error("Function not implemented."); }} /></ProtectedRoute>} />
                            <Route path="/dashboard/admin/*" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
                            <Route path="/dashboard/admin/approvals" element={<ProtectedRoute role="admin"><AdminApprovals /></ProtectedRoute>} />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </AuthProvider>
        </BrowserRouter>
    );
}