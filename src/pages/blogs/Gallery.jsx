import React, { useState } from "react";
import { Box, ImageList, ImageListItem, Modal, Backdrop, Fade } from "@mui/material";

const GALLERY_IMAGE_COUNT = 64;

const images = Array.from({ length: GALLERY_IMAGE_COUNT }, (_, i) => ({
  src: `/assets/media/Photo Gallery/${i + 1}.jpg`,
  title: `Image ${i + 1}`,
}));

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="bg-gray-900 text-white px-4">
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
                  className="cursor-pointer object-cover rounded-lg"
                  style={{ aspectRatio: "1/1" }}
                  onClick={() => setSelectedImage(image.src)}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>

        <Modal
          open={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{ backdrop: { timeout: 500 } }}
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
