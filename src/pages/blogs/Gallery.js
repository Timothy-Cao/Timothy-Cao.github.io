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
    <div className="min-h-screen bg-gray-900 text-white px-4">
      <div className="max-w-5xl mx-auto space-y-8 mt-24 mb-12">
        <h1 className="text-5xl font-bold mb-8 mt-6">Gallery</h1>
        <p className="text-lg text-gray-300 mb-12 leading-relaxed">
          Looking back on 2024
        </p>

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