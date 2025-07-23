import { useState } from "react";
import SpaceForm from "../components/SpaceForm";
import CartegoryForm from "@/components/category-form";
import AdminUser from "../components/AdminUsers";

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation */}
      <header className="bg-[#1f2937] text-white p-4 text-xl font-semibold shadow-md">
        Admin Page
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-[#374151] text-white p-4 space-y-4">
          <nav className="flex flex-col space-y-4 text-sm">
            <button
              onClick={() => setActiveSection("dashboard")}
              className={`text-left px-3 py-2 rounded-md ${
                activeSection === "dashboard"
                  ? "bg-[#4b5563] font-bold"
                  : "hover:bg-[#4b5563]"
              }`}
            >
              🏠 Dashboard
            </button>
            <button
              onClick={() => setActiveSection("spaceform")}
              className={`text-left px-3 py-2 rounded-md ${
                activeSection === "spaceform"
                  ? "bg-[#4b5563] font-bold"
                  : "hover:bg-[#4b5563]"
              }`}
            >
              📝 SpaceForm
            </button>
            <button
              onClick={() => setActiveSection("categoryform")}
              className={`text-left px-3 py-2 rounded-md ${
                activeSection === "categoryform"
                  ? "bg-[#4b5563] font-bold"
                  : "hover:bg-[#4b5563]"
              }`}
            >
              📝 CategoryForm
            </button>
            <button
              onClick={() => setActiveSection("users")}
              className={`text-left px-3 py-2 rounded-md ${
                activeSection === "users"
                  ? "bg-[#4b5563] font-bold"
                  : "hover:bg-[#4b5563]"
              }`}
            >
              🚻 List of Users
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100">
          {activeSection === "dashboard" && (
            <div className="space-y-6">
              {/* Greeting */}
              <h1 className="text-2xl font-bold text-gray-800">
                Welcome back, Admin 👋
              </h1>

              {/* Dashboard Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h2 className="text-gray-500 text-sm font-medium">
                    Total Spaces
                  </h2>
                  <p className="text-3xl font-bold text-indigo-600">12</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h2 className="text-gray-500 text-sm font-medium">Users</h2>
                  <p className="text-3xl font-bold text-green-600">56</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h2 className="text-gray-500 text-sm font-medium">
                    Bookings
                  </h2>
                  <p className="text-3xl font-bold text-red-600">89</p>
                </div>
              </div>

              {/* Recent Activity */}
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

              {/* Chart Placeholder */}
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
        </main>
      </div>
    </div>
  );
}
