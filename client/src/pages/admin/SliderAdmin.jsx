import React, { useEffect, useState } from "react";
import api from "../../api"; // Axios instance
import LoadingSpinner from "../../components/LoadingSpinner";
import { showSuccess, showError } from "../../utils/notifications";

const SliderAdmin = () => {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch all slider images
  const fetchImages = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/api/slider");
      setImages(data || []);
    } catch (err) {
      console.error("Failed to fetch images:", err);
      showError("Failed to load slider images.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setSelectedFile(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  // Upload selected file
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      showError("Please select an image first.");
      return;
    }

    try {
      setUploading(true);
      const fd = new FormData();
      fd.append("photo", selectedFile);

      await api.post("/api/slider", fd);
      setSelectedFile(null);
      setPreview(null);

      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = "";

      showSuccess("Image uploaded successfully!");
      await fetchImages();
    } catch (err) {
      console.error("Upload failed:", err);
      showError("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  // Delete image by ID
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      await api.delete(`/api/slider/${id}`);
      showSuccess("Image deleted successfully!");
      await fetchImages();
    } catch (err) {
      console.error("Delete failed:", err);
      showError("Failed to delete image.");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-blue-800">
        Manage Slider Images
      </h3>

      <form
        onSubmit={handleUpload}
        className="flex flex-wrap items-center gap-4 mb-6"
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full sm:w-auto border px-3 py-2 rounded"
        />
        <button
          type="submit"
          disabled={uploading || !selectedFile}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {uploading ? (
            <>
              <LoadingSpinner size="sm" color="white" />
              Uploading...
            </>
          ) : (
            "Upload Image"
          )}
        </button>
      </form>

      {preview && (
        <div className="mb-4">
          <img
            src={preview}
            alt="Preview"
            className="h-24 rounded shadow mx-auto"
          />
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="relative">
            <img
              src={`${api.defaults.baseURL}/api/slider/image/${img.id}`} // ✅ full image URL
              alt="Slider"
              className="w-full h-32 object-cover rounded shadow"
            />
            <button
              onClick={() => handleDelete(img.id)}
              className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SliderAdmin;
