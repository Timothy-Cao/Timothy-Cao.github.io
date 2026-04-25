"use client";

import "./globals.css";

export default function GlobalError({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <main className="min-h-screen flex items-center justify-center px-6 text-center">
          <div className="max-w-md">
            <title>Something went wrong</title>
            <p className="text-sm font-mono text-accent mb-3">500</p>
            <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
            <p className="text-muted mb-8">
              The page hit a temporary error.
            </p>
            <button
              onClick={() => unstable_retry()}
              className="inline-flex items-center justify-center rounded-full border border-accent/30 px-6 py-2.5 text-accent transition-colors hover:border-accent hover:bg-accent/10"
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
