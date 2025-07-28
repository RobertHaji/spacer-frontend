import React, { useEffect, useState } from "react";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import SearchBar from "@/components/SearchBar";
import { Link } from "react-router-dom";

const backgroundImages = [
  "https://images.unsplash.com/photo-1603425013520-e0b30e6e37dc?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1505944357431-27579db47558?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1697539093652-c7716caeceb1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1556968298-26c39ade6eda?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export default function HomePage() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />
      <div className="relative min-h-screen text-white">
        {/* Background Carousel */}
        <div className="absolute inset-0 z-0 transition-opacity duration-1000">
          {backgroundImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 filter contrast-100 brightness-100 ${
                index === currentImage ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Main Content */}
        <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-16 space-y-10 text-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight">
            Smart Booking for Modern Spaces
          </h1>
          <SearchBar />
          <Link to="category">
            <button className="bg-black text-white font-bold px-6 py-3 rounded-xl w-full sm:w-fit transition hover:opacity-90">
              Browse all activities
            </button>
          </Link>
        </main>
      </div>
      <Footer />
    </>
  );
}
