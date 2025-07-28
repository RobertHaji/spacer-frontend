import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "How do I book a space?",
    answer:
      "Search for available spaces using the search bar, select your preferred space, choose your dates, and click the 'Book Now' button. You'll be guided through the checkout process.",
  },
  {
    question: "Can I cancel a booking?",
    answer:
      "Yes, you can cancel your booking from your dashboard. Refunds depend on the space’s cancellation policy.",
  },
  {
    question: "How do I list my space?",
    answer:
      "Sign in as a space owner and go to your dashboard. Click on 'Add New Listing' and fill in the required details including photos, availability, and pricing.",
  },
  {
    question: "Is payment secure?",
    answer:
      "Absolutely. We use secure payment providers to ensure your transactions are safe and encrypted.",
  },
  {
    question: "What if I need help during my booking?",
    answer:
      "Our support team is available 24/7. Use the contact form or live chat to get immediate assistance.",
  },
];

export default function Help() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#004c4c] mb-10 text-center">Help & FAQs</h1>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full px-6 py-4 flex justify-between items-center text-left text-[#0f7c7c] font-medium hover:bg-gray-100 transition"
              >
                {faq.question}
                <ChevronDown
                  className={`transform transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 py-4 text-sm text-gray-700 bg-gray-50">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center text-sm text-gray-600">
          Can't find what you're looking for?{" "}
          <Link to="/ContactUs" className="text-[#0f7c7c] font-medium hover:underline">
  Contact us
</Link>
        </div>
      </div>
    </div>
  );
}
