import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#004c4c] to-[#0f7c7c] flex items-center justify-center px-4 py-16">
      <div className="max-w-5xl w-full bg-white/10 backdrop-blur-md text-white rounded-xl shadow-xl grid md:grid-cols-2 p-6 md:p-10 space-y-6 md:space-y-0 md:gap-10">
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-3xl font-bold">Get in Touch</h2>

          {/* Input Group */}
          {["name", "email", "message"].map((field) => (
            <div key={field} className="relative">
              {field === "message" ? (
                <textarea
                  name="message"
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border border-white/40 rounded-md px-3 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-white placeholder-transparent"
                  placeholder="Your Message"
                />
              ) : (
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border border-white/40 rounded-md px-3 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-white placeholder-transparent"
                  placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                />
              )}
              <label
                htmlFor={field}
                className="absolute left-3 top-2 text-xs text-white/70 transition-all duration-200"
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
            </div>
          ))}

          <button
            type="submit"
            className="bg-white text-[#004c4c] font-semibold px-4 py-2 rounded-md hover:bg-gray-200 transition"
          >
            Send Message
          </button>

          {sent && (
            <p className="text-green-300 text-sm text-center">
              ✅ Message sent successfully!
            </p>
          )}
        </form>

        {/* Contact Info */}
        <div className="flex flex-col justify-center space-y-6">
          <h2 className="text-2xl font-semibold">Contact Information</h2>

          <div className="flex items-start gap-4">
            <Mail className="text-white" />
            <div>
              <p className="text-sm">Email</p>
              <p className="font-medium">support@spacerapp.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Phone className="text-white" />
            <div>
              <p className="text-sm">Phone</p>
              <p className="font-medium">+254 712 345 678</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <MapPin className="text-white" />
            <div>
              <p className="text-sm">Location</p>
              <p className="font-medium">Nairobi, Kenya</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
