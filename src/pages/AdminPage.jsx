import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import SpaceForm from "../components/SpaceForm";
import CartegoryForm from "@/components/category-form";
import AdminUser from "../components/AdminUsers";
import DashboardStats from "@/components/ui/DashboardStats";
// import { SpacesPage } from "./SpacesPage";
import ImageForm from "@/components/ImageForm";
import AdminHeader from "@/components/adminsHeader";
import Footer from "@/components/ui/Footer";
import { Menu } from "lucide-react";
import { AllSpaces } from "@/components/AllSpaces";

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [adminName, setAdminName] = useState("Admin");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminName = async () => {
      const userid = localStorage.getItem("userid");
      const session = localStorage.getItem("session");

      if (userid && session) {
        try {
          const response = await fetch(
            `http://spacer-backend-production.up.railway.app/users/${userid}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session}`,
              },
            }
          );
          const result = await response.json();
          setAdminName(result.name || "Admin");
        } catch {
          setAdminName("Admin");
        }
      } else {
        navigate("/login");
      }
    };

    fetchAdminName();
  }, [navigate]);

  useEffect(() => {
    const session = localStorage.getItem("session");
    const role = localStorage.getItem("role");

    if (!session || role !== "admin") {
      navigate("/login");
    }
  }, [navigate]);

  const handleSignOut = () => {
    setIsSigningOut(true);
    try {
      localStorage.removeItem("session");
      localStorage.removeItem("role");
      localStorage.removeItem("userid");

      toast.success("Signed out successfully");
      navigate("/");
    } catch {
      toast.error("Failed to sign out. Please try again.");
      setIsSigningOut(false);
    }
  };

  const navLinks = [
    { id: "dashboard", label: "🏠 Dashboard" },
    { id: "spaceform", label: "📝 SpaceForm" },
    { id: "categoryform", label: "📝 CategoryForm" },
    { id: "users", label: "🚻 List of Users" },
    { id: "spaces", label: "🗂️ All Spaces" },
    { id: "imageform", label: "🖼️ Image Form" },
  ];

  return (
    <>
      <AdminHeader />
      <div className="min-h-screen flex flex-col">
        {/* Top Bar */}
        <header className="bg-[#1f2937] text-white p-4 flex items-center justify-between shadow-md">
          <span className="text-xl font-semibold">Admin Page</span>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden focus:outline-none"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        <div className="flex flex-1">
          {/* Sidebar */}
          <aside
            className={`${
              sidebarOpen ? "block" : "hidden"
            } md:block w-full md:w-64 bg-[#374151] text-white p-4 space-y-4 md:space-y-6 fixed md:relative z-50 top-16 left-0 md:top-0 h-screen md:h-auto overflow-y-auto`}
          >
            <nav className="flex flex-col space-y-4 text-sm">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveSection(link.id);
                    setSidebarOpen(false); // auto-close on mobile
                  }}
                  className={`text-left px-3 py-2 rounded-md ${
                    activeSection === link.id
                      ? "bg-[#4b5563] font-bold"
                      : "hover:bg-[#4b5563]"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={handleSignOut}
                disabled={isSigningOut}
                className={`text-left px-3 py-2 rounded-md hover:bg-[#c1121f] ${
                  isSigningOut ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                🚪 {isSigningOut ? "Signing Out..." : "Sign Out"}
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6 bg-gray-100 mt-16 md:mt-0 md:ml-0">
            {activeSection === "dashboard" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-800">
                  Welcome back Admin, {adminName}
                </h1>
                <DashboardStats />
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Recent Activity
                  </h2>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>📌 New space added: "Tech Hub" - 2 hours ago</li>
                    <li>👤 New user registered: Jane Doe - 4 hours ago</li>
                    <li>📅 Booking confirmed for "Meeting Room B" - 1 day ago</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Bookings Overview
                  </h2>
                  <div className="h-48 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                    📈 Chart coming soon...
                  </div>
                </div>
              </div>
            )}
            {activeSection === "spaceform" && <SpaceForm />}
            {activeSection === "categoryform" && <CartegoryForm />}
            {activeSection === "users" && <AdminUser />}
            {activeSection === "spaces" && <AllSpaces isAdmin={true} />}
            {activeSection === "imageform" && <ImageForm />}
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
