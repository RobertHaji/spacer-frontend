import { Card } from "@/components/ui/card";
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
    image:
      "https://www.cvent.com/venues/_next/image?url=https%3A%2F%2Fimages.cvent.com%2Fcsn%2Fbe3326cb-8d44-4140-8c3b-9e8327cd7282%2Fimages%2Fb280d5c66652417b9790284393edd581_large!_!fad642b3cabe2148c1be1d55f8ece857.jpg&w=3840&q=30",
    //slug: "meetings",
  },
  {
    name: "Events",
    image:
      "https://www.oyorooms.com/blog/wp-content/uploads/2018/02/type-of-event.jpg",
    //slug: "events",
  },
  {
    name: "Baby shower",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4GGzUbOksPoT65XkMEGrCw3_FPy0uF2_YwbzrEvZxWG_GoqKzhe_BVaZ_ZLSwyt5fPkE&usqp=CAU",
    // slug: "baby-shower",
  },
  {
    name: "Graduation party",
    image:
      "https://t3.ftcdn.net/jpg/11/38/78/46/360_F_1138784636_PAJFSpLX3DFoB7kT9hnmfmmhYuTSUPED.jpg",
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
