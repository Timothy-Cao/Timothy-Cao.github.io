import React, { useState, useEffect } from "react";
import { Tabs, Tab, Box } from "@mui/material";

const About = () => {
  const [value, setValue] = useState(0);
  const [xkcdComic, setXkcdComic] = useState(null);
  const [numberFact, setNumberFact] = useState("");

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const comicNumber = Math.floor(Math.random() * 3000) + 1;
        
        // XKCD API fetch
        const xkcdResponse = await fetch(`https://xkcd.com/${comicNumber}/info.0.json`);
        if (!xkcdResponse.ok) throw new Error("Failed to fetch XKCD data");
        const xkcdData = await xkcdResponse.json();
        setXkcdComic(xkcdData);
  
        // Numbers API fetch
        const numberResponse = await fetch("https://numbersapi.com/random");
        if (!numberResponse.ok) throw new Error("Failed to fetch number fact");
        const numberData = await numberResponse.text();
        setNumberFact(numberData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleTabChange} aria-label="about-tabs">
            <Tab label="Experience" />
            <Tab label="Hobbies" />
            <Tab label="Test" />
          </Tabs>
        </Box>
        {value === 0 && (
          <Box p={3}>
            <h1 className="text-2xl font-bold">Experience</h1>
            <p>My name is Timothy Cao. I'm a software developer from the University of Waterloo.</p>
          </Box>
        )}
        {value === 1 && (
          <Box p={3}>
            <h1 className="text-2xl font-bold">test</h1>
            <p> test.</p>
          </Box>
        )}
        {value === 2 && (
          <Box p={3}>
            <h1 className="text-2xl font-bold">Test</h1>
            <p>test.</p>
          </Box>
        )}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4">Random XKCD Comic</h2>
          {xkcdComic ? (
            <div className="space-y-4">
              <img src={xkcdComic.img} alt={xkcdComic.alt} className="rounded-md" />
              <p className="italic">{xkcdComic.title}</p>
            </div>
          ) : (
            <p>Loading comic...</p>
          )}
        </div>
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg mt-8">
          <h2 className="text-xl font-bold mb-4">Random Number Fact</h2>
          {numberFact ? <p>{numberFact}</p> : <p>Loading fact...</p>}
        </div>
      </div>
    </div>
  );
};

export default About;
