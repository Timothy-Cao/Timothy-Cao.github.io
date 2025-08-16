import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PrimeClimb from "./PrimeClimbGame";

const primeClimbTopics = [
  {
    title: "What is Prime Climb?",
    description: (
      <>
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          Prime Climb is a math-based board game where the goal is to move two
          pieces from 0 to exactly 101 before other players. Players roll two
          dice (numbered 1 to 10) and use the basic four operations to move their pieces.
          Only natural number results are allowed.
        </Typography>
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          Here's a video explaining the rules of the board game. We'll simplify
          the rules to avoid using player cards.
        </Typography>
        <iframe
          src="https://www.youtube.com/embed/tWhVw3mTpPU"
          title="Prime Climb Gameplay"
          style={{
            display: "block",
            width: "100%",
            height: "360px",
            maxWidth: "500px",
            maxHeight: "500px",
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
    title: "The Goal",
    description: (
      <>
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          In this case study, we aim to investigate how to optimally play the game,
          specifically focusing on the core gameplay mechanics of Prime Climb.
          This also helps prevent any legal issues when recreating a playable version.
        </Typography>
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          In our simplified version, we reduce the game to a single-player setup,
          where a player has two pawns and aims to get both to 101 in the fewest
          number of turns. A turn consists of rolling two dice and applying each die
          individually to move one of the pawns.
        </Typography>
      </>
    ),
  },
  {
    title: "Play the Game",
    description: (
      <>
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          Try the core gameplay out yourself to get a feel for the rules. This UI may not be refined but it can demonstrate the gameplay experience.
        </Typography>
        <PrimeClimb />
      </>
    ),
  },
  {
    title: "Tool 1: Generate Legal Moves",
    description: (
      <>
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          The first step in developing all algorithms is to create a method that determines
          all legal moves from a given position. This tool combines both dice into one
          method and produces unique pairs of possible outcomes. Sometimes, simply seeing
          all available legal moves can provide useful insights. For example, with a position
          of 30, 50 rolling 4, 5, you might not notice that you can land on 100, 50.
        </Typography>
      </>
    ),
  },
  {
    title: "Algorithm 1: Random Legal Moves",
    description: (
      <>
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          How can we measure the effectiveness of the Random Legal Moves algorithm? We will
          create a preliminary method to measure the Average Completion Time (AST) of an algorithm.
        </Typography>
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          The AST is the average number of turns it takes for an algorithm to move both pawns to 101.
          For a robot using random moves, it's difficult to calculate this mathematically, so we'll rely
          on simulating 100,000 games to get an idea.
        </Typography>
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          Random Robot AST over 100,000 games: 367.88
        </Typography>
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          If you played the game yourself, I hope you completed it in fewer moves.
          A fun question to explore: if the robot starts with two pawns in random positions and
          moves endlessly with random choices, what would the distribution of landed tiles look like?
        </Typography>
      </>
    ),
  },
  {
    title: "Algorithm 2: One Pawn at a Time",
    description: (
      <>
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          This robot maximizes the value of pawn #1 first. Only after this pawn reaches 101
          does it start focusing on maximizing pawn #2. Despite being a simple and naive strategy,
          having a clear goal in mind results in a 2100% speed increase.
        </Typography>

        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          <strong>Performance:</strong><br />
          One At A Time Robot AST over 100,000 games: <strong>17.03</strong>
        </Typography>
      </>
    ),

  },
  {
    title: "Algorithm 3: Maximize Sum Robot",
    description: (
      <>
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          This robot selects the move that maximizes the total sum of the two pawns' positions.
          It’s a straightforward, utilitarian strategy focused solely on optimizing the sum of the pawns' locations.
        </Typography>
    
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          <strong>Performance:</strong><br />
          Maximize Sum Robot AST over 100,000 games: <strong>12.45</strong>
        </Typography>
    
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          This approach is the final simple strategy before moving on to more complex optimizations,
          which will require significant effort and experimentation.
        </Typography>
      </>
    ),
    
  },
  {
    title: "Algorithm 4: Hotspot Robot",
    description: (
      <>
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          This heuristic tries to mimic my personal, human strategy in the game. The Hotspot Robot prioritizes strategic positions (hotspots) that set up big leaps toward 101. Hotspots are specific positions that, with the right move, can get a pawn close to or directly within a single dice roll of 101 (the End Zone).  
          Of course, the robot must also know what to do when it:
          <br></br>
          - Isn’t at a hotspot  
          - Can’t get to a hotspot  
          - Can’t jump from a hotspot to the End Zone  
          <br></br>
          So, I modeled my human intuition for playing this game into a structured priority list.
        </Typography>
    
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          <strong>Hotspot Robot’s Priority List:</strong>
          <ul>
            <li><strong>1. Finish the game:</strong> If a pawn can land on 101, take the win.</li>
            <li><strong>2. Move a pawn from a hotspot into the End Zone.</strong></li>
            <li><strong>3. Make a jump of over 60 in the total sum.</strong></li>
            <li><strong>4. Keep at least one pawn in a hotspot while maximizing the total sum.</strong></li>
            <li><strong>5. Maximize the sum:</strong> Moving a pawn into a hotspot is equivalent to an additional 10 in sum.</li>
          </ul>
        </Typography>
    
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          This algorithm feels quite specific because it's an attempt to articulate my personal intuition. The numbers are based on experience rather than formal analysis. The next topic will focus on optimizing these numbers for better performance.
        </Typography>
    
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          <strong>Hotspots:</strong> HOTSPOTS = [10, 11, 12, 13, 14, 19, 20, 23, 24, 25, 31, 32, 33, 46, 47, 48, 49, 50]
        </Typography>
    
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          <strong>Hotspot Robot (70,30) AST over 100,000 games:</strong> 11.05
        </Typography>
    
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          <strong>Optimizing Hotspot Robot Thresholds</strong>
          <br></br>
          After preliminary testing, we observed that adjusting the jump_threshold value of 60 can result in noticeable improvements. Additionally, optimizing the value assigned to landing on a hotspot can enhance performance, but we'll retain the current value of 10 for now.
        </Typography>
    
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          <strong>Testing Range:</strong> 20–90 (increments of 5)
        </Typography>
    
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          With a <strong>jump_threshold of 70</strong>, the robot achieved its best performance with an AST of <strong>10.95</strong>.
        </Typography>
    
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          <strong>Hotspot Robot (70,30) AST over 100,000 games:</strong> 10.95
        </Typography>
    
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          While we can gain some performance improvements with this intuitive method, it's likely that this is the limit of an approach based solely on human intuition.
        </Typography>
      </>
    ),
    
    
  },
  {
    title: "Algorithm 5: Sorted Tiles Robot",
    description: (
      <>
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          In previous algorithms, we focused on maximizing the sum of positions. But what if the tile's values
          are not directly correlated to their position? We now use a probability-based approach to determine the true value of each tile.
        </Typography>
    
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          For example, being on tile 95 gives a 21% chance of rolling a pair that reaches 101 in a single turn.
          On tiles 81 and 10, this probability drops to just 1%. We call this the "degree one probability"—the likelihood of reaching 101 in one turn.
          If a tile with a degree one probability rolls a fail-dice pair, it still has a chance of landing elsewhere,
          resulting in a "degree two probability" of 37.7% of reaching 101 within two turns. This logic continues with higher degrees.
        </Typography>
    
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          <strong>How It Works:</strong><br />
          Precomputed Scores: All probabilities (degrees 1 to 5) for every position are precomputed in advance.
        </Typography>
    
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          <strong>Robot Priority:</strong><br />
          1. Moves that send a pawn directly to 101.<br />
          2. Maximize the combined scores of pawns based on precomputed degree probabilities.
        </Typography>
    
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          <strong>Results:</strong><br />
          We tested five degree-based robots over 100,000 games each. Here’s a summary of their Average AST performance:
          <ul>
            <li>Degree 1 Robot: 10.70 AST</li>
            <li>Degree 2 Robot: 10.13 AST</li>
            <li>Degree 3 Robot: 10.21 AST</li>
            <li>Degree 4 Robot: 10.92 AST</li>
            <li>Degree 5 Robot: 12.82 AST</li>
          </ul>
          The Degree 2 Robot emerged as the most effective, achieving the lowest AST.
        </Typography>
    
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          Note: It may also be beneficial to explore a weighted combination of these degrees for potentially better outcomes.
        </Typography>
      </>
    ),
    
  },
  {
    title: "Algorithm 6: Stochastic Programming",
    description: (
      <>
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
        Since we're dealing with uncertainty, we can leverage stochastic programming and Markov chains. In Markov chains, the board positions and dice rolls define different states. We can model Prime Climb as an MDP (Markov Decision Process). Stochastic programming allows us to evaluate expected values and determine the average best path. The ultimate goal is to develop a (likely black-boxed) formula that takes input in the form of starting values and provides the expected number of turns to end for each option in the decision tree.
        </Typography>
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          This allows us to find a true priority path that the degree robots were trying to discover heuristically.
        </Typography>
      </>
    ),
  },
  {
    title: "Alternatives to explore: Deep Q Learning and other Neural Networks",
    description: (
      <>
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
        The leading model under consideration is a Deep Q-Network (DQN), also known as an actor-critic model, which can learn optimal strategies by mapping board states to actions. However, the challenge with using a neural network in such a stochastic environment with a large state space is that it can be very slow and computationally expensive. A neural network designed to be simple enough for me to interpret and implement would likely not be optimal. Instead, we plan to combine neural networks with other methods, such as using them to determine weights.
        </Typography>
        
      </>
    ),
  },{
    title: "Algorithm Demo",
    description: (
      <>
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          Let's see each of these algorithms perform with a live game.
        </Typography>
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          Change the seed for random dice rolls and observe the difference in choices as you scrub through each turn. 
        </Typography>
        <Typography variant="body2" style={{ marginBottom: "16px" }}>
          Which algorithm tends to align with your personal decisions as you play the game?
        </Typography>
      </>
    ),
  },
];

export default primeClimbTopics;
