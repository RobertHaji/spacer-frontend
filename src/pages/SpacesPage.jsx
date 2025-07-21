import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BookingForm from "@/components/booking-form";

// const displaySpaces = [
//   {
//     id: 1,
//     name: "Reef Hotel (Mombasa)",
//     description: "Reef Hotel Mombasa offers a conference facility...",
//     rent_rate: 800,
//     location: "Mombasa",
//     image_url:
//       "https://cf.bstatic.com/xdata/images/hotel/max1024x768/121822663.jpg?k=cbaedb5963542fe37a0918426bd6b4566d86287181946d53f8a42e97cc95a13f&o=&hp=1",
//   },
//   {
//     id: 2,
//     name: "Lily (Serena Hotels, Nairobi)",
//     description: "The Lily Serena Hotel Conference Room is where...",
//     rent_rate: 750,
//     location: "Nairobi",
//     image_url:
//       "https://image-tc.galaxy.tf/wijpeg-b2xm03zk5188ubji56g3c5moh/lily-room-board-room.jpg?width=1600&height=1066",
//   },
// ];

export function SpacesPage() {
  const [spaces, setSpaces] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/spaces")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch spaces");
        }
        return res.json();
      })
      .then((data) => {
        setSpaces(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredSpaces = spaces.filter((space) =>
    space.location?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0f535c] to-[#20afc2] text-white">
      <Header />

      <main className="flex flex-1 px-6 gap-5">
        <div className="w-1/3">
          <h1 className="text-3xl font-bold mb-4">Explore Available Spaces</h1>
          <Input
            placeholder="Search by location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-6 text-black bg-white"
          />

          {loading ? (
            <p>Loading...</p>
          ) : filteredSpaces.length === 0 ? (
            <p className="text-white text-center">
              No spaces found for &quot;{search}&quot;.
            </p>
          ) : (
            filteredSpaces.map((space) => (
              <Card key={space.id} className="mb-6 bg-cyan-800">
                <CardContent className="flex gap-4 p-4">
                  <img
                    src={space.image_url}
                    alt={space.name}
                    className="w-48 h-48 object-cover rounded"
                  />
                  <div className="flex-1" text-white>
                    <h2 className="text-xl font-bold text-white">
                      {space.name}
                    </h2>
                    <p className="mt-2 font-semibold text-white">Description</p>
                    <p className="text-sm my-2 line-clamp-3 text-white">
                      {space.description}
                    </p>
                    <p className="text-sm text-white">
                      Rent: {space.rent_rate} ksh/h
                    </p>
                    <p className="text-sm semi-bold text-white">
                      Location: {space.location}
                    </p>

                    <div className="flex gap-2 mt-3">
                      <Button
                        className="bg-purple-600 hover:bg-purple-700"
                        onClick={() => setSelectedSpace(space)}
                      >
                        Book now
                      </Button>
                      <Button
                        variant="secondary"
                        className="text-green-700"
                        onClick={() =>
                          window.open(
                            `https://www.google.com/maps/search/${encodeURIComponent(
                              space.location
                            )}`,
                            "_blank"
                          )
                        }
                      >
                        View on map
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        <aside className="w-full max-w-md hidden md:block">
          {selectedSpace ? (
            <div className="bg-white text-black rounded-xl p-6 shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Book Form</h2>
              <BookingForm space={selectedSpace} />
            </div>
          ) : (
            <div className="text-center text-gray-200 mt-20">
              <p>Select a space to book.</p>
            </div>
          )}
        </aside>
      </main>

      <Footer />
    </div>
  );
}
