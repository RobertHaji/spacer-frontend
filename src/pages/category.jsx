import { Card } from "@/components/ui/card";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5001/categories") // fetches data from backend
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleDelete = (id) => {
     if (confirm("Are you sure you want to delete this category?")) {
       fetch(`http://localhost:5001/categories/${id}`, {                    // deletes category by id
         method: "DELETE",
       })
         .then((res) => {
           if (res.ok) {
             setCategories(categories.filter((cat) => cat.id !== id));   // filters out the deleted category from the db
             alert("Category deleted");
           }
         })
         .catch((err) => console.error("Error deleting category:", err));
     }
   };

   const handleEdit = (id) => {
     navigate(`/categories/edit/${id}`); // redirects the admin to category form so they may edit a category
   };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0f535c] to-[#20afc2] text-white p-6">
        <main className="flex flex-1 px-6 gap-5">
          <h1 className="text-3xl font-bold mb-6 text-center">Categories</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link to="/SpacesPage/" state={{ category: cat.name }} key={cat.id}>
                <div className="cursor-pointer transition-all transform hover:scale-105 hover:shadow-[0_0_12px_rgba(255,255,255,0.3)] bg-transparent text-white overflow-hidden rounded-xl border border-white/20">
                  <img
                    src={cat.image_url}
                    alt={cat.name}
                    className="w-full h-32 object-cover rounded"
                  />
                  <p className="mt-2 text-center text-white font-medium">
                    {cat.name}
                  </p>

                  {localStorage.getItem("role") === "admin" && (
                    <div className="flex justify-center gap-2 mt-2 mb-3">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleEdit(cat.id);
                        }}
                        className="px-3 py-1 rounded bg-teal-500 hover:bg-teal-600 text-white text-sm shadow transition-all"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(cat.id);
                        }}
                      
                        className="px-3 py-1 rounded bg-rose-500 hover:bg-rose-600 text-white text-sm shadow transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default CategoryPage;
