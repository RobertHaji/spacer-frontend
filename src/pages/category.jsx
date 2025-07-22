import { Card } from "@/components/ui/card";
//import Header from "./Header";
import Footer from "@/components/ui/Footer";
import { useNavigate } from "react-router-dom";
import Header from "@/components/ui/Header"; 

const categories = [
  {
    name: "Photo shoot",
    image:
      "https://media.istockphoto.com/id/628907788/photo/couple-photoshoot.jpg?s=612x612&w=0&k=20&c=8y0L2Td4lhzl-d_JbPfDwrJJKVlYHDiAM3EBJEtAuO4=",
    slug: "photo-shoot",
  },
  {
    name: "Weddings",
    image:
      "https://afrikta.com/wp-content/uploads/2024/09/Best-Budget-friendly-Wedding-Venues-in-Kenya.jpg",
    slug: "weddings",
  },
  {
    name: "Meetings",
    image: "https://www.cvent.com/venues/_next/image?url=https%3A%2F%2Fimages.cvent.com%2Fcsn%2Fbe3326cb-8d44-4140-8c3b-9e8327cd7282%2Fimages%2Fb280d5c66652417b9790284393edd581_large!_!fad642b3cabe2148c1be1d55f8ece857.jpg&w=3840&q=30"
    //slug: "meetings",
  },
  {
    name: "Events",
    image:
      "https://www.cvent.com/venues/_next/image?url=https%3A%2F%2Fimages.cvent.com%2Fcsn%2Fd7a54a1a-b754-45d3-8ab2-c721f0140af7%2Fimages%2F49760995c833453c917d3f1fac77c5af_large!_!f2895887ca17ee536b5f0a40b2e645a5.jpg&w=3840&q=75",
    //slug: "events",
  },
  {
    name: "Baby shower",
    image:
      "https://birthdaywala.in/wp-content/uploads/2024/08/Baby-Shower1.webp",
   // slug: "baby-shower",
  },
  {
    name: "Graduation party",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiLwASgBcdfy9QUWDcjYpLGcPA-H1smM1PR-6FqlxfXkpxve7HohBE7c7QEvFLkMMTMfQ&usqp=CAU",
   // slug: "graduation-party",
  },
  {
    name: "Birthday",
    image:
      "https://elegantlivingeveryday.com/wp-content/uploads/2023/10/How-to-Plan-an-Adult-Birthday-Party-Featured-Image.jpg",
   // slug: "birthday",
  },
  
];

export default function CategoryPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0f535c] to-[#20afc2] text-white">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Categories</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Card
              key={cat.slug}
              onClick={() => navigate(`/spaces/${cat.slug}`)}
              className="cursor-pointer transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] bg-white text-black overflow-hidden"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-40 object-cover"
              />
              <div className="text-center font-semibold py-2 text-lg">
                {cat.name}
              </div>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
