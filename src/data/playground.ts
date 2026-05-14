export type PlaygroundCategory = "Game" | "Tool" | "AI" | "Music" | "Visual" | "Learn" | "Writing";

export interface PlaygroundCard {
  title: string;
  subtitle: string;
  href: string;
  coverImage: string;
  hoverEffect?: "gallery" | "music" | "spin" | "parallax" | "dial" | "keys" | "twinkle" | "grain";
  external?: boolean;
  comingSoon?: boolean;
  statusLabel?: string;
  category?: PlaygroundCategory;
}

export interface ComingSoonProject {
  title: string;
  subtitle: string;
  href: string;
  description: string;
  statusLabel: string;
  highlights: string[];
}

export const comingSoonProjects = {
  mapledle: {
    title: "Roguelike",
    subtitle: "Work in progress",
    href: "/playground/roguelike",
    description:
      "A compact game prototype is still being shaped. The placeholder stays public so the idea has a stable home while the mechanics settle.",
    statusLabel: "Prototype in progress",
    highlights: ["Core loop design", "Difficulty tuning", "Playable build"],
  },
  beats: {
    title: "Guess the Instruments",
    subtitle: "Identify instruments from the piece",
    href: "/playground/guess-the-instruments",
    description:
      "An ear-training idea for recognizing instruments inside short musical examples. The next useful milestone is a small set of reliable clips and answer feedback.",
    statusLabel: "Concept stage",
    highlights: ["Clip sourcing", "Answer feedback", "Score tracking"],
  },
  shelf: {
    title: "Procrastinator",
    subtitle: "A vague work in progress",
    href: "/playground/procrastinator",
    description:
      "A deliberately loose playground slot for an anti-productivity experiment. It is not ready for visitors yet, but it now has a cleaner landing state.",
    statusLabel: "Idea forming",
    highlights: ["Interaction model", "Content shape", "Launch criteria"],
  },
} satisfies Record<string, ComingSoonProject>;

