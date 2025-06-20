import React, { useState, useEffect } from "react";
import { Tabs, Tab, Box } from "@mui/material";

const About = () => {
  const [value, setValue] = useState(0); 

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-5xl mx-auto space-y-8">
      <h1 className="text-5xl font-bold mb-4 ml-4">About</h1>
        <div className="text-left">
        </div>

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleTabChange}
            aria-label="about-tabs"
            textColor="inherit"
            TabIndicatorProps={{ style: { backgroundColor: "white" } }}
          >
            <Tab label="Personal" style={{ color: "white" }} />
            <Tab label="Professional" style={{ color: "white" }} />
            <Tab label="Website" style={{ color: "white" }} />
          </Tabs>
        </Box>

        {value === 0 && (
          <Box p={3}>
            <div>
              <img
                src="/assets/media/about/rabbit.jpg"
                alt="Rabbit"
                className="rounded-md shadow-md mb-4 w-full"
                style={{
                  maxHeight: "300px",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
              <p>
                Hi! I'm Timothy Cao. I’m 25 years old and grew up in Toronto, 
                Canada. My MBTI flip flops between INTP and ENFP. I'm often recognized
                in the crowd by the bounciness of my walk and the persistent presence of 
                a backpack. 
              </p>
                <br />
              <p>
                To stay fit I usually gravitate towards raquet sports and rock climbing although I enjoy all sports. My hobbies also include composition, piano, boardgames and videogames. I love a good discussion in philosophy, STEM or anything related to my hobbies but I most of all I love to learn about other's experiences and mastery. 
                <br />
                Oh yeah, and back in Canada, I have a pet rabbit. Pudding is of unknown age but she hates vacuums and she's a lil chonker. (4 kg)
              </p>
              <br />
            </div>
          </Box>
        )}

        {value === 1 && (
          <Box p={3}>
            <div>
              <img
                src="/assets/media/about/waterloo.png"
                alt="University of Waterloo"
                className="rounded-md shadow-md mb-4 w-full"
                style={{
                  maxHeight: "300px",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
              <p>
                My professional journey started in highschool where I worked in a pharmacy and as a math tutor. I graduated from the University of Waterloo and received my BCS in 2023. During my university internships, I've worked as a software engineer in the government, pre-seed startups, big tech companies and augmented reality companies.
              </p>
              <br />
              <p>
                After graduation I've joined a Canadian Startup for a few years, then freelanced for a Real Estate Platform. Today I'm working at Bytedance in California in security engineering. 
              </p>
              <br />
              <p>
                
              </p>
            </div>
          </Box>
        )}

        {value === 2 && (
          <Box p={3}>
            <div>
              <p>
              This site was built using React and styled with Tailwind and MUI. It's hosted on Vercel, with DNS managed through Cloudflare.
              The contact form is powered by Formspree for service and management and NASA's API is used for their photos. The design and UI are my own.
              </p>
              <br />
              <p>
              I have no affiliation with Desmos, Prime Climb, Musescore, SpongeBob, NASA, JStris, or Chess.com. 
              All references, resources, or materials related to these entities are used for informational or 
              personal purposes only. No copyright infringement is intended, and all rights remain with their respective owners.
              </p>
            </div>
          </Box>
        )}
      </div>
    </div>
  );
};

export default About;
