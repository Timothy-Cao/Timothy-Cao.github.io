import React from "react";

const projects = [
  {
    title: "Project 1",
    description: "This is a brief description of Project 1.",
    tags: ["React", "Tailwind", "API"],
  },
  {
    title: "Project 2",
    description: "This is a brief description of Project 2.",
    tags: ["Next.js", "Animations"],
  },
  {
    title: "Project 3",
    description: "This is a brief description of Project 3.",
    tags: ["UI Design", "CSS"],
  },
];

const ProjectGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <div
          key={index}
          className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition"
        >
          <h2 className="text-xl font-bold mb-2">{project.title}</h2>
          <p className="text-gray-400 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="text-sm bg-blue-500 text-white py-1 px-2 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectGrid;
