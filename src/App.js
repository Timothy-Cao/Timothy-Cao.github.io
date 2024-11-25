import React from "react";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Welcome to My Portfolio</h1>
        <p>Content goes here...</p>
      </div>
    </div>
  );
}

export default App;
