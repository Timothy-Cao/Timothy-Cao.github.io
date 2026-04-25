export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://timothy-cao.github.io";

export const siteConfig = {
  name: "Timothy Cao",
  title: "Timothy Cao | Software Engineer & Creator",
  description: "Personal portfolio of Timothy Cao, software engineer, composer, and creator.",
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}
