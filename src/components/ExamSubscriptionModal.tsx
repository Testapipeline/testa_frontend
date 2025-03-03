import React from "react";
import { X } from "lucide-react";
type SubscriptionPlan = {
  id: string;
  name: string;
  price: number;
  features: string[];
  duration: string;
};
type ExamSubscriptionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: (planId: string) => void;
};
export const ExamSubscriptionModal: React.FC<ExamSubscriptionModalProps> = ({
  isOpen,
  onClose,
  onSubscribe
}) => {
  const plans: SubscriptionPlan[] = [{
    id: "basic",
    name: "Basic Plan",
    price: 1000,
    duration: "1 Month",
    features: ["Access to Basic Units", "Download 5 papers per month", "Email support"]
  }, {
    id: "premium",
    name: "Premium Plan",
    price: 2500,
    duration: "3 Months",
    features: ["Access to all Units", "Unlimited downloads", "Priority support", "Early access to new papers"]
  }];
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-500 hover:text-gray-700">
          <X className="h-6 w-6" />
        </button>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Choose Your Subscription Plan
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {plans.map(plan => <div key={plan.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900">
                  {plan.name}
                </h3>
                <p className="text-3xl font-bold text-blue-600 mt-2">
                  KSH {plan.price}
                  <span className="text-sm text-gray-500 font-normal">
                    /{plan.duration}
                  </span>
                </p>
                <ul className="mt-4 space-y-2">
                  {plan.features.map((feature, index) => <li key={index} className="flex items-center text-gray-600">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>)}
                </ul>
                <button onClick={() => onSubscribe(plan.id)} className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                  Subscribe Now
                </button>
              </div>)}
          </div>
        </div>
      </div>
    </div>;
};