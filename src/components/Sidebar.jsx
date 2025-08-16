import React from "react";
import { useLocation, Link } from "react-router-dom";
import { FiHome, FiBook, FiMail } from "react-icons/fi";
import { FaMusic, FaPuzzlePiece, FaFilm, FaStar, FaGamepad, FaImages } from "react-icons/fa";
import "../styles/ButtonShimmer.css";

const navItems = [
  { label: "Home", icon: <FiHome className="icon-white" />, href: "/" },
  { label: "About", icon: <FiBook className="icon-white" />, href: "/about" },
  { label: "Contact", icon: <FiMail className="icon-white" />, href: "/contact" },
];

const blogItems = [
  { label: "Video Recs", icon: <FaFilm className="icon-white" />, href: "/blogs/youtube" },
  { label: "Gallery", icon: <FaImages className="icon-white" />, href: "/blogs/gallery" },
  { label: "Music", icon: <FaMusic className="icon-white" />, href: "/blogs/music" },
  { label: "Guess", icon: <FaPuzzlePiece className="icon-white" />, href: "/blogs/guess" },
  { label: "Board Games", icon: <FaGamepad className="icon-white" />, href: "/blogs/board-games" },
  { label: "Math Art", icon: <FiBook className="icon-white" />, href: "/blogs/math-art" },
  { label: "Astronomy", icon: <FaStar className="icon-white" />, href: "/blogs/astronomy" },
];

const Sidebar = () => {
  const location = useLocation();

  const isActive = (href) => location.pathname === href;

  return (
    <div className="w-64 bg-gray-800 h-full flex flex-col p-6 space-y-4">
      <Link
        to="/"
        className="text-3xl font-bold mb-6 text-white hover:text-gray-400"
      >
        Tim Cao
      </Link>

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
