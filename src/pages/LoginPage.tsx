import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import EmailVerification from "../components/EmailVerification";
import PasswordReset from "../components/PasswordReset";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, user, resetPassword, sendVerificationCode, verifyOTP } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      navigate(`/dashboard/${user.role}`);
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      setError("Invalid email or password");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleForgotPassword = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setError("Please fill the Email Address");
      setTimeout(() => setError(""), 3000);
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      setTimeout(() => setError(""), 3000);
      return;
    }
    try {
      const message = await sendVerificationCode(email);
      setSuccess(message);
      setShowEmailVerification(true);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message);
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleEmailVerification = async (code: string) => {
    try {
      const message = await verifyOTP(email, code);
      setSuccess(message);
      setShowEmailVerification(false);
      setShowPasswordReset(true);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message);
      setTimeout(() => setError(""), 3000);
    }
  };

  const handlePasswordReset = async (newPassword: string) => {
    try {
      const message = await resetPassword(email, newPassword);
      setSuccess(message);
      setTimeout(() => setSuccess(""), 3000);
      navigate("/");
    } catch (error: any) {
      setError(error.message);
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 mt-20 mb-5">
        {!showEmailVerification && !showPasswordReset && (
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign in to your account
              </h2>
              <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 mx-4 sm:mx-6 lg:mx-8">
                  {error && (
                      <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                      </div>
                  )}
                  {success && (
                      <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                        {success}
                      </div>
                  )}
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <input
                          id="email"
                          type="email"
                          required
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <div className="mt-1 relative">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            required
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <button
                          type="submit"
                          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Sign in
                      </button>
                    </div>
                  </form>
                  <div className="mt-6">
                    <div className="text-sm text-center">
                      <button
                          onClick={handleForgotPassword}
                          className="font-medium text-blue-600 hover:text-blue-500"
                      >
                        Forgot your password?
                      </button>
                    </div>
                    <div className="mt-2 text-sm text-center">
                      <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                        Don't have an account? Sign up
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )}
        {showEmailVerification && (
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Email Verification
              </h2>
              <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 mx-4 sm:mx-6 lg:mx-8">
                  {error && (
                      <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                      </div>
                  )}
                  {success && (
                      <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                        {success}
                      </div>
                  )}
                  <EmailVerification email={email} onVerify={handleEmailVerification} />
                </div>
              </div>
            </div>
        )}
        {showPasswordReset && (
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Change Password
              </h2>
              <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 mx-4 sm:mx-6 lg:mx-8">
                  {error && (
                      <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                      </div>
                  )}
                  {success && (
                      <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                        {success}
                      </div>
                  )}
                  <PasswordReset onReset={handlePasswordReset} />
                </div>
              </div>
            </div>
        )}
      </div>
  );
};