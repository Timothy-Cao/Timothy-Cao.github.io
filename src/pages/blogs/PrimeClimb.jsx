import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import primeClimbTopics from "./PrimeClimb/GameTheoryTopics";

const accordionStyle = {
  backgroundColor: "#1E293B",
  color: "#F1F5F9",
  mb: 2,
  border: "1px solid #334155",
  borderRadius: "8px !important",
};

const PrimeClimbPage = () => {
  const [expanded, setExpanded] = useState("What is Prime Climb?");

  const handleChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  return (
    <div className="bg-gray-900 text-white px-4">
      <div className="max-w-5xl mx-auto space-y-8 mt-24 mb-12">
        <h1 className="text-5xl font-bold mb-8 mt-6">Case Study: Prime Climb</h1>
        <p className="text-lg italic text-gray-400 mb-8">
          Code Interpreter and algorithm demo under construction
        </p>

        {primeClimbTopics.map((topic) => (
          <Accordion
            key={topic.title}
            expanded={expanded === topic.title}
            onChange={handleChange(topic.title)}
            sx={accordionStyle}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#94A3B8" }} />}
              aria-controls={`${topic.title}-content`}
              id={`${topic.title}-header`}
            >
              <Typography variant="h6" fontWeight="bold">
                {topic.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 3, py: 2 }}>
              {topic.description}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default PrimeClimbPage;
