export interface PlaygroundCard {
  title: string;
  subtitle: string;
  href: string;
  coverImage: string;
  hoverEffect?: "gallery" | "music" | "spin" | "parallax" | "dial" | "keys" | "twinkle" | "grain";
}

export const playgroundCards: PlaygroundCard[] = [
  {
    title: "Gallery",
    subtitle: "A year in the life of Tim Cao",
    href: "/playground/gallery",
    coverImage: "/assets/media/blog_covers/me_1.jpg",
    hoverEffect: "gallery",
  },
  {
    title: "Music",
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
    title: "Board Games",
    subtitle: "A guide to ruining boardgame night.",
    href: "/playground/games",
    coverImage: "/assets/media/games/primeclimb.png",
    hoverEffect: "spin",
  },
  {
    title: "Math Art",
    subtitle: "How bored have you gotten in math class?",
    href: "/playground/math-art",
    coverImage: "/assets/media/blog_covers/math.png",
    hoverEffect: "parallax",
  },
  {
    title: "Fermi Estimations",
    subtitle: "For those with itchy brains",
    href: "/playground/fermi",
    coverImage: "/assets/media/puzzles/fermi.jpg",
    hoverEffect: "dial",
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
    title: "Mapledle",
    subtitle: "Guess the MapleStory OST",
    href: "/playground/mapledle",
    coverImage: "/assets/media/blog_covers/mushroom.svg",
  },
];

export const GALLERY_IMAGE_COUNT = 64;
