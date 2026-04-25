import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-24 text-center">
      <p className="text-sm font-mono text-accent mb-3">404</p>
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Page not found</h1>
      <p className="text-muted mb-8">
        That page is not part of the map.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-full border border-accent/30 px-6 py-2.5 text-accent transition-colors hover:border-accent hover:bg-accent/10"
      >
        Go home
      </Link>
    </div>
  );
}
