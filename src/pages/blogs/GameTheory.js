import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import primeClimbTopics from "./PrimeClimb/GameTheoryTopics";

const GameTheorySection = () => {
  const [expanded, setExpanded] = useState("What is Prime Climb?");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="w-full max-w-5xl">
        
      <h1 className="text-5xl font-bold mb-8 mt-6">Case Study: Prime Climb</h1>
      <h3 className="text-1xl mb-8 mt-6 italic">Code Interpreter and algorithm demo under construction</h3>


        {primeClimbTopics.map((topic, index) => (
          <Accordion
            key={index}
            expanded={expanded === topic.title}
            onChange={handleChange(topic.title)}
            style={{
              backgroundColor: "#1E293B",
              color: "#F1F5F9",
              marginBottom: "16px",
              border: "1px solid #334155",
              borderRadius: "8px",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{ color: "#94A3B8" }} />}
              aria-controls={`${topic.title}-content`}
              id={`${topic.title}-header`}
            >
              <Typography variant="h6" style={{ fontWeight: "bold" }}>
                {topic.title}
              </Typography>
            </AccordionSummary>

            <AccordionDetails style={{ padding: "16px 24px" }}>
              {topic.description}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default GameTheorySection;
