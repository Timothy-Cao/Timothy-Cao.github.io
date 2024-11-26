import React, { useState, useEffect } from "react";

const rotatingRoles = ["fullstack developer", "technical lead", "designer"];

const Home = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prevIndex) => (prevIndex + 1) % rotatingRoles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-5xl font-bold mb-6">
        Hello, I'm Timothy
        <br />
        <span className="text-gray-400">
          A <span className="text-gray-500">{rotatingRoles[roleIndex]}</span>
        </span>
      </h1>
      <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
        Developer with a results-driven mindset who prioritizes clear problem
        definition, thrives on discussing underlying theories, and delivers
        holistic, practical solutions.
      </p>
    </div>
  );
};

export default Home;
