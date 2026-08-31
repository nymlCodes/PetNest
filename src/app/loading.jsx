import React from 'react'
import { PawPrint } from 'lucide-react'

// Five paw prints, arranged like a footprint trail with a slight left/right
// stagger so it reads as a walking gait rather than a straight row.
const PAWS = [
  { x: 0, y: 10, rotate: -14, scale: 0.8 },
  { x: 16, y: -8, rotate: 10, scale: 0.9 },
  { x: 32, y: 10, rotate: -12, scale: 1.0 },
  { x: 48, y: -6, rotate: 8, scale: 1.05 },
  { x: 64, y: 10, rotate: -10, scale: 1.1 },
]

const INK = '#5C3A21'
const CLAY = '#8B5E34'
const SAND = '#C68B59'

export default function PetnestLoader() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5">
      <div className="relative h-16 w-72">
        {PAWS.map((p, i) => (
          <PawPrint
            key={i}
            size={30}
            strokeWidth={1.4}
            fill={i % 2 === 0 ? SAND : CLAY}
            className="absolute"
            style={{
              left: `${p.x}%`,
              top: `${20 + p.y}px`,
              color: i % 2 === 0 ? CLAY : INK,
              opacity: 0,
              '--rotate': `${p.rotate}deg`,
              '--scale': p.scale,
              animation: `pawStep 1.8s ease-in-out infinite`,
              animationDelay: `${i * 0.22}s`,
            }}
          />
        ))}
      </div>

      <p
        className="text-sm"
        style={{ color: CLAY, fontFamily: 'ui-sans-serif, system-ui, sans-serif', letterSpacing: '0.01em' }}
      >
        Fetching new friends
        <span style={{ display: 'inline-block', animation: 'dotFade 1.4s steps(1) infinite' }}>&hellip;</span>
      </p>

      <style>{`
        @keyframes pawStep {
          0% {
            opacity: 0;
            transform: translateY(6px) rotate(var(--rotate)) scale(calc(var(--scale) * 0.7));
          }
          28% {
            opacity: 1;
            transform: translateY(0) rotate(var(--rotate)) scale(var(--scale));
          }
          72% {
            opacity: 1;
            transform: translateY(0) rotate(var(--rotate)) scale(var(--scale));
          }
          100% {
            opacity: 0;
            transform: translateY(-4px) rotate(var(--rotate)) scale(calc(var(--scale) * 0.92));
          }
        }

        @keyframes dotFade {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          [style*="animation"] {
            animation: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </div>
  )
}