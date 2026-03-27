import React from "react";
import { useLocation, Link } from "react-router-dom";
import { FiHome, FiBook, FiMail } from "react-icons/fi";
import { FaMusic, FaPuzzlePiece, FaFilm, FaStar, FaGamepad, FaImages } from "react-icons/fa";
import "../styles/ButtonShimmer.css";

const navItems = [
  { label: "Home", icon: FiHome, href: "/" },
  { label: "About", icon: FiBook, href: "/about" },
  { label: "Contact", icon: FiMail, href: "/contact" },
];

const blogItems = [
  { label: "Video Recs", icon: FaFilm, href: "/blogs/youtube" },
  { label: "Gallery", icon: FaImages, href: "/blogs/gallery" },
  { label: "Music", icon: FaMusic, href: "/blogs/music" },
  { label: "Guess", icon: FaPuzzlePiece, href: "/blogs/guess" },
  { label: "Board Games", icon: FaGamepad, href: "/blogs/board-games" },
  { label: "Math Art", icon: FiBook, href: "/blogs/math-art" },
  { label: "Astronomy", icon: FaStar, href: "/blogs/astronomy" },
];

const NavLink = ({ item, isActive }) => {
  const Icon = item.icon;
  return (
    <div className="button-wrapper">
      <Link
        to={item.href}
        className={`button relative flex items-center space-x-3 p-2 rounded-md w-full ${
          isActive ? "text-white" : "text-gray-400"
        }`}
      >
        <span><Icon className="icon-white" /></span>
        <span className="btn-txt">{item.label}</span>
      </Link>
    </div>
  );
};

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <div className="w-64 bg-gray-800 h-full flex flex-col p-6 space-y-4">
      <Link to="/" className="text-3xl font-bold mb-6 text-white hover:text-gray-400">
        Tim Cao
      </Link>

      <nav className="flex flex-col space-y-3 w-full">
        {navItems.map((item) => (
          <NavLink key={item.label} item={item} isActive={pathname === item.href} />
        ))}
      </nav>

      <div className="border-t border-gray-700 pt-4">
        <h2 className="text-lg font-bold mb-3 text-gray-300">Blogs</h2>
        <div className="flex flex-col space-y-4">
          {blogItems.map((item) => (
            <NavLink key={item.label} item={item} isActive={pathname === item.href} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
