import React from "react";
import { X } from "lucide-react";
type DPOPaymentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  examTitle: string;
};
export const DPOPaymentModal: React.FC<DPOPaymentModalProps> = ({
  isOpen,
  onClose,
  amount,
  examTitle
}) => {
  const handlePayment = async () => {
    // DPO Payment Integration
    const paymentData = {
      companyToken: "YOUR_COMPANY_TOKEN",
      amount: amount,
      currency: "KES",
      description: `Payment for ${examTitle}`,
      redirectUrl: window.location.origin + "/payment/callback"
    };
    try {
      // This would be replaced with actual DPO API call
      const response = await fetch("https://secure.3gdirectpay.com/payv2.php", {
        method: "POST",
        body: JSON.stringify(paymentData)
      });
      // Handle response and redirect to DPO payment page
      const data = await response.json();
      window.location.href = data.paymentUrl;
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-md w-full mx-4 relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-500 hover:text-gray-700">
          <X className="h-6 w-6" />
        </button>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Complete Payment
          </h2>
          <div className="mb-6">
            <p className="text-gray-600 mb-2">Exam: {examTitle}</p>
            <p className="text-2xl font-bold text-blue-600">KSH {amount}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">
              Payment Methods
            </h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <img src="https://www.directpay.online/wp-content/uploads/2020/01/mpesa-01.png" alt="M-Pesa" className="h-8" />
                <span className="ml-2">M-Pesa</span>
              </div>
              <div className="flex items-center">
                <img src="https://www.directpay.online/wp-content/uploads/2020/01/visa-01.png" alt="Visa" className="h-8" />
                <span className="ml-2">Credit/Debit Card</span>
              </div>
            </div>
          </div>
          <button onClick={handlePayment} className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors">
            Pay Now
          </button>
          <p className="mt-4 text-sm text-gray-500 text-center">
            Secured by DirectPay Online
          </p>
        </div>
      </div>
    </div>;
};