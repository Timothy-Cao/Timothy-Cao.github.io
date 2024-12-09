import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import primeClimbTopics from "./GameTheoryTopics";

const GameTheorySection = () => {
  const [expanded, setExpanded] = useState("What is Prime Climb?");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  return (
    <>
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
            <Typography variant="h6" style={{ marginBottom: "8px" }}>
              {topic.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: "16px 24px" }}>
            {topic.description}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default GameTheorySection;
