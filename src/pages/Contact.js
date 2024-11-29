import React, { useState, useEffect } from "react";
import { FaEnvelope, FaInstagram, FaLinkedin, FaYoutube, FaGithub } from "react-icons/fa";

const Contact = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Escape") {
        closePopup();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="w-full max-w-5xl space-y-8">
        <div className="text-left">
          <h1 className="text-5xl font-bold mb-4">Contact</h1>
          <p className="text-gray-400 text-lg">
            I enjoy discussing just about anything. Ring me up if you dare.
          </p>
        </div>

        <div className="flex justify-start space-x-6">
          <a
            href="mailto:tctctc888@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white text-4xl"
          >
            <FaEnvelope />
          </a>
          <a
            href="https://instagram.com/timothy_cao"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white text-4xl"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.linkedin.com/in/timothyc767/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white text-4xl"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://youtube.com/@dodoman767"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white text-4xl"
          >
            <FaYoutube />
          </a>
          <a
            href="https://github.com/Timothy-Cao"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white text-4xl"
          >
            <FaGithub />
          </a>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Shoot me a message</h2>
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex-1">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full mt-2 p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full mt-2 p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  required
                  pattern="^[^@]+@[^@]+\.[^@]+$"
                  title="Please enter a valid email address."
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-300"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                className="w-full mt-2 p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-md transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center relative">
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              &#x2715;
            </button>
            <p className="text-white mb-4">
              Timothy has temporarily disabled this message feature. Please use another form of communication.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