export const playgroundCards: PlaygroundCard[] = [
  // --- Active cards ---
  {
    title: "Multitasker (Faker Game)",
    subtitle: "How many things can you juggle at once?",
    href: "https://multitasker-pi.vercel.app/",
    coverImage: "/multitasker.png",
    external: true,
    category: "Game",
  },
  {
    title: "Misconfigured",
    subtitle: "Brain blasting puzzle game",
    href: "https://misconfigured.vercel.app/",
    coverImage: "/misconfigured.png",
    external: true,
    category: "Game",
  },
  {
    title: "Wiki Distance",
    subtitle: "Shortest link path between two Wikipedia articles",
    href: "https://wiki-distance-game.vercel.app/",
    coverImage: "/wiki-distance.png",
    external: true,
    category: "Game",
  },
  {
    title: "Bound",
    subtitle: "An archived timeline of humanity's transformation",
    href: "https://bound-archive.vercel.app/",
    coverImage: "/assets/media/games/bound.svg",
    external: true,
    category: "Writing",
  },
  {
    title: "Lane Typer",
    subtitle: "Five-lane typing speed challenge",
    href: "https://lane-typer.vercel.app/",
    coverImage: "/lanetyper.png",
    external: true,
    category: "Game",
  },
  {
    title: "Geography Trainer",
    subtitle: "Test your world knowledge",
    href: "https://geotrainer-beta.vercel.app/",
    coverImage: "/assets/media/games/geotrainer.jpg",
    external: true,
    category: "Game",
  },
  {
    title: "Polar Intuition",
    subtitle: "Train your eye for polar functions",
    href: "https://polar-intuition.vercel.app/",
    coverImage: "/polar-training.png",
    external: true,
    category: "Game",
  },
  {
    title: "Dodo Dots",
    subtitle: "",
    href: "https://dodo-dots.vercel.app/",
    coverImage: "/dodo-dots.png",
    external: true,
    category: "Game",
  },
  {
    title: "Composition",
    subtitle: "Sample some of my past works!",
    href: "/playground/music",
    coverImage: "/assets/media/blog_covers/music.png",
    hoverEffect: "music",
    category: "Music",
  },
  {
    title: "Gabo Helper",
    subtitle: "Tutorial & Game manager",
    href: "https://gabo-tim.vercel.app/",
    coverImage: "/gabo.png",
    external: true,
    category: "Tool",
  },
  {
    title: "Fermi Estimations",
    subtitle: "Become a master guesser",
    href: "/playground/fermi",
    coverImage: "/assets/media/puzzles/fermi.jpg",
    hoverEffect: "dial",
    category: "Game",
  },
  {
    title: "Video Recommendations",
    subtitle: "Thought-provoking video essays",
    href: "/playground/videos",
    coverImage: "/assets/media/blog_covers/thinker.jpg",
    hoverEffect: "grain",
    category: "Learn",
  },
  {
    title: "Naruto Quizzes",
    subtitle: "Test your shinobi knowledge",
    href: "https://naruto-quiz.vercel.app/",
    coverImage: "/assets/media/blog_covers/naruto-quiz.png",
    external: true,
    category: "Game",
  },
  {
    title: "Piano YouTubers",
    subtitle: "Curated piano channels",
    href: "/playground/piano",
    coverImage: "/assets/media/blog_covers/sheets.jpg",
    hoverEffect: "keys",
    category: "Music",
  },
  {
    title: "Scrabble Trainer",
    subtitle: "Train top 1000 likelihood scrabbles.",
    href: "/playground/games/scrabble",
    coverImage: "/assets/media/games/scrabble.png",
    category: "Tool",
  },
  {
    title: "Math Game 24",
    subtitle: "Test your math speed.",
    href: "/playground/games/24",
    coverImage: "/assets/media/games/24.png",
    category: "Game",
  },
  {
    title: "Chinese Checkers AI",
    subtitle: "Try your luck against my AI on this niche house rule version",
    href: "https://chinese-checkers.vercel.app/",
    coverImage: "/assets/media/blog_covers/checkers.jpg",
    external: true,
    category: "AI",
  },
  {
    title: "Prime Climb AI",
    subtitle: "Statistical comparison of heuristic and strategic efficiency",
    href: "https://prime-climb-ai.vercel.app/",
    coverImage: "/assets/media/games/primeclimb.png",
    hoverEffect: "spin",
    external: true,
    category: "AI",
  },
  {
    title: "Harmonic Life",
    subtitle: "Musical cellular automata",
    href: "https://harmonic-life-five.vercel.app/",
    coverImage: "/assets/media/games/harmonic-life.svg",
    external: true,
    category: "Music",
  },
  {
    title: "2024 Gallery",
    subtitle: "A year in the life of Tim Cao",
    href: "/playground/gallery",
    coverImage: "/assets/media/Photo Gallery/1.jpg",
    hoverEffect: "gallery",
    category: "Visual",
  },
  {
    title: "Math Art",
    subtitle: "How bored have you gotten in math class?",
    href: "/playground/math-art",
    coverImage: "/assets/media/blog_covers/math.png",
    hoverEffect: "parallax",
    category: "Learn",
  },
  {
    title: "Astronomy",
    subtitle: "Your daily dose of NASA",
    href: "/playground/astronomy",
    coverImage: "/assets/media/blog_covers/nasa.png",
    hoverEffect: "twinkle",
    category: "Learn",
  },
  // --- Coming soon ---
  {
    title: comingSoonProjects.mapledle.title,
    subtitle: comingSoonProjects.mapledle.subtitle,
    href: comingSoonProjects.mapledle.href,
    coverImage: "",
    comingSoon: true,
    statusLabel: comingSoonProjects.mapledle.statusLabel,
  },
  {
    title: comingSoonProjects.beats.title,
    subtitle: comingSoonProjects.beats.subtitle,
    href: comingSoonProjects.beats.href,
    coverImage: "",
    comingSoon: true,
    statusLabel: comingSoonProjects.beats.statusLabel,
  },
  {
    title: comingSoonProjects.shelf.title,
    subtitle: comingSoonProjects.shelf.subtitle,
    href: comingSoonProjects.shelf.href,
    coverImage: "",
    comingSoon: true,
    statusLabel: comingSoonProjects.shelf.statusLabel,
  },
];

export const GALLERY_IMAGE_COUNT = 64;
