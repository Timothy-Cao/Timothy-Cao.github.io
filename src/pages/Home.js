import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const rotatingRoles = ["Software Engineer", "Cyber Security", "Fullstack Developer"];

const blogs = [
  {
    title: "Gallery",
    subtitle: "A year in the life of Tim Cao",
    href: "/blogs/gallery",
    image: "/assets/media/blog_covers/me_1.jpg",
  },
  {
    title: "Music",
    subtitle: "Sample some of my past works!",
    href: "/blogs/music",
    image: "/assets/media/blog_covers/music.png",
  },
  {
    title: "Video Recommendations",
    subtitle: "A collections of thought provoking video essays and discussion",
    href: "/blogs/youtube",
    image: "/assets/media/blog_covers/thinker.jpg",
  },
  {
    title: "Game Theory",
    subtitle: "A guide to ruining boardgame night.",
    href: "/blogs/board-games",
    image: "/assets/media/games/primeclimb.png",
  },
  {
    title: "Math Art",
    subtitle: "How bored have you've gotten in math class?",
    href: "/blogs/math-art",
    image: "/assets/media/blog_covers/math.png",
  },
  {
    title: "Long Jump Checkers AI",
    subtitle: "A twist on chinese checkers. Beat the AI.",
    href: "https://chinese-checkers.vercel.app/",
    image: "/assets/media/blog_covers/checkers.jpg",
  },  
  {
    title: "Brain Teasers",
    subtitle: "For those with itchy brains.",
    href: "/blogs/puzzles",
    image: "/assets/media/blog_covers/puzzle.gif",
  },
  {
    title: "Astronomy",
    subtitle: "Welcome to your daily dose of NASA.",
    href: "/blogs/astronomy",
    image: "/assets/media/blog_covers/nasa.png",
  },  
  {
    title: "Music Sheets Database",
    subtitle: "A collection of easy to access free upload sheets",
    href: "https://music-sheets-app-6315a.web.app/",
    image: "/assets/media/blog_covers/sheets.jpg",
  },
  {
    title: "Real Estate Demo",
    subtitle: "A simplified real estate demo dashboard with fake data",
    href: "https://real-estate-demo-one.vercel.app/",
    image: "/assets/media/blog_covers/house.jpg",
  },
];

const Home = () => {
  const textRef = useRef(null);
  const cursorRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoverSpeed, setHoverSpeed] = useState(1000);
  const audioRef = useRef(null);

  // Preload images and audio
  useEffect(() => {
    const imagePaths = Array.from(
      { length: 64 },
      (_, i) => `/assets/media/Photo Gallery/${i + 1}.jpg`
    );
    imagePaths.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    audioRef.current = new Audio("/assets/media/audio/hover_sound.mp3");
    audioRef.current.preload = "auto";

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  useEffect(() => {
    let charIndex = 0;
    let roleIndex = 0;
    let isDeleting = false;

    const type = () => {
      if (textRef.current) {
        const currentRole = rotatingRoles[roleIndex];
        if (isDeleting) {
          textRef.current.textContent = currentRole.substring(0, charIndex--);
        } else {
          textRef.current.textContent = currentRole.substring(0, charIndex++);
        }

        if (!isDeleting && charIndex === currentRole.length) {
          setTimeout(() => (isDeleting = true), 500);
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % rotatingRoles.length;
        }

        setTimeout(type, isDeleting ? 50 : 100);
      }
    };

    type();

    const blinkCursor = setInterval(() => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity =
          cursorRef.current.style.opacity === "0" ? "1" : "0";
      }
    }, 500);

    return () => clearInterval(blinkCursor);
  }, []);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 64);
    }, hoverSpeed);

    return () => clearInterval(imageInterval);
  }, [hoverSpeed]);

  const handleGalleryHover = (isHovering) => {
    setHoverSpeed(isHovering ? 300 : 1000);
  };

  const handleMusicHover = (isHovering) => {
    if (audioRef.current) {
      if (isHovering) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {
          console.warn("Audio play was prevented.");
        });
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  };

  const getImagePath = (index) => `/assets/media/Photo Gallery/${index + 1}.jpg`;

return (
  <div
    className="flex items-center justify-center min-h-screen bg-gray-900 text-white"
    style={{ paddingLeft: 16, paddingRight: 16 }}
  >
    <div className="w-full max-w-5xl">
      <div
        className="space-y-4 text-left mb-12 mt-24"
        style={{ marginLeft: "auto", marginRight: "auto" }}
      >
        <h1
          className="text-5xl font-bold mb-12"
          style={{ paddingLeft: 16, paddingRight: 16 }}
        >
          Hello, I'm Timothy
          <br />
          <span className="text-gray-400 text-4xl">
            <span>
              <span ref={textRef} className="text-gray-500"></span>
              <span ref={cursorRef} className="text-gray-500">|</span>
            </span>
          </span>
        </h1>
        <p
          className="text-lg text-gray-300 max-w-2xl leading-relaxed"
          style={{ paddingLeft: 16, paddingRight: 16 }}
        >
          Chronically curious with a results-driven mindset. I'm someone who
          values problem definition, discussing theory, and delivering holistic,
          practical solutions.
        </p>
      </div>

      <h2
        className="text-3xl font-bold mb-12"
        style={{ paddingLeft: 16, paddingRight: 16 }}
      >
        Explore
      </h2>

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto"
        style={{ maxWidth: 1024 }}
      >
        {blogs.map((blog, index) => (
          <Link
            key={index}
            to={blog.href}
            className="flex flex-col rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform transition-transform hover:scale-105 bg-gray-700"
            style={{
              width: "100%",
              maxWidth: 512,
              margin: "0 auto",
            }}
          >
            <div
              className={`relative w-full h-48 overflow-hidden ${
                blog.title === "Game Theory" ? "group" : ""
              }`}
              style={{
                display: blog.title === "Game Theory" ? "flex" : undefined,
                alignItems: blog.title === "Game Theory" ? "center" : undefined,
                justifyContent: blog.title === "Game Theory" ? "center" : undefined,
              }}
              onMouseEnter={() =>
                blog.title === "Gallery"
                  ? handleGalleryHover(true)
                  : blog.title === "Music"
                  ? handleMusicHover(true)
                  : null
              }
              onMouseLeave={() =>
                blog.title === "Gallery"
                  ? handleGalleryHover(false)
                  : blog.title === "Music"
                  ? handleMusicHover(false)
                  : null
              }
            >
              <img
                src={
                  blog.title === "Gallery"
                    ? getImagePath(currentIndex)
                    : blog.image
                }
                alt={blog.title}
                className={`${
                  blog.title === "Game Theory"
                    ? "transition-transform group-hover:rotate-180 group-hover:scale-125 duration-700"
                    : "w-full h-full object-cover"
                }`}
                style={{
                  width: blog.title === "Game Theory" ? "auto" : "100%",
                  height: blog.title === "Game Theory" ? "auto" : "100%",
                  maxHeight:
                    blog.title === "Game Theory" ? "300%" : undefined,
                  transformOrigin:
                    blog.title === "Game Theory" ? "center center" : undefined,
                }}
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white">
                {blog.title}
              </h3>
              <p className="text-sm text-gray-400 mt-1">{blog.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </div>
);

};

export default Home;
