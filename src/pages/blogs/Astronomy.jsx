import React, { useEffect, useState } from "react";
import { CircularProgress, Typography } from "@mui/material";

const Astronomy = () => {
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAPOD = async () => {
      try {
        const apiKey = import.meta.env.VITE_NASA_API_KEY || "DEMO_KEY";
        const response = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&thumbs=true`
        );
        if (!response.ok) throw new Error("Failed to fetch APOD data");
        setApodData(await response.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAPOD();
  }, []);

  // Use standard-res url for display, hdurl only exists for images
  const displayUrl = apodData?.url;
  const isVideo = apodData?.media_type === "video";

  return (
    <div className="bg-gray-900 text-white px-4">
      <div className="max-w-5xl mx-auto space-y-8 mt-24 mb-12">
        <h1 className="text-5xl font-bold mb-8">Picture of the Day</h1>
        <p className="text-lg text-gray-300 mb-12 leading-relaxed">Source: NASA</p>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <CircularProgress style={{ color: "#53d8fb" }} />
          </div>
        ) : error ? (
          <Typography variant="body1" className="text-center" style={{ color: "#d4afb9" }}>
            {error}
          </Typography>
        ) : (
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="relative w-full mb-4">
              {isVideo ? (
                <iframe
                  src={displayUrl}
                  title={apodData.title}
                  className="w-full h-64 md:h-96 rounded-lg"
                  style={{ border: "none" }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <img
                  src={displayUrl}
                  alt={apodData.title}
                  className="w-full h-auto rounded-lg mx-auto object-contain"
                  style={{ maxHeight: "500px" }}
                  loading="lazy"
                />
              )}
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{apodData.title}</h3>
            <p className="text-sm text-gray-400">{apodData.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Astronomy;
