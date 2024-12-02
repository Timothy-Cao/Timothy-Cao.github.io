import React from "react";
import { useLocation, Link } from "react-router-dom";
import { FiHome, FiUser, FiBook, FiMail } from "react-icons/fi";
import { FaMusic, FaPuzzlePiece, FaStar, FaGamepad, FaImages } from "react-icons/fa";
import "../styles/ButtonShimmer.css";

const navItems = [
  { label: "Home", icon: <FiHome />, href: "/" },
  { label: "Experience", icon: <FiUser />, href: "/experience" },
  { label: "About", icon: <FiBook />, href: "/about" },
  { label: "Contact", icon: <FiMail />, href: "/contact" },
];

const blogItems = [
  { label: "Gallery", icon: <FaImages />, href: "/blogs/gallery" },
  { label: "Music", icon: <FaMusic />, href: "/blogs/music" },
  { label: "Math Art", icon: <FiBook />, href: "/blogs/math-art" },
  { label: "Astronomy", icon: <FaStar />, href: "/blogs/astronomy" },
  { label: "Puzzles", icon: <FaPuzzlePiece />, href: "/blogs/puzzles" },
  { label: "Game Theory", icon: <FaGamepad />, href: "/blogs/game-theory" },
];

const Sidebar = () => {
  const location = useLocation();

  const isActive = (href) => location.pathname === href;

  return (
    <div className="w-64 bg-gray-800 h-full flex flex-col p-6 space-y-4">
      <h1 className="text-3xl font-bold mb-6">Tim Cao</h1>
      <nav className="flex flex-col space-y-3 w-full">
        {navItems.map((item) => (
          <div className="button-wrapper" key={item.label}>
            <Link
              to={item.href}
              className={`button relative flex items-center space-x-3 p-2 rounded-md w-full ${
                isActive(item.href) ? "text-white" : "text-gray-400"
              }`}
            >
              <span>{item.icon}</span>
              <span className="btn-txt">{item.label}</span>
            </Link>
          </div>
        ))}
      </nav>
      <div className="border-t border-gray-700 pt-4">
        <h2 className="text-lg font-bold mb-3 text-gray-300">Blogs</h2>
        <div className="flex flex-col space-y-4">
          {blogItems.map((item) => (
            <div className="button-wrapper" key={item.label}>
              <Link
                to={item.href}
                className={`button relative flex items-center space-x-3 p-2 rounded-md w-full ${
                  isActive(item.href) ? "text-white" : "text-gray-400"
                }`}
              >
                <span>{item.icon}</span>
                <span className="btn-txt">{item.label}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
