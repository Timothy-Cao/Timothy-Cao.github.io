import React, { useEffect, useRef, useState } from "react";

const rotatingRoles = ["Fullstack Developer", "Technical Lead", "Designer"];

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
    title: "Game Theory",
    subtitle: "A guide to ruining boardgame night.",
    href: "/blogs/game-theory",
    image: "/assets/media/blog_covers/game.png",
  },
  {
    title: "Math Art",
    subtitle: "How bored have you've gotten in math class?",
    href: "/blogs/math-art",
    image: "/assets/media/blog_covers/math.png",
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
];

const Home = () => {
  const textRef = useRef(null);
  const cursorRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [hoverSpeed, setHoverSpeed] = useState(1000); 

  useEffect(() => {
    let charIndex = 0;
    let roleIndex = 0;
    let isDeleting = false;

    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseBeforeDelete = 500;

    const type = () => {
      if (textRef.current) {
        const currentRole = rotatingRoles[roleIndex];
        if (isDeleting) {
          textRef.current.textContent = currentRole.substring(0, charIndex--);
        } else {
          textRef.current.textContent = currentRole.substring(0, charIndex++);
        }

        if (!isDeleting && charIndex === currentRole.length) {
          setTimeout(() => (isDeleting = true), pauseBeforeDelete);
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % rotatingRoles.length;
        }

        setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
      }
    };

    type();

    const blinkCursor = setInterval(() => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity =
          cursorRef.current.style.opacity === "0" ? "1" : "0";
      }
    }, 500);

    return () => {
      clearInterval(blinkCursor);
    };
  }, []);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 64);
    }, hoverSpeed);

    return () => clearInterval(imageInterval);
  }, [hoverSpeed]);

  const getImagePath = (index) => `/assets/media/Photo Gallery/${index + 1}.jpg`; 
  
  useEffect(() => {
    const imagePaths = Array.from({ length: 62 }, (_, i) => `/assets/media/Photo Gallery/${i + 1}.jpg`);
    imagePaths.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-5xl">
        <div className="space-y-4 text-left mb-12 mt-24">
          <h1 className="text-5xl font-bold mb-12">
            Hello, I'm Timothy
            <br />
            <span className="text-gray-400 text-4xl">
              A{" "}
              <span>
                <span ref={textRef} className="text-gray-500"></span>
                <span ref={cursorRef} className="text-gray-500">|</span>
              </span>
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
            Chronically curious with a results-driven mindset. I'm someone who
            values problem definition, discussing theory, and delivering
            holistic, practical solutions.
          </p>
        </div>
        <h2 className="text-3xl font-bold mb-12">Explore</h2>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-8 max-w-4xl">
          {blogs.map((blog, index) => (
            <a
              key={index}
              href={blog.href}
              className="flex flex-col rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform transition-transform hover:scale-105 bg-gray-700"
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
                onMouseEnter={() => blog.title === "Gallery" && setHoverSpeed(300)} 
                onMouseLeave={() => blog.title === "Gallery" && setHoverSpeed(1000)} 
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
                    maxHeight: blog.title === "Game Theory" ? "300%" : undefined,
                    transformOrigin: blog.title === "Game Theory" ? "center center" : undefined,
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white">{blog.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{blog.subtitle}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
