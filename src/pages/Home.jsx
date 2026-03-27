import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const GALLERY_IMAGE_COUNT = 64;

const rotatingRoles = ["Software Engineer", "Cyber Security", "Fullstack Developer"];

const blogs = [
  {
    title: "Gallery",
    subtitle: "A year in the life of Tim Cao",
    href: "/blogs/gallery",
    image: "/assets/media/blog_covers/me_1.jpg",
    hoverEffect: "gallery",
  },
  {
    title: "Music",
    subtitle: "Sample some of my past works!",
    href: "/blogs/music",
    image: "/assets/media/blog_covers/music.png",
    hoverEffect: "music",
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
    hoverEffect: "spin",
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
    href: "/blogs/guess",
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

const getImagePath = (index) => `/assets/media/Photo Gallery/${index + 1}.jpg`;

const Home = () => {
  const textRef = useRef(null);
  const cursorRef = useRef(null);
  const audioRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoverSpeed, setHoverSpeed] = useState(1000);

  // Preload gallery images and hover audio
  useEffect(() => {
    for (let i = 0; i < GALLERY_IMAGE_COUNT; i++) {
      const img = new Image();
      img.src = getImagePath(i);
    }

    audioRef.current = new Audio("/assets/media/audio/hover_sound.mp3");
    audioRef.current.preload = "auto";

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  // Typing animation
  useEffect(() => {
    let charIndex = 0;
    let roleIndex = 0;
    let isDeleting = false;
    let timeoutId = null;

    const type = () => {
      if (!textRef.current) return;

      const currentRole = rotatingRoles[roleIndex];

      if (isDeleting) {
        textRef.current.textContent = currentRole.substring(0, charIndex--);
      } else {
        textRef.current.textContent = currentRole.substring(0, charIndex++);
      }

      if (!isDeleting && charIndex === currentRole.length) {
        timeoutId = setTimeout(() => {
          isDeleting = true;
          timeoutId = setTimeout(type, 50);
        }, 500);
        return;
      }

      if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % rotatingRoles.length;
      }

      timeoutId = setTimeout(type, isDeleting ? 50 : 100);
    };

    type();

    const blinkCursor = setInterval(() => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = cursorRef.current.style.opacity === "0" ? "1" : "0";
      }
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(blinkCursor);
    };
  }, []);

  // Gallery image rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % GALLERY_IMAGE_COUNT);
    }, hoverSpeed);
    return () => clearInterval(interval);
  }, [hoverSpeed]);

  const handleHover = (effect, isHovering) => {
    if (effect === "gallery") {
      setHoverSpeed(isHovering ? 300 : 1000);
    } else if (effect === "music" && audioRef.current) {
      if (isHovering) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="w-full max-w-5xl">
        {/* Hero */}
        <div className="space-y-4 text-left mb-12 mt-24 px-4">
          <h1 className="text-5xl font-bold mb-12">
            Hello, I'm Timothy
            <br />
            <span className="text-gray-400 text-4xl">
              <span ref={textRef} className="text-gray-500" />
              <span ref={cursorRef} className="text-gray-500">|</span>
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
            Chronically curious with a results-driven mindset. I'm someone who
            values problem definition, discussing theory, and delivering holistic,
            practical solutions.
          </p>
        </div>

        {/* Explore Grid */}
        <h2 className="text-3xl font-bold mb-12 px-4">Explore</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {blogs.map((blog) => {
            const isExternal = blog.href.startsWith("http");
            const Tag = isExternal ? "a" : Link;
            const linkProps = isExternal
              ? { href: blog.href, target: "_blank", rel: "noopener noreferrer" }
              : { to: blog.href };

            const isSpin = blog.hoverEffect === "spin";
            const isGallery = blog.hoverEffect === "gallery";

            return (
              <Tag
                key={blog.title}
                {...linkProps}
                className="flex flex-col rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform transition-transform hover:scale-105 bg-gray-700 max-w-lg mx-auto w-full"
              >
                <div
                  className={`relative w-full h-48 overflow-hidden ${isSpin ? "group flex items-center justify-center" : ""}`}
                  onMouseEnter={() => blog.hoverEffect && handleHover(blog.hoverEffect, true)}
                  onMouseLeave={() => blog.hoverEffect && handleHover(blog.hoverEffect, false)}
                >
                  <img
                    src={isGallery ? getImagePath(currentIndex) : blog.image}
                    alt={blog.title}
                    className={
                      isSpin
                        ? "max-h-[300%] transition-transform group-hover:rotate-180 group-hover:scale-125 duration-700"
                        : "w-full h-full object-cover"
                    }
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white">{blog.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{blog.subtitle}</p>
                </div>
              </Tag>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
