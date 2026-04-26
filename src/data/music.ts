export type CompositionCategory = "original" | "ai-played" | "ai-generated";

export interface Composition {
  title: string;
  description: string;
  type: "audio" | "video";
  src: string;
  isFavorite: boolean;
  category: CompositionCategory;
}

export const compositions: Composition[] = [
  // --- Original compositions (written and produced by me) ---
  { title: "Dodoman's Theme", description: "Written in 2021 for symphonic orchestra. Inspired by Schubert's Ständchen.", type: "audio", src: "/assets/media/audio/dodomans_theme.mp3", isFavorite: true, category: "original" },
  { title: "Journey of the Dodo", description: "2025, this symphonic piece features a horn and oboe-led melody", type: "audio", src: "/assets/media/audio/journey_of_the_dodo.mp3", isFavorite: true, category: "original" },
  { title: "March Challenge", description: "Written in 2024, featuring piano and harp.", type: "audio", src: "/assets/media/audio/MarchRemixChallenge.mp3", isFavorite: true, category: "original" },
  { title: "My September", description: "Written in 2023, for solo piano.", type: "audio", src: "/assets/media/audio/myseptember.mp3", isFavorite: true, category: "original" },
  { title: "FL Studio Test", description: "Written in 2025.", type: "audio", src: "/assets/media/audio/First taste of FL Studio.mp3", isFavorite: false, category: "original" },
  { title: "Ringtone challenge", description: "A little ms ost inspired ringtone challenge", type: "audio", src: "/assets/media/audio/ms_ringtone.mp3", isFavorite: false, category: "original" },
  { title: "Bongo first", description: "Music was written around the bongo line", type: "audio", src: "/assets/media/audio/1hr_challenge.mp3", isFavorite: false, category: "original" },
  { title: "8 Bit Nostalgia", description: "Written in 2021, for solo piano (synth).", type: "audio", src: "/assets/media/audio/8_bit_nostalgia.mp3", isFavorite: false, category: "original" },
  { title: "Three Hands", description: "Written in 2022, for piano (1.5) duet.", type: "audio", src: "/assets/media/audio/4hand_remix.mp3", isFavorite: false, category: "original" },
  { title: "Game OST 4", description: "Written in 2020, for orchestra. Inspiration from Sonny.", type: "audio", src: "/assets/media/audio/Game_OST_4.mp3", isFavorite: false, category: "original" },
  { title: "Sadge in C", description: "Written in 2019, for solo piano (synth).", type: "audio", src: "/assets/media/audio/sadgeC.mp3", isFavorite: false, category: "original" },
  { title: "Pudding's Day Off", description: "Written in 2022, for solo piano.", type: "audio", src: "/assets/media/audio/Puddings_day_off.mp3", isFavorite: false, category: "original" },
  { title: "Game OST 2", description: "Written in 2019, for orchestra.", type: "audio", src: "/assets/media/audio/Game_OST_3.mp3", isFavorite: false, category: "original" },
  { title: "Violin Nostalgia", description: "Written in 2018, for violin and piano.", type: "audio", src: "/assets/media/audio/violin_nostalgia.mp3", isFavorite: false, category: "original" },
  { title: "March of the Clowns", description: "Written in 2014, for wind quintet", type: "audio", src: "/assets/media/audio/March_of_the_clowns.mp3", isFavorite: false, category: "original" },

  // --- AI-played: pieces I wrote, performed by AI ---
  { title: "The Theme of Dodoman", description: "AI playback of my 2021 orchestral piece.", type: "audio", src: "/assets/media/audio/ai-played/dodomans_theme.mp3", isFavorite: true, category: "ai-played" },
  { title: "Journey of the Dodo", description: "AI rendition of my 2025 symphonic piece.", type: "audio", src: "/assets/media/audio/ai-played/journey_of_the_dodo.mp3", isFavorite: true, category: "ai-played" },
  { title: "My September", description: "AI rendition of my 2023 solo piano piece.", type: "audio", src: "/assets/media/audio/ai-played/my_september.mp3", isFavorite: true, category: "ai-played" },
  { title: "3 Hands", description: "AI rendition of my 2022 piano duet.", type: "audio", src: "/assets/media/audio/ai-played/three_hands.mp3", isFavorite: false, category: "ai-played" },

  // --- AI-generated: produced by AI with minor musical input from me ---
  { title: "A Dodo Takes Flight", description: "Fully AI generated, with minor musical input from me.", type: "audio", src: "/assets/media/audio/ai-generated/a_dodo_takes_flight.mp3", isFavorite: false, category: "ai-generated" },
  { title: "Feather of My Opponent", description: "Fully AI generated, with minor musical input from me.", type: "audio", src: "/assets/media/audio/ai-generated/feather_of_my_opponent.mp3", isFavorite: false, category: "ai-generated" },
  { title: "Flight Across 5 Oceans", description: "Fully AI generated, with minor musical input from me.", type: "audio", src: "/assets/media/audio/ai-generated/flight_across_5_oceans.mp3", isFavorite: false, category: "ai-generated" },
  { title: "My Beak is Yours", description: "Fully AI generated, with minor musical input from me.", type: "audio", src: "/assets/media/audio/ai-generated/my_beak_is_yours.mp3", isFavorite: false, category: "ai-generated" },
  { title: "Still a Bird of the Nest", description: "Fully AI generated, with minor musical input from me.", type: "audio", src: "/assets/media/audio/ai-generated/still_a_bird_of_the_nest.mp3", isFavorite: false, category: "ai-generated" },
];
