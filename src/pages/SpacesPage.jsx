import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BookingForm from "@/components/booking-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"

export function SpacesPage() {
  const [spaces, setSpaces] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

const userRole = localStorage.getItem("role");
const token = localStorage.getItem("session");
// Debugs to check whether the token is stored
  console.log("TOKEN BEFORE DELETE:", token);


  const categoryFilter = location.state?.category || "";

  useEffect(() => {
    fetch("http://localhost:5000/spaces")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch spaces");
        }
        return res.json();
      })
      .then((data) => {
        // Checks if the spaces are being fetched
        console.log("Fetched spaces:", data);
        setSpaces(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [location.state]);


  const filteredSpaces = spaces.filter((space) => {
    const locationMatch = space.location
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const categoryMatch = categoryFilter
      ? (space.category_name || "").toLowerCase() ===
        categoryFilter.toLowerCase()
      : true;

    return locationMatch && categoryMatch;
  });

  // console.log("Category filter:", categoryFilter);
  // console.log("Filtered spaces:", filteredSpaces);

const handleEdit = (space) => {
  navigate("/SpaceForm", { state: { space } });
};

const handleDelete = async (id) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this space?"
  );
  if (!confirmed) return;

  try {
    const response = await fetch(`http://localhost:5000/spaces/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("session")}`,
      },
    });

    if (!response.ok) throw new Error("Delete failed");
    toast.success("Space deleted");
    setSpaces((prev) => prev.filter((space) => space.id !== id));
  } catch (error) {
    toast.error("Failed to delete space");
  }
};



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
            <p className="text-white text-center">No spaces found.</p>
          ) : (
            filteredSpaces.map((space) => (
              <Card
                key={space.id}
                className="mb-6 bg-cyan-800 cursor-pointer transition-all transform hover:scale-105 hover:shadow-[0_0_12px_rgba(255,255,255,0.3)] border border-white/20 rounded-xl"
              >
                <CardContent className="flex gap-4 p-4">
                  <img
                    src={space.image_url || "https://via.placeholder.com/150"}
                    alt={space.name}
                    className="w-48 h-48 object-cover rounded"
                  />
                  <div className={"flex-1 text-white"}>
                    <h2 className={"text-xl font-bold text-white"}>
                      {space.name}
                    </h2>
                    <p className={"mt-2 font-semibold text-white"}>
                      Description
                    </p>
                    <p className="text-sm my-2 line-clamp-3 text-white">
                      {space.description}
                    </p>
                    <p className="text-sm text-white">
                      Rent: {space.rent_rate} ksh/h
                    </p>
                    <p className={"text-sm semi-bold text-white"}>
                      Location: {space.location || "Not specified"}
                    </p>

                    <div className="flex gap-2 mt-3">
                      <Button
                        className={"bg-purple-600 hover:bg-purple-700"}
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
                    {userRole === "admin" && (
                      <div className="flex gap-2 mt-3">
                        <Button
                          className={
                            "bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 text-sm rounded"
                          }
                          onClick={() => handleEdit(space)}
                        >
                          Edit
                        </Button>
                        <Button
                          className={
                            "bg-red-500 hover:bg-red-600 text-white px-5 py-1 text-sm rounded"
                          }
                          onClick={() => handleDelete(space.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        <aside className="w-full max-w-md hidden md:flex items-center justify-center">
          {selectedSpace ? (
            <div className="w-full cursor-pointer transition-all transform hover:scale-105 hover:shadow-[0_0_12px_rgba(255,255,255,0.3)] border border-white/20 rounded-xl">
              <button
                onClick={() => setSelectedSpace(null)}
                className="absolute top-3 right-3 cursor-pointer text-red-500 hover:text-red-700 text-xl font-bold focus:outline-none"
              >
                X
              </button>
              <BookingForm space={selectedSpace} />
              {/* <div className="flex justify-center">
                <Button
                  variant="outline"
                  className="text-red-500 border-red-500 hover:bg-red-100 hover:text-red-700 w-auto px-4"
                  onClick={() => setSelectedSpace(null)}
                >
                  Cancel Booking
                </Button>
              </div> */}
            </div>
          ) : (
            <div className="text-center text-gray-200">
              <p>Select a space to book.</p>
            </div>
          )}
        </aside>
      </main>

      <Footer />
    </div>
  );
}
