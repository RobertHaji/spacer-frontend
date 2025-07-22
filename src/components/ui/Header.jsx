import { Link } from "react-router-dom";
import { User } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-gradient-to-b from-[#004c4c] to-[#0f7c7c] text-white flex items-center justify-between p-4">
      <Link to="/" className="text-xl font-bold hover:text-yellow-300 transition duration-300">
        Spacer
      </Link>

      <div className="flex items-center space-x-6">
        <nav className="flex space-x-6 text-sm font-semibold">
          {[
            { label: "Category", path: "/category" },
            { label: "Sign Up", path: "/signup" },
            { label: "Login", path: "/login" },
          ].map((item) => (
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

        <Link to="/profile" className="ml-2 hover:scale-110 transition-transform duration-300">
          <User className="w-6 h-6 text-white hover:text-yellow-300 transition-colors duration-300" />
        </Link>
      </div>
    </header>
  );
}
