import Image from "next/image";

export const revalidate = 3600;

interface APODData {
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  media_type: string;
  date: string;
  thumbnail_url?: string;
}

async function getAPOD(): Promise<APODData | null> {
  try {
    const key = process.env.NASA_API_KEY || "DEMO_KEY";
    const res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${key}&thumbs=true`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function AstronomyPage() {
  const data = await getAPOD();

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Astronomy</h1>
      <p className="text-muted mb-12">Your daily dose of NASA</p>

      {data ? (
        <div className="space-y-8">
          <div className="rounded-xl overflow-hidden border border-[rgba(255,255,255,0.08)]">
            {data.media_type === "video" ? (
              <iframe
                src={data.url}
                title={data.title}
                className="w-full aspect-video"
                style={{ border: "none" }}
                allowFullScreen
              />
            ) : (
              <Image
                src={data.hdurl || data.url}
                alt={data.title}
                width={1200}
                height={800}
                className="w-full h-auto"
                unoptimized
              />
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">{data.title}</h2>
            <p className="text-xs text-accent-dim mb-4">{data.date}</p>
            <p className="text-[#888888] leading-relaxed">{data.explanation}</p>
          </div>

          <p className="text-xs text-[#888888]">Source: NASA Astronomy Picture of the Day</p>
        </div>
      ) : (
        <div className="text-center py-20 text-[#888888]">
          <p>Unable to load today&apos;s astronomy picture. Please try again later.</p>
        </div>
      )}
    </div>
  );
}
