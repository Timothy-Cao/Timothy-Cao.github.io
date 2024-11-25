import React from "react";
import { FiHome, FiUser, FiCode, FiBook, FiMail } from "react-icons/fi";

const navItems = [
  { label: "Explore", icon: <FiHome />, href: "#" },
  { label: "Experience", icon: <FiUser />, href: "#" },
  { label: "Projects", icon: <FiCode />, href: "#" },
  { label: "Services", icon: <FiBook />, href: "#" },
  { label: "Contact", icon: <FiMail />, href: "#" },
];

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 h-full flex flex-col items-start p-6 space-y-6">
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
    </div>
  );
};

export default Sidebar;
