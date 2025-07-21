import { Card } from "@/components/ui/card";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Photo shoot",
    image:
      "https://images.unsplash.com/photo-1526178616914-4aa1d07bba66?auto=format&fit=crop&w=800&q=60",
    slug: "photo-shoot",
  },
  {
    name: "Weddings",
    image:
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2864?auto=format&fit=crop&w=800&q=60",
    slug: "weddings",
  },
  {
    name: "Meetings",
    image:
      "https://images.unsplash.com/photo-1588702547934-02174c7e62b8?auto=format&fit=crop&w=800&q=60",
    slug: "meetings",
  },
  {
    name: "Events",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=60",
    slug: "events",
  },
  {
    name: "Baby shower",
    image:
      "https://images.unsplash.com/photo-1584447127166-bf63d3b8f2f2?auto=format&fit=crop&w=800&q=60",
    slug: "baby-shower",
  },
  {
    name: "Graduation party",
    image:
      "https://images.unsplash.com/photo-1604774887511-e29a8b87fa1f?auto=format&fit=crop&w=800&q=60",
    slug: "graduation-party",
  },
  {
    name: "Birthday",
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=60",
    slug: "birthday",
  },
  {
    name: "Engagement party",
    image:
      "https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=800&q=60",
    slug: "engagement-party",
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
