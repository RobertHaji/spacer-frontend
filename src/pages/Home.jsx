import React from "react";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer"; 
import SearchBar from "@/components/SearchBar";

export default function HomePage() {
  return (
    <>
      <Header />
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0f535c] to-[#20afc2] text-white">
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-16 space-y-10">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-center leading-tight">
          Discover & Book Unique <br /> Spaces In Your Area
        </h1>

          {/* Search Bar */}
          <SearchBar />
        

        {/* Activity Cards
        <div className="w-full max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {[
            "Conference Rooms",
            "Photo Studios",
            "Cooking Classes",
            "Event Venues",
            "Fitness Centers",
            "Recording Studios"
          ].map((activity, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center transition-transform duration-300 hover:scale-105"
            >
              <div className="rounded-xl overflow-hidden w-full aspect-square bg-white">
                <img
                  src={`https://source.unsplash.com/random/300x300?sig=${i}`}
                  alt={activity}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="mt-2 text-sm font-medium">{activity}</span>
            </div>
          ))}
        </div> */}

        {/* CTA Button */}
        <button className="bg-black text-white font-bold px-6 py-3 rounded-xl w-full sm:w-fit transition hover:opacity-90">
          Browse all activities
        </button>
      </main>

      
      <Footer />
      </div>
      </>
  );
}
