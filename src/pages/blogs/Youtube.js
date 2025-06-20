import { useState } from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
} from "@mui/material";

const videoData = [
  {
    id: "1",
    title: "Why Math is Beautiful",
    author: "Veritasium",
    description: "A thoughtful dive into how math explains the world around us.",
    youtubeId: "sXpbONjV1Jc",
    thumbnail: "https://img.youtube.com/vi/sXpbONjV1Jc/hqdefault.jpg",
  },
  {
    id: "2",
    title: "The Most Satisfying Video",
    author: "SmarterEveryDay",
    description: "Why symmetry and physics bring joy to our senses.",
    youtubeId: "5GWhB1eAW4c",
    thumbnail: "https://img.youtube.com/vi/5GWhB1eAW4c/hqdefault.jpg",
  },
  // Add more videos here
];

const YoutubePage = () => {
  const [openVideo, setOpenVideo] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="w-full max-w-6xl">
        <h1 className="text-5xl font-bold mb-8 mt-6">Thoughtful Videos</h1>
        <Typography
          variant="subtitle1"
          className="mb-8 text-gray-300"
        >
          A curated gallery of videos I found thoughtful.
        </Typography>

        <Grid container spacing={4}>
          {videoData.map((video) => (
            <Grid item xs={12} sm={6} md={4} key={video.id}>
              <Card className="bg-gray-800 text-white">
                <CardActionArea onClick={() => setOpenVideo(video)}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={video.thumbnail}
                    alt={video.title}
                  />
                  <CardContent>
                    <Typography variant="h6">{video.title}</Typography>
                    <Typography variant="body2" className="text-gray-400">
                      {video.author}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="mt-2 text-gray-300"
                      noWrap
                    >
                      {video.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Modal for playing video */}
        <Dialog
          open={Boolean(openVideo)}
          onClose={() => setOpenVideo(null)}
          maxWidth="md"
          fullWidth
        >
          {openVideo && (
            <>
              <DialogTitle>{openVideo.title}</DialogTitle>
              <DialogContent>
                <Box mb={2}>
                  <iframe
                    width="100%"
                    height="400"
                    src={`https://www.youtube.com/embed/${openVideo.youtubeId}`}
                    title={openVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </Box>
                <Typography variant="subtitle2" gutterBottom>
                  By {openVideo.author}
                </Typography>
                <Typography variant="body1">{openVideo.description}</Typography>
              </DialogContent>
            </>
          )}
        </Dialog>
      </div>
    </div>
  );
};

export default YoutubePage;
