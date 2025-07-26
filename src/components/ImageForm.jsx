import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function ImageForm() {
  const [spaces, setSpaces] = useState([]);
  const [selectedSpaceId, setSelectedSpaceId] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all the spaces from the backend
  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await fetch("http://localhost:5000/spaces");
        if (!response.ok) {
          throw new Error("Failed to fetch spaces");
        }
        const data = await response.json();
        setSpaces(data);
      } catch (error) {
        console.error("Error fetching spaces:", error);
        toast.error("Failed to load spaces");
      }
    };

    fetchSpaces();
  }, []);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSpaceId || !imageFile) {
      toast.error("Please select a space and an image");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("space_id", selectedSpaceId);
    formData.append("image", imageFile);

    try {
      const response = await fetch("http://localhost:5000/images", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      toast.success("Image uploaded successfully");
      setImageFile(null);
      setSelectedSpaceId("");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Upload Space Image
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Select dropdown for spaces */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Space
          </label>
          <select
            value={selectedSpaceId}
            onChange={(e) => setSelectedSpaceId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">-- Select a space --</option>
            {spaces.map((space) => (
              <option key={space.id} value={space.id}>
                {space.name}
              </option>
            ))}
          </select>
        </div>

        {/* Image upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
            required
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload Image"}
        </button>
      </form>
    </div>
  );
}