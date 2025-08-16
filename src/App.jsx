import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TopNavMenu from "./components/TopNavMenu";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Music from "./pages/blogs/Music";
import MathArt from "./pages/blogs/MathArt";
import Youtube from "./pages/blogs/Youtube";
import Astronomy from "./pages/blogs/Astronomy";
import Guess from "./pages/blogs/Guess";
import GameTheory from "./pages/blogs/PrimeClimb";
import Gallery from "./pages/blogs/Gallery";
import BoardGamesPage from "./pages/blogs/BoardGamesPage";
import Scrabble from "./pages/blogs/Scrabble";
import TwentyFour from "./pages/blogs/TwentyFour";
import Othello from "./pages/blogs/Othello";
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Router basename="/"> {}
      <div className="flex h-screen bg-gray-900 text-white">
        {isMobile ? (
          <TopNavMenu />
        ) : (
          <Sidebar />
        )}
        <div className={`${isMobile ? "mt-16" : "flex-1 p-6"} overflow-y-auto`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blogs/music" element={<Music />} />
            <Route path="/blogs/math-art" element={<MathArt />} />
            <Route path="/blogs/youtube" element={<Youtube />} />
            <Route path="/blogs/astronomy" element={<Astronomy />} />
            <Route path="/blogs/guess" element={<Guess />} />
            <Route path="/blogs/prime-climb" element={<GameTheory />} />
            <Route path="/blogs/gallery" element={<Gallery />} />
            <Route path="/blogs/board-games" element={<BoardGamesPage />} />
            <Route path="/blogs/scrabble" element={<Scrabble />} />
            <Route path="/blogs/twenty-four" element={<TwentyFour />} />
            <Route path="/blogs/othello" element={<Othello />} />
          </Routes>
          <SpeedInsights />
        </div>
      </div>
    </Router>
  );
}

export default App;