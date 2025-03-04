import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "./DashboardLayout.tsx";

export const InstructorSettings = () => {
    const navigate = useNavigate();

    const handleDeleteAccount = async () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            try {
                navigate("/");
            } catch (error) {
                console.error("Failed to delete account:", error);
            }
        }
    };

    return (
        <DashboardLayout>
            <div className="flex items-center justify-center h-full">
                <div className="p-4">
                    <div className="flex justify-center">
                        <div className="text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                            <p className="mb-4">
                                Warning: Deleting your account is a permanent action and cannot be undone.
                            </p>
                            <button
                                onClick={handleDeleteAccount}
                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};