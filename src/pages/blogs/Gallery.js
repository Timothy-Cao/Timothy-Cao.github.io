import React, { useState } from "react";
import {
  Box,
  ImageList,
  ImageListItem,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";

const images = Array.from({ length: 64 }, (_, index) => ({
  src: `/assets/media/Photo Gallery/${index + 1}.jpg`,
  title: `Image ${index + 1}`,
}));

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpen = (image) => setSelectedImage(image);
  const handleClose = () => setSelectedImage(null);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-5xl">
        <div className="space-y-4 text-left mb-12 mt-24 ml-4">
          <h1 className="text-5xl font-bold mb-4">Gallery</h1>
          <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
            Life of Tim in 2024
          </p>
        </div>

        <Box sx={{ mt: 4, p: 2 }}>
          <ImageList variant="masonry" cols={4} gap={12}>
            {images.map((image) => (
              <ImageListItem key={image.src}>
                <img
                  src={image.src}
                  alt={image.title}
                  loading="lazy"
                  style={{
                    cursor: "pointer",
                    objectFit: "cover",
                    aspectRatio: "1/1",
                    borderRadius: "8px",
                  }}
                  onClick={() => handleOpen(image.src)}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>

        <Modal
          open={!!selectedImage}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={!!selectedImage}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                boxShadow: 24,
                p: 4,
                outline: "none",
                maxWidth: "90vw",
                maxHeight: "90vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="Full View"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              )}
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};

export default Gallery;
