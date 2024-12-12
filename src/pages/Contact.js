import React, { useState, useEffect } from "react";
import { FaEnvelope, FaInstagram, FaLinkedin, FaYoutube, FaGithub } from "react-icons/fa";
import { useForm, ValidationError } from "@formspree/react";

const Contact = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [state, handleSubmit] = useForm("myzyavkz");

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(e);
    setShowPopup(true);
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
            There's not much I wouldn't chat about. Ring me up for anything.
          </p>
        </div>

        {/* Social Media Links */}
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

          {/* Conditional rendering for message content */}
          {state.succeeded ? (
            <div className="p-6 bg-green-500 rounded-lg shadow-lg text-center">
              <p className="text-2xl font-bold mb-2">Message Delivered</p>
              <p className="mt-2 text-lg">Thanks for reaching out!</p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="flex-1">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full mt-2 p-3 bg-gray-700 text-white rounded-md"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full mt-2 p-3 bg-gray-700 text-white rounded-md"
                    required
                    pattern="^[^@]+@[^@]+\.[^@]+$"
                    title="Enter a valid email address"
                  />
                </div>
              </div>

              <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="w-full mt-2 p-3 bg-gray-700 text-white rounded-md"
                placeholder="Type your message here"
                required
              ></textarea>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md"
                disabled={state.submitting}
              >
                {state.submitting ? "Sending..." : "Submit"}
              </button>

              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
              />
            </form>
          )}
        </div>
      </div>

    </div>
  );
};

export default Contact;
