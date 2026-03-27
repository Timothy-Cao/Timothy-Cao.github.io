export default function AstronomyLoading() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Astronomy</h1>
      <p className="text-muted mb-12">Your daily dose of NASA</p>

      <div className="space-y-8 animate-pulse">
        <div className="w-full aspect-video rounded-xl bg-surface" />
        <div className="space-y-3">
          <div className="h-6 w-64 bg-surface rounded" />
          <div className="h-4 w-32 bg-surface rounded" />
          <div className="h-4 w-full bg-surface rounded" />
          <div className="h-4 w-full bg-surface rounded" />
          <div className="h-4 w-3/4 bg-surface rounded" />
        </div>
      </div>
    </div>
  );
}
