import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const menuItems = [
  { label: "Home", href: "/" },
  { isDivider: true },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { isDivider: true },
  { label: "Gallery", href: "/blogs/gallery" },
  { label: "Youtube Recs", href: "/blogs/youtube" },
  { label: "Music", href: "/blogs/music" },
  { label: "Math Art", href: "/blogs/math-art" },
  { label: "Astronomy", href: "/blogs/astronomy" },
  { label: "Puzzles", href: "/blogs/puzzles" },
  { label: "Board Games", href: "/blogs/board-games" },
];

const TopNavMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div
      className="fixed top-0 left-0 w-full bg-gray-800 z-50 shadow-md"
      style={{ height: menuOpen ? "100%" : "auto" }}
    >
      <div className="flex items-center justify-between px-6 py-4 mt-2">
        <Link to="/" className="text-xl font-bold text-white hover:text-gray-400">
          Tim Cao
        </Link>

        <button
          className="text-white text-2xl focus:outline-none"
          onClick={toggleMenu}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {menuOpen && (
        <div className="flex flex-col space-y-4 px-6"> <br></br>
          <nav className="flex flex-col space-y-3">
            {menuItems.map((item, index) =>
              item.isDivider ? (
                <div
                  key={`divider-${index}`}
                  className="border-t border-gray-700 my-4"
                />
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-gray-400 hover:text-white p-2 rounded-md"
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </div>
  );
};

export default TopNavMenu;
