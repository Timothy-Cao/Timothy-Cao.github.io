export interface PlaygroundCard {
  title: string;
  subtitle: string;
  href: string;
  coverImage: string;
  hoverEffect?: "gallery" | "music" | "spin" | "parallax" | "dial" | "keys" | "twinkle" | "grain";
  external?: boolean;
  comingSoon?: boolean;
}

export const playgroundCards: PlaygroundCard[] = [
  // --- Active cards ---
  {
    title: "Multitasker (Faker Game)",
    subtitle: "How many things can you juggle at once?",
    href: "https://multitasker-pi.vercel.app/",
    coverImage: "/assets/media/games/multitasker.svg",
    external: true,
  },
  {
    title: "Misconfigured",
    subtitle: "Brain blasting puzzle game",
    href: "https://misconfigured.vercel.app/",
    coverImage: "/assets/media/games/misconfigured.jpg",
    external: true,
  },
  {
    title: "Fermi Estimations",
    subtitle: "Become a master guesser",
    href: "/playground/fermi",
    coverImage: "/assets/media/puzzles/fermi.jpg",
    hoverEffect: "dial",
  },
  {
    title: "Gabo Helper",
    subtitle: "Tutorial & Game manager",
    href: "https://gabo-tim.vercel.app/",
    coverImage: "/gabo.png",
    external: true,
  },
  {
    title: "Composition",
    subtitle: "Sample some of my past works!",
    href: "/playground/music",
    coverImage: "/assets/media/blog_covers/music.png",
    hoverEffect: "music",
  },
  {
    title: "Video Recommendations",
    subtitle: "Thought-provoking video essays",
    href: "/playground/videos",
    coverImage: "/assets/media/blog_covers/thinker.jpg",
    hoverEffect: "grain",
  },
  {
    title: "Harmonic Life",
    subtitle: "Musical cellular automata",
    href: "https://harmonic-life-five.vercel.app/",
    coverImage: "/assets/media/games/harmonic-life.svg",
    external: true,
  },
  {
    title: "Geography Trainer",
    subtitle: "Test your world knowledge",
    href: "https://geotrainer-beta.vercel.app/",
    coverImage: "/assets/media/games/geotrainer.jpg",
    external: true,
  },
  {
    title: "Polar Intuition",
    subtitle: "Train your eye for polar functions",
    href: "https://polar-intuition.vercel.app/",
    coverImage: "/assets/media/games/polarvision.jpg",
    external: true,
  },
  {
    title: "Prime Climb AI",
    subtitle: "Statistical comparison of heuristic and strategic efficiency",
    href: "https://web-lake-ten-27.vercel.app/",
    coverImage: "/assets/media/games/primeclimb.png",
    hoverEffect: "spin",
    external: true,
  },
  {
    title: "Chinese Checkers AI",
    subtitle: "Try your luck against my AI on this niche house rule version",
    href: "https://chinese-checkers.vercel.app/",
    coverImage: "/assets/media/blog_covers/checkers.jpg",
    external: true,
  },
  {
    title: "Scrabble Trainer",
    subtitle: "Train your scrabble vision with the 1000 most likely scrabbles",
    href: "/playground/games/scrabble",
    coverImage: "/assets/media/games/scrabble.png",
  },
  {
    title: "Math Game 24",
    subtitle: "Test your math speed with the card game 24 and its variants",
    href: "/playground/games/24",
    coverImage: "/assets/media/games/24.png",
  },
  {
    title: "2024 Gallery",
    subtitle: "A year in the life of Tim Cao",
    href: "/playground/gallery",
    coverImage: "/assets/media/blog_covers/me_1.jpg",
    hoverEffect: "gallery",
  },
  {
    title: "Math Art",
    subtitle: "How bored have you gotten in math class?",
    href: "/playground/math-art",
    coverImage: "/assets/media/blog_covers/math.png",
    hoverEffect: "parallax",
  },
  {
    title: "Piano YouTubers",
    subtitle: "Curated piano channels",
    href: "/playground/piano",
    coverImage: "/assets/media/blog_covers/sheets.jpg",
    hoverEffect: "keys",
  },
  {
    title: "Astronomy",
    subtitle: "Your daily dose of NASA",
    href: "/playground/astronomy",
    coverImage: "/assets/media/blog_covers/nasa.png",
    hoverEffect: "twinkle",
  },
  {
    title: "GenZ Typeracer",
    subtitle: "How fast can you skibidi type?",
    href: "https://genztyper.vercel.app/",
    coverImage: "/assets/media/games/typeracer.svg",
    external: true,
  },
  // --- Coming soon ---
  {
    title: "Mapledle",
    subtitle: "Guess the MapleStory OST",
    href: "/playground/mapledle",
    coverImage: "",
    comingSoon: true,
  },
  {
    title: "Tim's Beats",
    subtitle: "Toggle-beat maker with chord generation and melody improv",
    href: "/playground/beats",
    coverImage: "",
    comingSoon: true,
  },
  {
    title: "The Shelf",
    subtitle: "Books, shows, and films I recommend with short takes",
    href: "/playground/shelf",
    coverImage: "",
    comingSoon: true,
  },
];

export const GALLERY_IMAGE_COUNT = 64;
