export interface BoardGame {
  title: string;
  subtitle: string;
  href: string;
  image: string;
  status?: "coming-soon" | "external";
}

export const boardGames: BoardGame[] = [
  { title: "Scrabble Trainer", subtitle: "Train your scrabble vision with the 1000 most likely scrabbles.", href: "/playground/games/scrabble", image: "/assets/media/games/scrabble.png" },
  { title: "Math Game 24", subtitle: "Test your math speed with the card game 24 and its variants.", href: "/playground/games/24", image: "/assets/media/games/24.png" },
  { title: "Chinese Checkers AI", subtitle: "Try your luck against my AI on this niche house rule version of the game", href: "https://chinese-checkers.vercel.app/", image: "/assets/media/blog_covers/checkers.jpg", status: "external" },
];
