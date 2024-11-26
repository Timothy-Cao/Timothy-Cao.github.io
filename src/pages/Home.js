import React, { useEffect, useRef } from "react";

const rotatingRoles = ["Fullstack Developer", "Technical Lead", "Designer"];

const blogs = [
  {
    title: "Musical Composition",
    subtitle: "Music Theory and Practice",
    href: "#",
    image: "/assets/media/blog_covers/music.png",
  },
  {
    title: "Math Art with Desmos",
    subtitle: "Exploring Mathematical Creativity",
    href: "#",
    image: "/assets/media/blog_covers/math.png",
  },
  {
    title: "Daily Dose of NASA",
    subtitle: "Space Science and Exploration",
    href: "#",
    image: "/assets/media/blog_covers/nasa.png",
  },
  {
    title: "Brain Teasers",
    subtitle: "Sharpen Your Thinking",
    href: "#",
    image: "/assets/media/blog_covers/puzzle.png",
  },
  {
    title: "Case Study: Prime Climb",
    subtitle: "Gamified Learning",
    href: "#",
    image: "/assets/media/blog_covers/game.png",
  },
  {
    title: "Photo Gallery: My Past Year",
    subtitle: "Visual Storytelling",
    href: "#",
    image: "/assets/media/blog_covers/gallery.png",
  },
];

const Home = () => {
  const textRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    let charIndex = 0;
    let roleIndex = 0;
    let isDeleting = false;

    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseBeforeDelete = 500;

    const type = () => {
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white ">
      <div className="w-full max-w-5xl ">
        <div className="space-y-4 text-left mb-12 mt-24">
          <h1 className="text-5xl font-bold mb-12">
            Hello, I'm Timothy
            <br />
            <span className="text-gray-400 text-4xl">
              A{" "}
              <span>
                <span ref={textRef} className="text-gray-500"></span>
                <span ref={cursorRef} className="text-gray-500">
                  |
                </span>
              </span>
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
            Chronically curious with a results-driven mindset. I'm someone who
            values problem definition, discussing theory, and delivering
            holistic, practical solutions.
          </p>
        </div>
        <h2 className="text-3xl font-bold mb-12">
        Explore
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-8 max-w-4xl">
          {blogs.map((blog, index) => (
            <a
              key={index}
              href={blog.href}
              className="flex flex-col rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform transition-transform hover:scale-105 bg-gray-700"
            >
              <div className="relative w-full h-48">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="object-cover w-full h-full"
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
