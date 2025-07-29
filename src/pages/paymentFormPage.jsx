import React, { useState } from 'react';
import { Phone, CheckCircle, CreditCard } from 'lucide-react';

const PaymentSelection = () => {
  const [selectedOption, setSelectedOption] = useState('M-Pesa');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePayment = () => {
    alert(`Initiating STK Push to ${phoneNumber} for Ksh. 2,860.00`);
  };

  const handleCheckPayment = () => {
    alert('Checking payment status...');
  };

  const paymentOptions = [
    { name: 'M-Pesa', icon: <CreditCard className="w-4 h-4 mr-2" /> },
    { name: 'Airtel Money', icon: <CreditCard className="w-4 h-4 mr-2" /> },
    { name: 'Pay with Equity', icon: <CreditCard className="w-4 h-4 mr-2" /> },
    { name: 'Pesalink', icon: <CreditCard className="w-4 h-4 mr-2" /> },
    { name: 'Bank Deposit', icon: <CreditCard className="w-4 h-4 mr-2" /> },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 bg-white shadow-xl rounded-xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-3">Payment Selection</h2>
      <p className="text-gray-600 mb-6">Please choose your preferred mode of payment</p>

      {/* Payment Options */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        {paymentOptions.map((option) => (
          <div
            key={option.name}
            onClick={() => setSelectedOption(option.name)}
            className={`flex items-center justify-center cursor-pointer px-4 py-3 rounded-lg border transition shadow-sm ${
              selectedOption === option.name
                ? 'border-green-600 bg-green-50 text-green-700 font-medium'
                : 'border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-700'
            }`}
          >
            {option.icon}
            {option.name}
          </div>
        ))}
      </div>

      {selectedOption === 'M-Pesa' && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* STK Push Section */}
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">STK Push</h3>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter Safaricom mobile number
            </label>
            <div className="relative mb-4">
              <input
                type="tel"
                placeholder="e.g. 0712345678"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <Phone className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
            <button
              onClick={handlePayment}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-md transition"
            >
              Pay 
            </button>
          </div>

          {/* Manual Paybill Section */}
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Pay using M-Pesa Paybill</h3>
            <ol className="list-decimal list-inside text-gray-700 space-y-1 text-sm mb-4">
              <li>Go to M-PESA on your phone</li>
              <li>Select Pay Bill option</li>
              <li>Enter Business no. <strong>6060047</strong></li>
              <li>Enter Account no. <strong>BL-HR-789955</strong></li>
              <li>Enter the Amount. <strong>KES 2,860.00</strong></li>
              <li>Enter your M-PESA PIN and Send</li>
              <li>You will receive a confirmation SMS from MPESA</li>
            </ol>
            <button
              onClick={handleCheckPayment}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-md transition"
            >
              <CheckCircle className="w-5 h-5" />
              Check Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentSelection;
