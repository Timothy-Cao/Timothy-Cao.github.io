"use client";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
}

export default function BorderBeam({ className = "", size = 200, duration = 8 }: BorderBeamProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden rounded-full pointer-events-none ${className}`}>
      <div
        className="absolute inset-[-1px] rounded-full"
        style={{
          background: `conic-gradient(from 0deg, transparent, var(--color-accent), transparent 30%)`,
          animation: `spin ${duration}s linear infinite`,
        }}
      />
      <div className="absolute inset-[2px] rounded-full bg-surface" />
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
