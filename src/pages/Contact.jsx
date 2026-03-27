import React from "react";
import { useForm, ValidationError } from "@formspree/react";

const Contact = () => {
  const [state, handleSubmit] = useForm("myzyavkz");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(e);
  };

  return (
    <div className="flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="w-full max-w-5xl">
        <div className="space-y-4 text-left mb-12 mt-24">
          <h1 className="text-5xl font-bold mb-12">Contact</h1>
          <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
            Message me about anything except my car's extended warranty.
          </p>
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

              <div>
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
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md transition-colors"
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
