import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

interface EmailVerificationProps {
    email: string;
    onVerify: (code: string) => void;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({ email, onVerify }) => {
    const { sendVerificationCode } = useAuth();
    const [code, setCode] = useState(["", "", "", ""]);
    const [timer, setTimer] = useState(30);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (/^[0-9]$/.test(value) || value === "") {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);
            if (value && index < 3) {
                const nextInput = document.getElementById(`code-input-${index + 1}`);
                if (nextInput) {
                    nextInput.focus();
                }
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onVerify(code.join(""));
    };

    const handleResendOTP = async () => {
        try {
            const message = await sendVerificationCode(email);
            setSuccess(message);
            setTimer(30);
            setTimeout(() => setSuccess(""), 3000);
        } catch (err: any) {
            setError(err.message);
            setTimeout(() => setError(""), 3000);
        }
    };

    return (
        <>
            <p className="text-center text-lg text-gray-600 mb-4">
                Verification code is sent to the email <strong>{email}</strong>
            </p>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="flex space-x-2 justify-center mb-4">
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            id={`code-input-${index}`}
                            type="text"
                            maxLength={1}
                            className="w-12 h-12 text-center border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                        />
                    ))}
                </div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Verify Email
                </button>
            </form>
            <div className="mt-6 text-center">
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
                {timer > 0 ? (
                    <p className="text-sm text-gray-600">Didn't receive code? Resend OTP in {timer} seconds</p>
                ) : (
                    <button
                        onClick={handleResendOTP}
                        className="text-sm font-medium text-blue-600 hover:text-blue-500"
                    >
                        Resend OTP
                    </button>
                )}
            </div>
        </>
    );
};

export default EmailVerification;