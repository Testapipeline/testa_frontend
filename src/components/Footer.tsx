import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-sm mb-4">
                    <Link to="/" className="text-2xl font-bold text-blue-600 mb-4">
                        TESTA
                    </Link>
                </p>
                <p className="text-center text-sm">
                    Secure examination revision content platform for students and instructors.
                </p>
                <p className="text-center text-sm mt-2">
                    <p>&copy; {new Date().getFullYear()} TESTA. All rights reserved</p>
                </p>
            </div>

            <div className="text-center flex justify-center space-x-4 mt-4">
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                    <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                    <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                    <Instagram className="h-5 w-5" />
                </a>
            </div>
        </footer>
    );
};