import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

const MathArtSection = ({ topic, expanded, onChange }) => {
  return (
    <Accordion
      expanded={expanded}
      onChange={onChange}
      style={{
        backgroundColor: "#1E293B",
        color: "#F1F5F9",
        marginBottom: "16px",
        border: "1px solid #334155",
        borderRadius: "8px",
      }}
      TransitionProps={{ unmountOnExit: true }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon style={{ color: "#94A3B8" }} />}
        aria-controls={`${topic.title}-content`}
        id={`${topic.title}-header`}
        disableGutters
      >
        <Typography variant="h6">{topic.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body2" className="text-gray-300 mb-4">
          {topic.description}
        </Typography>

        {topic.type === "video" && (
          <iframe
            src={topic.video}
            title={topic.title}
            className="w-full h-64 md:h-96"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}

        {topic.type === "images" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topic.images.map((image, idx) => (
              <div key={idx} className="text-center">
                <img
                  src={image.src}
                  alt={image.caption}
                  className="w-full max-w-md mx-auto rounded-lg"
                />
                <Typography variant="body2" className="text-gray-400 mt-2">
                  {image.caption}
                </Typography>
              </div>
            ))}
          </div>
        )}

        {topic.type === "iframe" && (
          <iframe
            src={topic.iframe}
            title={topic.title}
            className="w-full h-80 md:h-[400px]"
            frameBorder="0"
          ></iframe>
        )}

        {topic.link && (
          <Button
            variant="contained"
            color="primary"
            href={topic.link}
            target="_blank"
            className="mt-4"
          >
            Visit Link
          </Button>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default MathArtSection;
