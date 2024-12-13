import React, { useState, useEffect } from "react";
import { FaEnvelope, FaInstagram, FaLinkedin, FaYoutube, FaGithub } from "react-icons/fa";
import { useForm, ValidationError } from "@formspree/react";
import "./../styles/LightupButton.css";

const icons = [
  { name: "", url: "mailto:tctctc888@gmail.com", icon: <FaEnvelope size={50} /> },
  { name: "", url: "https://www.linkedin.com/in/timothyc767", icon: <FaLinkedin size={50} /> },
  { name: "", url: "https://github.com/Timothy-Cao", icon: <FaGithub size={50} /> },
  { name: "", url: "https://youtube.com/@dodoman767", icon: <FaYoutube size={50} /> },
  { name: "", url: "https://www.instagram.com/timothy_cao/", icon: <FaInstagram size={50} /> },
];

const Contact = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [state, handleSubmit] = useForm("myzyavkz");
  const [activeButton, setActiveButton] = useState(0);

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(e);
    setShowPopup(true);
  };

  const triggerShimmerEffect = async () => {
    const buttons = document.querySelectorAll('.light-button button.bt');

    for (let i = 0; i < buttons.length; i++) {
      const button = buttons[i];

      button.classList.add('shimmer');

      await new Promise((resolve) => setTimeout(resolve, 100)); 

      button.classList.remove('shimmer');
    }

    await new Promise((resolve) => setTimeout(resolve, 2000)); 
  };


  useEffect(() => {
    const intervalHover = setInterval(() => {
      setActiveButton((prev) => {
        const nextIndex = (prev + 1) % icons.length;
        return nextIndex;
      });
      triggerShimmerEffect();
    }, 2000);

    const handleKeyPress = (e) => {
      if (e.key === "Escape") {
        closePopup();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      clearInterval(intervalHover);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [activeButton]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="w-full max-w-5xl space-y-8">
        <div className="text-left">
          <h1 className="text-5xl font-bold mb-4">Contact</h1>
          <p className="text-gray-400 text-lg">
            Hiring? Got a joke? Project Collab? Got a cat pic? <br></br> Shoot me a message.
          </p>
        </div>

        <div className="flex justify-start space-x-6">
          {icons.map((icon, index) => (
            <div
              key={index}
              className={`light-button ${index === activeButton ? "hover" : ""}`}
              onClick={() => window.open(icon.url)}
            >
              <button className="bt">
                <div className="light-holder">
                  <div className="dot"></div>
                  <div className="light"></div>
                </div>
                <div className="button-holder">
                  {icon.icon}
                  <p>{icon.name}</p>
                </div>
              </button>
            </div>
          ))}
        </div>

        <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Directly Message</h2>

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
                    placeholder="Name"
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
                    className="w-full mt-2 p-3 bg-gray-700 text-white rounded-md"
                    placeholder="Email"
                    required
                  />
                </div>
              </div>

              <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                Message
              </label>

              <textarea
                id="message"
                name="message"
                rows="4"
                className="w-full mt-2 p-3 bg-gray-700 text-white rounded-md"
                placeholder="Message"
                required
              ></textarea>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md"
                disabled={state.submitting}
              >
                {state.submitting ? "Sending..." : "Submit"}
              </button>

              <ValidationError prefix="Message" field="message" errors={state.errors} />
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
