import { User } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-gradient-to-b from-[#004c4c] to-[#0f7c7c] text-white flex items-center justify-between p-4 relative">
      <h1 className="text-xl font-bold">Spacer</h1>

      <div className="relative" ref={dropdownRef}>
        <button onClick={() => setOpen(!open)}>
          <User className="w-6 h-6 text-white" />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-36 bg-white text-gray-800 rounded shadow-lg z-20">
            <ul className="py-2 text-sm">
              <li>
                <a href="/login" className="block px-4 py-2 hover:bg-gray-100">
                  Login
                </a>
              </li>
              <li>
                <a href="/signup" className="block px-4 py-2 hover:bg-gray-100">
                  Signup
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
