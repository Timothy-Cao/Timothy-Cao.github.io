export const bio = {
  greeting: "Hello, I'm Tim",
  personal: "Born 2000, grew up Markham Canada. Sometimes ENFP sometimes INTP. Recognizable by bouncy walk and attachment to backpack.",
  pudding: "She loves celery and hates vacuum. Chonky (4 kg).",
};

export const hobbies = [
  "Tennis",
  "Badminton",
  "Rock Climbing",
  "Music Composition",
  "Piano",
  "Board Games",
  "Video Games",
];

export const currentInterests = [
  "Violin",
  "Sci-Fi",
  "GeoGuessr",
  "Japanese",
  "Vibe Coding",
  "Jam",
];

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
}

export const timeline: TimelineEntry[] = [
  { year: "Age 0", title: "Born", description: "Markham, Canada" },
  { year: "Age 4", title: "Coledale PS", description: "Where it all started" },
  { year: "Age 9", title: "William Berczy PS", description: "Moved schools" },
  { year: "Age 14", title: "Markham District HS", description: "High school years" },
  { year: "Age 19", title: "University of Waterloo", description: "BCS degree with internships in government, pre-seed startups, big tech, and AR companies" },
  { year: "Age 23", title: "Canadian Startup", description: "Joined a Canadian startup after graduation" },
  { year: "Age 25", title: "ByteDance, California", description: "Security engineering at ByteDance" },
];

export const websiteCredits = {
  builtWith: "This site was built using Next.js and styled with Tailwind CSS and Framer Motion. It's hosted on Vercel.",
  disclaimer: "I have no affiliation with Desmos, Prime Climb, Musescore, SpongeBob, NASA, JStris, or Chess.com. All references, resources, or materials related to these entities are used for informational or personal purposes only. No copyright infringement is intended, and all rights remain with their respective owners.",
};
