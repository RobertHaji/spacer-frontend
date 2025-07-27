import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AdminHeader from "@/components/adminsHeader";
import Footer from "@/components/ui/Footer";
import { useState, useEffect } from "react";
import BookingForm from "@/components/booking-form";
import { toast } from "react-hot-toast";

export default function SpaceDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const space = location.state?.space;
  const [showForm, setShowForm] = useState(false);
  const userRole = localStorage.getItem("role");
  // State to hold extra images for the spaces
  const [extraImages, setExtraImages] = useState([]);


  // Fetch images from the database
  useEffect(() => {
    if (!space?.id) return;

    fetch(`http://localhost:5000/api/spaces/${space.id}/images`)
      .then((res) => res.json())
      .then((data) => {
        setExtraImages(data.images || []);
      })
      .catch((err) => console.error("Error fetching images:", err));
  }, [space]);


  if (!space) {
    return <p className="text-white p-6">No space selected.</p>;
  }

  const handleEdit = () => {
    navigate("/SpaceForm", { state: { space } });
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this space?"
    );
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:5000/spaces/${space.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("session")}`,
        },
      });

      if (!response.ok) throw new Error("Delete failed");
      toast.success("Space deleted");
      navigate("/SpacesPage");
    } catch (error) {
      toast.error("Failed to delete space");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0f535c] to-[#20afc2] text-white">
      <AdminHeader />
      <div className="px-6 py-4 max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="text-white underline mb-4"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold mb-6">{space.name}</h1>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 items-start">
          {/* Main Image */}
          {space.image_url && (
            <div className="lg:col-span-2">
              <img
                src={space.image_url}
                alt="Main Space"
                className="w-full h-[400px] object-cover rounded-2xl shadow-md"
              />
            </div>
          )}

          {/* Extra Images */}
          <div className="grid grid-cols-2 gap-4">
            {extraImages.slice(0, 4).map((img, index) => (
              <div key={index} className="overflow-hidden rounded-xl shadow-sm">
                <img
                  src={img.url}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-md leading-relaxed whitespace-pre-line">
            {space.description}
          </p>
        </div>

        <div className="mb-6">
          <p>
            <strong>Rent:</strong> {space.rent_rate} Ksh/h
          </p>
          <p>
            <strong>Location:</strong> {space.location}
          </p>
        </div>

        <div className="flex gap-3 flex-wrap items-start">
          <div>
            {!showForm && (
              <Button
                className="bg-purple-600 hover:bg-purple-700"
                onClick={() => setShowForm(true)}
              >
                Book now
              </Button>
            )}

            {showForm && (
              <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-white/30 z-50">
                <div className="bg-gradient-to-b from-[#0F555C] to-[#20B4C2] p-6 rounded-lg shadow-lg max-w-md w-full">
                  <BookingForm
                    space={space}
                    onClose={() => setShowForm(false)}
                  />
                </div>
              </div>
            )}
          </div>

          <Button
            variant="secondary"
            onClick={() =>
              window.open(
                `https://www.google.com/maps/search/${encodeURIComponent(
                  space.location
                )}`,
                "_blank"
              )
            }
          >
            View on Map
          </Button>
        </div>
        {userRole === "admin" && (
          <div className="flex gap-2 mt-4">
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 text-sm rounded"
              onClick={handleEdit}
            >
              Edit
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-1 text-sm rounded"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
