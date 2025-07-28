import Footer from "@/components/ui/Footer";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BookingForm from "@/components/booking-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import AdminHeader from "@/components/adminsHeader";

export function SpacesPage() {
  const [spaces, setSpaces] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
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
      <AdminHeader />
      <main className="flex flex-1 px-6 py-8 flex-col">
        <div className="w-full lg:w-1/3">
          <h1 className="text-3xl font-bold mb-4">Explore Available Spaces</h1>
          <Input
            placeholder="Search by location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-6 text-black bg-white"
          />
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : filteredSpaces.length === 0 ? (
          <p className="text-white text-center">No spaces found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSpaces.map((space) => (
              <Card
                key={space.id}
                onClick={() => navigate("/SpaceDetails", { state: { space } })}
                className="mb-6 bg-cyan-800 cursor-pointer transition-all transform hover:scale-105 hover:shadow-[0_0_12px_rgba(255,255,255,0.3)] border border-white/20 rounded-xl"
              >
                <CardContent className="flex flex-col md:flex-row gap-4 p-4">
  <img
    src={space.image_url || "https://via.placeholder.com/150"}
    alt={space.name}
    className="w-full md:w-48 h-48 object-cover rounded"
  />
  <div className="flex-1 text-white flex flex-col justify-between">
    <div>
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold">{space.name}</h2>
        {space.category_name && (
          <span className="text-xs bg-yellow-400 text-black px-2 py-1 rounded-full font-semibold ml-2">
            {space.category_name}
          </span>
        )}
      </div>

      <p className="mt-2 font-semibold text-white">Description</p>
      <p className="text-sm my-2 line-clamp-3">{space.description}</p>

      <p className="text-sm">
        <span className="font-bold text-white">Rent:</span> {space.rent_rate} ksh/h
      </p>
      <p className="text-sm">
        <span className="font-bold text-white">Location:</span>{" "}
        {space.location || "Not specified"}
      </p>
    </div>

    <div className="flex gap-2 mt-4 flex-wrap">
      {!showForm && (
        <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setShowForm(true)}>
          Book now
        </Button>
      )}

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <BookingForm space={space} onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}

      <Button
        variant="secondary"
        className="text-green-700"
        onClick={(e) => {
          e.stopPropagation();
          window.open(
            `https://www.google.com/maps/search/${encodeURIComponent(space.location)}`,
            "_blank"
          );
        }}
      >
        View on map
      </Button>
    </div>
  </div>
</CardContent>

              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
