import { useState } from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="bg-gradient-to-b from-[#004c4c] to-[#0f7c7c] text-white flex items-center justify-between p-4 relative">
      <Link to="/" className="flex items-center">
        <img
          src="src/components/spacers-logo.png"
          alt="Spacer Logo"
          className="text-3xl font-bold hover:text-yellow-300 transition duration-300 h-18 w-17"
        />
      </Link>

      <div className="flex items-center space-x-6 relative">
        <nav className="flex space-x-6 text-sm font-semibold">
          {[{ label: "Category", path: "/category" }].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="relative group transition-all duration-300 ease-in-out"
            >
              <span className="group-hover:text-yellow-300 group-hover:scale-105 transform transition duration-300">
                {item.label}
              </span>
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-300 transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Profile Icon */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="ml-2 hover:scale-110 transition-transform duration-300 focus:outline-none"
          >
            <User className="w-6 h-6 text-white hover:text-yellow-300 transition-colors duration-300" />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg z-50 w-40">
              <Link
                to="/login"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

