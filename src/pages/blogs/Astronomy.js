import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { CircularProgress, Typography } from "@mui/material";

const NASA = () => {
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchAPOD = async () => {
      try {
        const response = await fetch(
          "https://api.nasa.gov/planetary/apod?api_key=JELkWxHjp7EmBUP9qCRfEOycHBZtmpf5k5qWlhsT"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch APOD data");
        }
        const data = await response.json();
        setApodData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAPOD();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
  <div className="min-h-screen bg-gray-900 text-white px-4">
    <div className="max-w-5xl mx-auto space-y-8 mt-24 mb-12">
        <h1 className="text-5xl font-bold mb-8">Picture of the Day</h1>
        <p className="text-lg text-gray-300 mb-12 leading-relaxed">
          Source: NASA
        </p>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <CircularProgress style={{ color: "#53d8fb" }} />
          </div>
        ) : error ? (
          <Typography
            variant="body1"
            className="text-center"
            style={{ color: "#d4afb9" }}
          >
            {error}
          </Typography>
        ) : (
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="relative w-full mb-4">
              {apodData.media_type === "image" ? (
                <img
                  src={apodData.url}
                  alt={apodData.title}
                  className="object-cover w-full h-auto"
                  style={{
                    maxHeight: "400px",
                    margin: "0 auto",
                    borderRadius: "8px",
                  }}
                />
              ) : (
                <iframe
                  src={apodData.url}
                  title={apodData.title}
                  className="w-full h-64 md:h-96"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    borderRadius: "8px",
                  }}
                ></iframe>
              )}
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              {apodData.title}
            </h3>
            <p className="text-sm text-gray-400">{apodData.explanation}</p>
          </div>
        )}
      </div>
      {apodData && (
        <Modal open={open} onClose={handleClose}>
          <Box
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 p-6 rounded-lg shadow-lg"
            style={{
              maxWidth: "800px",
              maxHeight: "90vh",
              overflow: "auto",
            }}
          >
            <h2 className="text-xl font-bold text-white mb-4">
              {apodData.title}
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              {apodData.explanation}
            </p>
            {apodData.media_type === "image" ? (
              <img
                src={apodData.url}
                alt={apodData.title}
                className="object-cover w-full h-auto"
                style={{ maxHeight: "500px", borderRadius: "8px" }}
              />
            ) : (
              <iframe
                src={apodData.url}
                title={apodData.title}
                className="w-full h-64 md:h-96"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  borderRadius: "8px",
                }}
              ></iframe>
            )}
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default NASA;
