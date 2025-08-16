import React from "react";
import Typography from "@mui/material/Typography";
import FermiQuestions from "../../utils/FermiQuestions";
import "katex/dist/katex.min.css";

const Guess = () => {
  return (
    <div className="bg-gray-900 text-white px-4">
      <div className="max-w-5xl mx-auto space-y-8 mt-24 mb-12">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-4">
            Fermi Estimations
          </h1>
          <Typography variant="subtitle1" className="text-gray-300">
            Try to guess to the nearest order of magnitude! Turn the dial to adjust your estimation. 
          </Typography>
        </div>
        <div className="mt-8">
          <FermiQuestions />
        </div>
        
      </div>
    </div>
  );
};

export default Guess;