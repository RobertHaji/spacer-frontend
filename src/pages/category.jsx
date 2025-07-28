import { Card } from "@/components/ui/card";
import Footer from "@/components/ui/Footer";
import AdminHeader from "@/components/adminsHeader";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/categories")  // fetches data from backend
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

 const handleDelete = (id) => {
   const token = localStorage.getItem("session");

   if (!token) {
     alert("Unauthorized. Please log in as admin.");
     return;
   }

   if (window.confirm("Are you sure you want to delete this category?")) {
     fetch(`http://localhost:5000/categories/${id}`, {                                    // deletes category by id
       method: "DELETE",
       headers: {
         Authorization: `Bearer ${token}`,
       },
     })
       .then((res) => {
         if (res.ok) {
           setCategories(categories.filter((cat) => cat.id !== id));              // filters out the deleted category from the db
           alert("Category deleted");
         } else {
           alert("Failed to delete category. Check your permissions.");
         }
       })
       .catch((err) => console.error("Error deleting category:", err));
   }
 };

  const handleEdit = (category) => {
    navigate("/category-form", { state: { category } });                  
  };

  return (
    <>
      <AdminHeader />
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0f535c] to-[#20afc2] text-white p-6">
        <main className="flex flex-1 flex-col px-6 gap-5">
          <h1 className="text-3xl font-bold mb-6 text-center">Categories</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="cursor-pointer transition-all transform hover:scale-105 hover:shadow-[0_0_12px_rgba(255,255,255,0.3)] bg-transparent text-white overflow-hidden rounded-xl border border-white/20"
              >
                <Link
                  to="/SpacesPage/"
                  state={{ category: cat.name }}
                  className="block"
                >
                  <img
                    src={cat.image_url}
                    alt={cat.name}
                    className="w-full h-42 object-cover rounded"
                  />
                  <p className="mt-2 text-center text-white font-medium">
                    {cat.name}
                  </p>
                </Link>

                {localStorage.getItem("role") === "admin" && (
                  <div className="flex justify-center gap-2 mt-2 mb-3">
                    <button
                      onClick={() => handleEdit(cat)}
                      className="px-3 py-1 rounded bg-teal-500 hover:bg-teal-600 text-white text-sm shadow transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="px-3 py-1 rounded bg-rose-500 hover:bg-rose-600 text-white text-sm shadow transition-all"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default CategoryPage;
