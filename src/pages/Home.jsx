import React, { useEffect, useState } from "react";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import SearchBar from "@/components/SearchBar";
import AdminHeader from "@/components/adminsHeader";
import { Link } from "react-router-dom";

const backgroundImages = [
  "https://www.gomazevo.com/hubfs/mazevo%20event%20room%20layout.jpg",
  "https://media.superiorseating.com/Magento_Live_Site/amasty/blog/guide-of-banquet-styling-seating-arrangments.jpg",
  "https://thumbs.dreamstime.com/b/view-grand-wedding-banquet-setup-hotel-69136925.jpg",
  "https://www.gonsin.com/uploads/image/20241106/GONSIN_Audio_and_Visual_System_Design_for_Banquet_Halls_04.png",
  "https://www.dgicommunications.com/wp-content/uploads/2020/01/MicrosoftTeams-image-3.jpg",
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
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
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
