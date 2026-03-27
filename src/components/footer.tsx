export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border py-8 mt-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
        <span>&copy; {new Date().getFullYear()} Timothy Cao. All rights reserved.</span>
        <span className="text-xs">Built with Next.js &amp; Framer Motion</span>
      </div>
    </footer>
  );
}
