import React, { useState } from 'react';
import { FaPhoneAlt, FaCheckCircle } from 'react-icons/fa';
import bankImg from './icons/bank.png';
import equityImg from './icons/equity.png';
import mpesaImg from './icons/mpesa.png';
import airtelImg from './icons/airtel.png';
import pesalinkImg from './icons/pesalink.png';

const PaymentSelection = () => {
  const [selectedOption, setSelectedOption] = useState('M-Pesa');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePayment = () => {
    alert(`Initiating STK Push to ${phoneNumber}`);
  };

  const handleCheckPayment = () => {
    alert('Checking payment status...');
  };

  const paymentOptions = [
    { label: 'M-Pesa', img: mpesaImg },
    { label: 'Airtel Money', img: airtelImg },
    { label: 'Pay with Equity', img: equityImg },
    { label: 'Pesalink', img: pesalinkImg },
    { label: 'Bank Deposit', img: bankImg },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 bg-white shadow-xl rounded-xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-3">Payment Selection</h2>
      <p className="text-gray-600 mb-6">Please choose your preferred mode of payment</p>

      {/* Payment Options */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        {paymentOptions.map((option) => (
          <div
            key={option.label}
            onClick={() => setSelectedOption(option.label)}
            className={`flex items-center gap-2 justify-center cursor-pointer px-4 py-3 rounded-lg border transition shadow-sm ${
              selectedOption === option.label
                ? 'border-green-600 bg-green-50 text-green-700 font-semibold'
                : 'border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-700'
            }`}
          >
            <img src={option.img} alt={option.label} className="h-18 w-17" />
            {option.label}
          </div>
        ))}
      </div>

      {/* M-Pesa Section */}
      {selectedOption === 'M-Pesa' && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* STK Push */}
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
              <FaPhoneAlt className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
            <button
              onClick={handlePayment}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-md transition flex items-center justify-center gap-2"
            >
              <FaCheckCircle />
              Pay 
            </button>
          </div>

          {/* Manual Paybill */}
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Pay using M-Pesa Paybill</h3>
            <ol className="list-decimal list-inside text-gray-700 space-y-1 text-sm mb-4">
              <li>Go to M-PESA on your phone</li>
              <li>Select Pay Bill option</li>
              <li>
                Enter Business no. <strong></strong>
              </li>
              <li>
                Enter Account no. <strong></strong>
              </li>
              <li>
                Enter the Amount. <strong></strong>
              </li>
              <li>Enter your M-PESA PIN and Send</li>
              <li>You will receive a confirmation SMS from MPESA</li>
            </ol>
            <button
              onClick={handleCheckPayment}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-md transition"
            >
              <FaCheckCircle className="w-5 h-5" />
              Check Payment
            </button>
          </div>
        </div>
      )}

      {/* Powered by */}
      <div className="mt-8 text-right">
        <span className="text-gray-500 text-sm">Powered by:</span>
        <img src="/src/components/spacers-logo.png" alt="Spacers" className="inline h-12 ml-8" />
      </div>
    </div>
  );
};

export default PaymentSelection;
