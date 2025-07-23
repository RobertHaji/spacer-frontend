import { Card } from "@/components/ui/card";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header"; 
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CategoryPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/categories") // fetches data from backend
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0f535c] to-[#20afc2] text-white p-6">
      <Header />
      <main className="flex flex-1 px-6 gap-5">
        <h1 className="text-3xl font-bold mb-6">Categories</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link to={`/spaces/${cat.id}`} key={cat.id}>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg hover:bg-opacity-20 transition">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-32 object-cover rounded"
                />
                <p className="mt-2 text-center text-white font-medium">
                  {cat.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}


export default CategoryPage;










