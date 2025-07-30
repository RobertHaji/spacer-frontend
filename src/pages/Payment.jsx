import React, { useState, useEffect, useRef } from "react";
import { FaPhoneAlt, FaCheckCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import bankImg from "./icons/bank.png";
import equityImg from "./icons/equity.png";
import mpesaImg from "./icons/mpesa.png";
import airtelImg from "./icons/airtel.png";
import pesalinkImg from "./icons/pesalink.png";

let toastId = null;
let intervalId = null;

const PaymentSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking } = location.state || {};

  const [selectedOption, setSelectedOption] = useState("M-Pesa");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const pendingBooking = JSON.parse(localStorage.getItem("pendingBooking"));
  const [amount, setAmount] = useState(pendingBooking?.amount);

  useEffect(() => {
    const bookingData = JSON.parse(localStorage.getItem("pendingBooking"));
    if (bookingData && bookingData.amount) {
      setAmount(bookingData.amount);
    } else {
      console.warn("No booking data found in localStorage.");
      navigate("/");
    }

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, [booking, navigate]);

  const handleInitiatePayment = () => {

    const token = localStorage.getItem("session")
    if (!phoneNumber) {
      toast.error("Please enter your phone number");
      return;
    }

    const formattedPhone = phoneNumber.startsWith("0")
      ? "254" + phoneNumber.slice(1)
      : phoneNumber;

    toastId = toast.loading("Initiating STK push...");

    fetch(`http://127.0.0.1:5000/payments`, {
      method: "POST",
      body: JSON.stringify({
        paying_phone: formattedPhone,
        amount: pendingBooking.amount,
        description: `Payment for ${pendingBooking.space_name}`,
        mpesa_code: `TEMP-${Date.now()}`,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        toast.loading("Confirming payment...", { id: toastId });

        const checkoutID = data.data?.CheckoutRequestID;
        if (!checkoutID) {
          toast.error("Invalid response from server", { id: toastId });
          return;
        }

        intervalRef.current = setInterval(() => {
          handleCheckPayment(checkoutID);
        }, 10_000);

        timeoutRef.current = setTimeout(() => {
          clearInterval(intervalRef.current);
          toast("Still waiting for payment confirmation...");
        }, 180_000);
      })
      .catch((err) => {
        console.error(err);
        toast.error("STK Push failed", { id: toastId });
      });
  };

  const handleCheckPayment = (checkoutID) => {
    fetch(`http://127.0.0.1:5000/payments/${checkoutID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const status = data?.payment_status;

        if (status === "paid") {
          clearInterval(intervalRef.current);
          clearTimeout(timeoutRef.current);
          toast.success("Payment successful!", { id: toastId })
        }
        else if (status !== "pending") {
          clearInterval(intervalRef.current);
          clearTimeout(timeoutRef.current);
          toast.error("Payment not successful", { id: toastId });
        }
      })
      .catch((err) => {
        console.error("Error checking payment:", err);
      });
  };
  

  const paymentOptions = [
    { label: "M-Pesa", img: mpesaImg },
    { label: "Airtel Money", img: airtelImg },
    { label: "Pay with Equity", img: equityImg },
    { label: "Pesalink", img: pesalinkImg },
    { label: "Bank Deposit", img: bankImg },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 bg-white shadow-xl rounded-xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-3">
        Payment Selection
      </h2>
      <p className="text-gray-600 mb-6">
        Please choose your preferred mode of payment
      </p>

      <div className="mb-6 text-sm text-gray-700">
        {/* <p>
          <strong>Booking ID:</strong> {pendingBooking?.id}
        </p> */}
        <p>
          <strong>Space Name:</strong> {pendingBooking?.space_name}
        </p>
        <p>
          <strong>Amount:</strong> KES {pendingBooking?.amount}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        {paymentOptions.map((option) => (
          <div
            key={option.label}
            onClick={() => setSelectedOption(option.label)}
            className={`flex items-center gap-2 justify-center cursor-pointer px-4 py-3 rounded-lg border transition shadow-sm ${
              selectedOption === option.label
                ? "border-green-600 bg-green-50 text-green-700 font-semibold"
                : "border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-700"
            }`}
          >
            <img src={option.img} alt={option.label} className="h-12 w-12" />
            {option.label}
          </div>
        ))}
      </div>

      {selectedOption === "M-Pesa" && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              STK Push
            </h3>
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
              onClick={handleInitiatePayment}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-md transition flex items-center justify-center gap-2"
            >
              <FaCheckCircle />
              Pay
            </button>
          </div>

          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Pay using M-Pesa Paybill
            </h3>
            <ol className="list-decimal list-inside text-gray-700 space-y-1 text-sm mb-4">
              <li>Go to M-PESA on your phone</li>
              <li>Select Pay Bill option</li>
              <li>
                Enter Business no. <strong>Coming soon...</strong>
              </li>
              <li>
                Enter Account no. <strong>-{pendingBooking?.id}</strong>
              </li>
              <li>
                Enter the Amount. <strong>{pendingBooking?.amount}</strong>
              </li>
              <li>Enter your M-PESA PIN and Send</li>
              <li>You will receive a confirmation SMS from MPESA</li>
            </ol>
          </div>
        </div>
      )}

      <div className="mt-8 text-right">
        <span className="text-gray-500 text-sm">Powered by:</span>
        <img
          src="/src/components/spacers-logo.png"
          alt="Spacers"
          className="inline h-12 ml-8"
        />
      </div>
    </div>
  );
};

export default PaymentSelection;
