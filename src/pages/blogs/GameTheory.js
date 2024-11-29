import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

const primeClimbTopics = [
  {
    title: "What is Prime Climb?",
    description: (
      <>
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          Prime Climb is a math-based board game where the goal is to move two
          pieces from 0 to exactly 101 before other players. Players roll two
          dice (numbered 1 to 10) and use the basic 4 operations to move their pieces. Only natural number results are allowed.
        </Typography>
        <img
          src="/assets/media/game theory/primeclimb.jpg"
          alt="Prime Climb Board"
          style={{
            display: "block",
            margin: "16px auto",
            maxWidth: "100%",
            borderRadius: "8px",
          }}
        />
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          Here's a video explaining the rules to the boardgame. We'll
          simplify the rules to avoid the use of player cards. 
        </Typography>
        <iframe
          src="https://www.youtube.com/embed/tWhVw3mTpPU"
          title="Prime Climb Gameplay"
          style={{
            display: "block",
            width: "100%",
            height: "360px",
            marginBottom: "16px",
            borderRadius: "8px",
          }}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <Button
          variant="contained"
          color="primary"
          href="https://mathforlove.com/2010/01/prime-climb-rules/"
          target="_blank"
        >
          View Full Rules
        </Button>
      </>
    ),
  },
  {
    title: "Naive Approach 1: Greedy Algorithm - Sum-max",
    description: (
      <>
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          A common beginner strategy is to maximize the sum of their pieces
          every turn. This usually involves multiplying until further
          multiplication exceeds 101, followed by additions to reach exactly
          101. Subtraction is often used when nearing the goal.
        </Typography>
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          However, this approach has a significant flaw: it doesn't consider
          future positioning. Entering certain ranges, like 51–80, can make it
          harder to progress in subsequent turns.
        </Typography>
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          By keeping pieces in more flexible positions, like 30 and 50, players
          have higher probabilities of moving efficiently. For example:
        </Typography>
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          If one piece is at 30 and the other at 50, rolling a 2 or 3 on one of
          the dice can immediately advance a piece to the 90s. The probability
          of rolling a 2 or 3 on either die is approximately 36%. This makes the
          strategy over twice as efficient as simply maximizing sums.
        </Typography>
      </>
    ),
  },
  {
    title: "Naive Approach 2: Lookahead Sum-max",
    description: (
      <>
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          Another naive strategy is to improve upon sum-max by considering the
          next move. However, this approach is still limited as it often fails
          to account for long-term positioning.
        </Typography>
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          A more advanced strategy would involve evaluating multiple turns and
          considering both pieces' positions and probabilities.
        </Typography>
      </>
    ),
  },
  {
    title: "Play vs My AI",
    description: (
      <>
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          An AI for Prime Climb that evaluates moves
          using a top-down approach is being developed as well as a playable UI for the game. 
        </Typography>
        <img
          src="/assets/media/game theory/primeclimb2.png"
          alt="Prime Climb Rules"
          style={{
            display: "block",
            margin: "16px auto",
            maxWidth: "100%",
            borderRadius: "8px",
          }}
        />
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          A demo for playing the game is a work in progress but also potentially copyrighted.  
        </Typography>
      </>
    ),
  },
];

const GameTheoryPage = () => {
  const [expanded, setExpanded] = useState("What is Prime Climb?");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="w-full max-w-5xl">
      <h1 className="text-5xl font-bold mb-8 mt-6">Solving Prime Climb (WIP)</h1>
        <Typography
          variant="subtitle1"
          className="mb-8 text-gray-300"
          style={{ marginBottom: "24px" }}
        >
          A Case Study exploring strategies and algorithms for Prime Climb.
        </Typography>

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
      </div>
    </div>
  );
};

export default GameTheoryPage;
