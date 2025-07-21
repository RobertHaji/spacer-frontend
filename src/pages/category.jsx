"use client";
import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";

const categories = [
  {
    title: "Photo shoot",
    image: "/images/photoshoot.jpg",
  },
  {
    title: "Weddings",
    image: "/images/wedding.jpg",
  },
  {
    title: "Meetings",
    image: "/images/meeting.jpg",
  },
  {
    title: "Events",
    image: "/images/events.jpg",
  },
  {
    title: "Baby shower",
    image: "/images/babyshower.jpg",
  },
];

export default function CategoryPage() {
  const [activeIndex, setActiveIndex] = (useState < number) | (null > null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-900 to-cyan-600 py-10 px-4">
      <h1 className="text-white text-3xl font-bold mb-8 text-center">Spacer</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {categories.map((cat, index) => (
          <div
            key={cat.title}
            onClick={() => setActiveIndex(index)}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            className={clsx(
              "rounded-lg overflow-hidden cursor-pointer transition-all duration-300 shadow-md",
              activeIndex === index
                ? "ring-4 ring-white scale-105 shadow-xl"
                : ""
            )}
          >
            <Image
              src={cat.image}
              alt={cat.title}
              width={200}
              height={200}
              className="object-cover w-48 h-48"
            />
            <p className="text-white text-center mt-2 font-medium">
              {cat.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
"use client"
import Image from "next/image"
import { useState } from "react"
import clsx from "clsx"

const categories = [
  {
    title: "Photo shoot",
    image: "/images/photoshoot.jpg",
  },
  {
    title: "Weddings",
    image: "/images/wedding.jpg",
  },
  {
    title: "Meetings",
    image: "/images/meeting.jpg",
  },
  {
    title: "Events",
    image: "/images/events.jpg",
  },
  {
    title: "Baby shower",
    image: "/images/babyshower.jpg",
   },
   {
     title: "conference",
     image: "/images/babyshower.jpg", 
  },
]

export default function CategoryPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-900 to-cyan-600 py-10 px-4">
      <h1 className="text-white text-3xl font-bold mb-8 text-center">Spacer</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {categories.map((cat, index) => (
          <div
            key={cat.title}
            onClick={() => setActiveIndex(index)}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            className={clsx(
              "rounded-lg overflow-hidden cursor-pointer transition-all duration-300 shadow-md",
              activeIndex === index ? "ring-4 ring-white scale-105 shadow-xl" : ""
            )}
          >
            <Image
              src={cat.image}
              alt={cat.title}
              width={200}
              height={200}
              className="object-cover w-48 h-48"
            />
            <p className="text-white text-center mt-2 font-medium">{cat.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
