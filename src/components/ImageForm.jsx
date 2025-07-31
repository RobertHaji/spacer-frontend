import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";


export default function ImageForm() {
  const [spaces, setSpaces] = useState([]);
  const [selectedSpaceId, setSelectedSpaceId] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("session");

  // Fetch all the spaces from the backend
  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await fetch("http://spacer-backend-production.up.railway.app/spaces");
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
    setImageUrl("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSpaceId) {
      toast.error("Please select a space and an image file or URL");
      return;
    }
    if (!imageFile && !imageUrl) {
      toast.error("Please provide either an image file or an image URL");
      return;
    }

    setLoading(true);

    try {
      let response;

      if (imageFile) {
        const formData = new FormData();
        formData.append("space_id", selectedSpaceId);
        formData.append("image", imageFile);

        response = await fetch("http://spacer-backend-production.up.railway.app/api/images", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
      } else {
        response = await fetch("http://spacer-backend-production.up.railway.app/api/images", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            space_id: selectedSpaceId,
            image_url: imageUrl,
          }),
        });
      }

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      toast.success("Image uploaded successfully");
      setImageFile(null);
      setImageUrl("");
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
        Upload or Link Image to Space
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
            required= {!imageUrl}
          />
        </div>

        {/* Url */}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Or Provide Image URL
          </label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => {
              setImageUrl(e.target.value);
              setImageFile(null);
            }}
            placeholder="https://example.com/image.jpg"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required= {!imageFile}
          />
        </div>

        {/* Preview */}
        {(imageFile || imageUrl) && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-600 mb-2">Preview:</p>
            <img
              src={imageFile ? URL.createObjectURL(imageFile) : imageUrl}
              alt="Preview"
              className="w-full h-64 object-cover rounded-md border"
            />
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Add Image"}
        </button>
      </form>
    </div>
  );
}