import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import ProfileModal from "./ui/Profile";
import toast from "react-hot-toast";

export default function AdminHeader() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const isAuthenticated =
    !!localStorage.getItem("session") && !!localStorage.getItem("userid");

  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("session");
    localStorage.removeItem("userid");

    toast.success("Signed out successfully", {
      duration: 2000,
      position: "top-center",
    });

    navigate("/");
  };

  return (
    <>
      <header className="bg-gradient-to-b from-[#004c4c] to-[#0f7c7c] text-white flex items-center justify-between p-4">
     <Link to="/" className="flex items-center">
          <img
            src="src/components/spacers-logo.png"
            alt="Spacer Logo"
            className="text-3xl font-bold hover:text-yellow-300 transition duration-300: h-18 w-17"
          />
      </Link>
       

        <div className="flex items-center space-x-6">
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

          <div>
            <button
              onClick={() => setIsProfileOpen(true)}
              className="ml-2 hover:scale-110 transition-transform duration-300"
            >
              <User className="w-6 h-6 text-white hover:text-yellow-300 transition-colors duration-300" />
            </button>
            {isAuthenticated && (
              <button
                onClick={handleSignOut}
                className="hover:scale-110 transition-transform duration-300"
                title="Sign Out"
              >
                <LogOut className="w-6 h-6 text-white hover:text-yellow-300 transition-colors duration-300" />
              </button>
            )}
          </div>
        </div>
      </header>
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </>
  );
}
