import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TopNavMenu from "./components/TopNavMenu";
import Home from "./pages/Home";
import Experience from "./pages/Experience";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Music from "./pages/blogs/Music";
import MathArt from "./pages/blogs/MathArt";
import Astronomy from "./pages/blogs/Astronomy";
import Puzzles from "./pages/blogs/Puzzles";
import GameTheory from "./pages/blogs/GameTheory";
import Gallery from "./pages/blogs/Gallery";


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
    <Router>
      <div className="flex h-screen bg-gray-900 text-white">
        {isMobile ? (
          <TopNavMenu />
        ) : (
          <Sidebar />
        )}
        <div className={`${isMobile ? "mt-16" : "flex-1 p-6"} overflow-y-auto`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blogs/music" element={<Music />} />
            <Route path="/blogs/math-art" element={<MathArt />} />
            <Route path="/blogs/astronomy" element={<Astronomy />} />
            <Route path="/blogs/puzzles" element={<Puzzles />} />
            <Route path="/blogs/game-theory" element={<GameTheory />} />
            <Route path="/blogs/gallery" element={<Gallery />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
