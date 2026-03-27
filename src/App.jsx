import React, { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Sidebar from "./components/Sidebar";
import TopNavMenu from "./components/TopNavMenu";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Music = lazy(() => import("./pages/blogs/Music"));
const MathArt = lazy(() => import("./pages/blogs/MathArt"));
const Youtube = lazy(() => import("./pages/blogs/Youtube"));
const Piano = lazy(() => import("./pages/blogs/Piano"));
const Astronomy = lazy(() => import("./pages/blogs/Astronomy"));
const Guess = lazy(() => import("./pages/blogs/Guess"));
const PrimeClimb = lazy(() => import("./pages/blogs/PrimeClimb"));
const Gallery = lazy(() => import("./pages/blogs/Gallery"));
const BoardGames = lazy(() => import("./pages/blogs/BoardGamesPage"));
const Scrabble = lazy(() => import("./pages/blogs/Scrabble"));
const TwentyFour = lazy(() => import("./pages/blogs/TwentyFour"));
const Othello = lazy(() => import("./pages/blogs/Othello"));

const MOBILE_BREAKPOINT = 768;

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-full">
    <div className="text-gray-400">Loading...</div>
  </div>
);

const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_BREAKPOINT);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Router basename="/">
      <div className="flex h-screen bg-gray-900 text-white">
        {isMobile ? <TopNavMenu /> : <Sidebar />}

        <div className={`${isMobile ? "mt-16" : "flex-1 p-6"} overflow-y-auto`}>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blogs/music" element={<Music />} />
              <Route path="/blogs/math-art" element={<MathArt />} />
              <Route path="/blogs/youtube" element={<Youtube />} />
              <Route path="/blogs/piano" element={<Piano />} />
              <Route path="/blogs/astronomy" element={<Astronomy />} />
              <Route path="/blogs/guess" element={<Guess />} />
              <Route path="/blogs/prime-climb" element={<PrimeClimb />} />
              <Route path="/blogs/gallery" element={<Gallery />} />
              <Route path="/blogs/board-games" element={<BoardGames />} />
              <Route path="/blogs/scrabble" element={<Scrabble />} />
              <Route path="/blogs/twenty-four" element={<TwentyFour />} />
              <Route path="/blogs/othello" element={<Othello />} />
            </Routes>
          </Suspense>
          <SpeedInsights />
        </div>
      </div>
    </Router>
  );
};

export default App;
