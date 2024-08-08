import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage } from "@fortawesome/free-solid-svg-icons";
import imageCompression from "browser-image-compression";

function ImageLoader({ image, onImageChange, ...props }) {
  const [imageURL, setImageURL] = useState(image || "");

  useEffect(() => {
    if (image) {
      setImageURL(image);
    }
  }, [image]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        const compressedImageURL = URL.createObjectURL(compressedFile);
        onImageChange(compressedImageURL); // Pass compressed URL to parent
        setImageURL(compressedImageURL); // Update local state
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }
  };

  const handleURLChange = (e) => {
    const url = e.target.value.trim();
    onImageChange(url);
    setImageURL(url);
  };

  const clearImage = () => {
    onImageChange("");
    setImageURL("");
  };

  return (
    <div {...props}>
      <label
        htmlFor="image-file"
        className="relative flex items-center justify-center px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 cursor-pointer focus:outline-none focus:bg-blue-600"
      >
        <FontAwesomeIcon icon={faFileImage} className="text-xl" />
      </label>
      <div className="flex flex-grow ml-1">
        {imageURL ? (
          <>
            <img
              src={imageURL}
              alt="Uploaded"
              className="w-full max-h-20 object-cover rounded border"
            />
            <button
              type="button"
              onClick={clearImage}
              className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
            >
              X
            </button>
          </>
        ) : (
          <input
            id="image-url"
            type="url"
            required
            value={imageURL}
            className="flex-grow shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleURLChange}
          />
        )}
        <input
          id="image-file"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}

export default ImageLoader;
