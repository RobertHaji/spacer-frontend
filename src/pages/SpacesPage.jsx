import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const displaySpaces = [
  {
    id: 1,
    name: "Reef Hotel (Mombasa)",
    description: "Reef Hotel Mombasa offers a conference facility...",
    rent_rate: 800,
    location: "Mombasa",
    image_url:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/121822663.jpg?k=cbaedb5963542fe37a0918426bd6b4566d86287181946d53f8a42e97cc95a13f&o=&hp=1",
  },
  {
    id: 2,
    name: "Lily (Serena Hotels, Nairobi)",
    description: "The Lily Serena Hotel Conference Room is where...",
    rent_rate: 750,
    location: "Nairobi",
    image_url:
      "https://image-tc.galaxy.tf/wijpeg-b2xm03zk5188ubji56g3c5moh/lily-room-board-room.jpg?width=1600&height=1066",
  },
];

export function SpacesPage() {
  const [spaces, setSpaces] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setSpaces(displaySpaces);
  }, []);

  const filteredSpaces = spaces.filter((space) =>
    space.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-cyan-900 to-cyan-700 text-white">
      <Header />

      <main className="flex-1 p-4 max-w-4xl mx-auto w-full">
        <Input
          placeholder="Search by location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-6 text-black"
        />

        {filteredSpaces.map((space) => (
          <Card key={space.id} className="mb-6 bg-cyan-800">
            <CardContent className="flex gap-4 p-4">
              <img
                src={space.image_url}
                alt={space.name}
                className="w-40 h-32 object-cover rounded"
              />
              <div className="flex-1">
                <h2 className="text-xl font-bold">{space.name}</h2>
                <p className="text-sm my-2 line-clamp-3">{space.description}</p>
                <p className="text-sm">Rent: {space.rent_rate} ksh/h</p>
                <p className="text-sm">Location: {space.location}</p>

                <div className="flex gap-2 mt-3">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Book now
                  </Button>
                  <Button variant="secondary" className="text-green-700">
                    View on map
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </main>

      <Footer />
    </div>
  );
}

