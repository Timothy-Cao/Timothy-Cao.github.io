import React, { useState, useEffect } from "react";
import { Tabs, Tab, Box } from "@mui/material";

const About = () => {
  const [value, setValue] = useState(0); 
  const [xkcdComic, setXkcdComic] = useState(null);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchXKCDComic = async () => {
      try {
        const comicNumber = Math.floor(Math.random() * 3000) + 1;
        const xkcdResponse = await fetch(`/api/xkcd/${comicNumber}`);
        if (!xkcdResponse.ok) throw new Error("Failed to fetch XKCD comic");
        const xkcdData = await xkcdResponse.json();
        setXkcdComic(xkcdData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchXKCDComic();
  }, []);

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
                Hi! I'm Timothy Cao. I’m 24 years old and grew up in the
                Greater Toronto Area. I've always been a STEM-oriented person,
                but I first got hands-on experience working on a real project
                during the international robotics competition at FRC. However,
                the moment that solidified my path into computer science was in
                2016, when I saw AlphaGo beat Lee Sedol in Go.
              </p>
              <br />
              <p>
                I’d describe myself as an easygoing guy, but friends often say
                I’m analytical and eccentric. I enjoy staying connected with
                friends through sports, video games, and board games. My
                hobbies tend to come and go, but recently, I've been enjoying
                Scrabble, piano, badminton, and rock climbing. I also have a 
                pet rabbit named Pudding. She loves apples and hates vacuums.
              </p>
              <br />
              <p>Here's a few quotes that resonate with me and offer a glimpse into who I am.</p>
                <br />
              <blockquote className="italic mt-2">
                "The man who asks a question is a fool for a minute, the man who
                does not ask is a fool for life." — Confucius
              </blockquote>
              <br />
              <blockquote className="italic mt-2">
                "Mistakes are proof that you are trying." — Unknown
              </blockquote>
              <br />
              <blockquote className="italic mt-2">
                "We don't see things as they are, we see them as we are." —  Anaïs Nin
              </blockquote>
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
                I attended the University of Waterloo and received my BCS in
                2023. During my university years, I've interned at various
                companies in technical positions.
              </p>
              <br />
              <p>
                In 2019, I interned in Quality Assurance for the government,
                where I performed regression and load tests. Later, I entered
                the field of software engineering for the first time at eSight,
                an AR company focused on assisting the visually impaired, where
                I worked on low-level programming with embedded systems.
              </p>
              <br />
              <p>
                I also gained experience working on software at scale for a
                fleet management company and created dev tools for a
                safety-critical graphics company.
              </p>
              <br />
              <p>
                After graduation, I returned to an internship at a startup as a
                Technical Lead. Here, I led the development and aided the design
                of Tandem Experiences' App. Subsequently, I worked as a
                contractor and freelancer in fields as data annotation and real
                estate dashboard development.
              </p>
              <br />
              <p>
                My experiences across a range of company sizes have taught me to
                understand how code impacts systems at scale while also taking
                ownership of proportionally large deliverables through multiple
                rounds of feedback. My backend work sharpened my skills in
                creating API endpoints, and my frontend roles enhanced my React
                proficiency and attention to design.
              </p>
              <br />
              <p>
                Before university, I had worked in a pharmacy and as a math
                tutor, which provided me with transferable people skills that
                have improved my technical communication with customers and
                colleagues in a professional setting.
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
