import React from "react";
import { FiHome, FiUser, FiBook, FiMail } from "react-icons/fi";
import { FaMusic, FaPuzzlePiece, FaStar, FaGamepad, FaImages } from "react-icons/fa";

const navItems = [
    { label: "Home", icon: <FiHome />, href: "/" },
    { label: "Experience", icon: <FiUser />, href: "/experience" },
    { label: "About", icon: <FiBook />, href: "/about" },
    { label: "Contact", icon: <FiMail />, href: "/contact" },
  ];
  

const blogItems = [
  { label: "Music", icon: <FaMusic />, href: "#" },
  { label: "Math Art", icon: <FiBook />, href: "#" },
  { label: "Astronomy", icon: <FaStar />, href: "#" },
  { label: "Puzzles", icon: <FaPuzzlePiece />, href: "#" },
  { label: "Game Theory", icon: <FaGamepad />, href: "#" },
  { label: "Gallery", icon: <FaImages />, href: "#" },
];

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 h-full flex flex-col p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">My Portfolio</h1>
      <nav className="flex flex-col space-y-4 w-full">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex items-center space-x-3 text-gray-400 hover:text-white hover:bg-gray-700 p-2 rounded-md w-full"
          >
            {item.icon}
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
      <div className="border-t border-gray-700 pt-4">
        <h2 className="text-lg font-bold mb-3 text-gray-300">Blogs</h2>
        {blogItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex items-center space-x-3 text-gray-400 hover:text-white hover:bg-gray-700 p-2 rounded-md w-full"
          >
            {item.icon}
            <span>{item.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
