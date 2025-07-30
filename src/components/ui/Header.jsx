import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Menu } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "Category", path: "/category" },
    { label: "Sign Up", path: "/signup" },
    { label: "Login", path: "/login" },
  ];

  return (
    <header className="bg-gradient-to-b from-[#004c4c] to-[#0f7c7c] text-white p-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/spacesPage" className="flex items-center text-xl font-bold">
          <img
            src="src/components/spacers-logo.png"
            alt="Spacer Logo"
            className="h-10 w-10 mr-2"
          />
          <span className="text-lg md:text-xl font-bold">Spacer</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold">
          {navLinks.map((item) => (
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
          <Link
            to="/profile"
            className="ml-2 hover:scale-110 transition-transform duration-300"
          >
            <User className="w-6 h-6 text-white hover:text-yellow-300 transition-colors duration-300" />
          </Link>
        </nav>

        {/* Hamburger Icon for Mobile */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-3 text-sm font-semibold">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className="block px-2 py-1 hover:bg-white/10 rounded"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/profile"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center px-2 py-1 hover:bg-white/10 rounded"
          >
            <User className="w-5 h-5 mr-1" /> Profile
          </Link>
        </div>
      )}
    </header>
  );
}
