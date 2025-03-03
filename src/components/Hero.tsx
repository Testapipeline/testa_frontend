import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/1.jpg";

export const Hero = () => {
  return (
      <div className="relative bg-cover bg-center bg-no-repeat mt-16" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 bg-white bg-opacity-85">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1>
              <span className="block text-sm font-semibold uppercase tracking-wide text-blue-600">
                Welcome to TESTA
              </span>
                <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                <span className="block text-gray-900">Your Path to</span>
                <span className="block text-blue-600">Exam Success</span>
              </span>
              </h1>
              <p className="mt-3 text-base text-gray-800 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Access quality examination materials across various departments.
                Join thousands of students achieving their academic goals with
                TESTA.
              </p>
              <div className="mt-8 space-y-4">
                {["Verified exam papers", "Expert instructors", "Instant access"].map(feature => (
                    <div key={feature} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="ml-2 text-gray-700">{feature}</span>
                    </div>
                ))}
              </div>
              <div className="mt-8 sm:flex sm:justify-center lg:justify-start space-x-4">
                <Link to="/signup" className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link to="/login" className="inline-flex items-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};