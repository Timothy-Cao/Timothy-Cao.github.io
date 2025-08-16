import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import mathArtTopics from "./MathArt/mathArtTopics";
import MathArtSection from "./MathArt/MathArtSection";

const MathArtPage = () => {
  const [expanded, setExpanded] = useState(0); 

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  return (
  <div className="bg-gray-900 text-white px-4">
    <div className="max-w-5xl mx-auto space-y-8 mt-24 mb-12">
      <h1 className="text-5xl font-bold mb-8 mt-6">Desmos Art</h1>
        <Typography
          variant="subtitle1"
          className="mb-8 text-gray-300"
          style={{ marginBottom: "16px" }}
        >
          The creativity of math.
        </Typography>

        {mathArtTopics.map((topic, index) => (
          <MathArtSection
            key={index}
            topic={topic}
            expanded={expanded === index}
            onChange={handleChange(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default MathArtPage;
