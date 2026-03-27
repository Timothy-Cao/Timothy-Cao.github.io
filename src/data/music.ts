export interface Composition {
  title: string;
  description: string;
  type: "audio" | "video";
  src: string;
  isFavorite: boolean;
}

export const compositions: Composition[] = [
  { title: "Dodoman's Theme", description: "Written in 2021 for symphonic orchestra. Inspired by Schubert's Ständchen.", type: "audio", src: "/assets/media/audio/dodomans_theme.mp3", isFavorite: true },
  { title: "Journey of the Dodo", description: "2025, this symphonic piece features a horn and oboe-led melody", type: "audio", src: "/assets/media/audio/journey_of_the_dodo.mp3", isFavorite: true },
  { title: "March Challenge", description: "Written in 2024, featuring piano and harp.", type: "audio", src: "/assets/media/audio/MarchRemixChallenge.mp3", isFavorite: true },
  { title: "My September", description: "Written in 2023, for solo piano.", type: "audio", src: "/assets/media/audio/myseptember.mp3", isFavorite: true },
  { title: "Test song (First taste of FL Studio)", description: "Written in 2025.", type: "audio", src: "/assets/media/audio/First taste of FL Studio.mp3", isFavorite: false },
  { title: "Ringtone challenge", description: "A little ms ost inspired ringtone challenge", type: "audio", src: "/assets/media/audio/ms_ringtone.mp3", isFavorite: false },
  { title: "Bongo first", description: "Music was written around the bongo line", type: "audio", src: "/assets/media/audio/1hr_challenge.mp3", isFavorite: false },
  { title: "8 Bit Nostalgia", description: "Written in 2021, for solo piano (synth).", type: "audio", src: "/assets/media/audio/8_bit_nostalgia.mp3", isFavorite: false },
  { title: "Three Hands", description: "Written in 2022, for piano (1.5) duet.", type: "audio", src: "/assets/media/audio/4hand_remix.mp3", isFavorite: false },
  { title: "Game OST 4", description: "Written in 2020, for orchestra. Inspiration from Sonny.", type: "audio", src: "/assets/media/audio/Game_OST_4.mp3", isFavorite: false },
  { title: "Sadge in C", description: "Written in 2019, for solo piano (synth).", type: "audio", src: "/assets/media/audio/sadgeC.mp3", isFavorite: false },
  { title: "Pudding's Day Off", description: "Written in 2022, for solo piano.", type: "audio", src: "/assets/media/audio/Puddings_day_off.mp3", isFavorite: false },
  { title: "Game OST 2", description: "Written in 2019, for orchestra.", type: "audio", src: "/assets/media/audio/Game_OST_3.mp3", isFavorite: false },
  { title: "Violin Nostalgia", description: "Written in 2018, for violin and piano.", type: "audio", src: "/assets/media/audio/violin_nostalgia.mp3", isFavorite: false },
  { title: "March of the Clowns", description: "Written in 2014, for wind quintet", type: "audio", src: "/assets/media/audio/March_of_the_clowns.mp3", isFavorite: false },
];
