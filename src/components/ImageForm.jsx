import React, { useState, useEffect } from "react";

export default function ImageForm({ onSubmit, spaces = [] }) {
  const [imageUrl, setImageUrl] = useState("");
  const [spaceId, setSpaceId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!imageUrl || !spaceId) {
      alert("Please provide both an image URL and a space ID.");
      return;
    }

    const data = { imageUrl, spaceId };

    if (onSubmit) {
      onSubmit(data);
    }

    alert("Form submitted!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto space-y-4"
    >
      <h2 className="text-2xl font-semibold text-center text-teal-700">Add Image via URL</h2>

      {/* Space ID Field and Dropdown */}
      <div className="flex flex-col gap-2">
        <label className="block text-sm font-medium text-gray-700">Space ID</label>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={spaceId}
            onChange={(e) => setSpaceId(e.target.value)}
            placeholder="Enter space ID"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <select
            onChange={(e) => setSpaceId(e.target.value)}
            value={spaceId}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Select Space</option>
            {spaces.map((space) => (
              <option key={space.id} value={space.id}>
                {space.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Image URL Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Image Preview */}
      {imageUrl && (
        <div className="mt-4 space-y-2">
          <img
            src={imageUrl}
            alt="Preview"
            className="w-full h-64 object-cover rounded border"
          />
          <p className="text-sm text-gray-600 break-words">
            <strong>Image URL:</strong> {imageUrl}
          </p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-md transition"
      >
        Submit
      </button>
    </form>
  );
}
