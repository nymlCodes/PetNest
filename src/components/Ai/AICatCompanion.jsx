"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const BRAND = {
  tan: "#F1E4D0",
  tanShade: "#DEC9A6",
  ink: "#2B2116",
  blush: "#E8A9A0",
  brownDark: "#4E3A20",
};

// Waypoints trace a loop around the button's 64x64 footprint, which sits
// at this same fixed bottom-6/right-6 anchor (x:[-64,0], y:[-64,0]).
// `face` flips the sprite so it always walks facing the way it's moving.
const PATH = [
  { x: -100, y: 18, face: 1 },
  { x: -20, y: 26, face: 1 },
  { x: 18, y: 0, face: 1 },
  { x: 22, y: -60, face: -1 },
  { x: -30, y: -88, face: -1 },
  { x: -90, y: -75, face: -1 },
  { x: -110, y: -20, face: -1 },
  { x: -100, y: 18, face: 1 },
];
const TIMES = PATH.map((_, i) => i / (PATH.length - 1));

const CatSprite = () => (
  <svg width="72" height="40" viewBox="0 0 130 70" style={{ overflow: "visible" }}>
    {/* contact shadow */}
    <ellipse cx="62" cy="66" rx="30" ry="4" fill={BRAND.brownDark} opacity="0.15" />

    {/* tail — continuous wag, independent of walk path */}
    <motion.path
      d="M34 48 C 14 48, 4 30, 16 16"
      stroke={BRAND.tan}
      strokeWidth="7"
      strokeLinecap="round"
      fill="none"
      style={{ transformOrigin: "34px 48px" }}
      animate={{ rotate: [0, -10, 8, 0] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* back legs — walk-cycle bounce */}
    <motion.g
      animate={{ y: [0, 3, 0] }}
      transition={{ duration: 0.55, repeat: Infinity, ease: "easeInOut" }}
    >
      <rect x="46" y="56" width="5" height="12" rx="2.5" fill={BRAND.tanShade} />
      <rect x="60" y="56" width="5" height="12" rx="2.5" fill={BRAND.tanShade} />
    </motion.g>

    {/* body */}
    <ellipse cx="62" cy="46" rx="34" ry="15" fill={BRAND.tan} />

    {/* front legs — walk-cycle bounce, opposite phase, larger swing (playful) */}
    <motion.g
      animate={{ y: [3, 0, 3] }}
      transition={{ duration: 0.55, repeat: Infinity, ease: "easeInOut" }}
    >
      <rect x="78" y="57" width="5" height="12" rx="2.5" fill={BRAND.tanShade} />
      <motion.rect
        x="92"
        y="57"
        width="5"
        height="12"
        rx="2.5"
        fill={BRAND.tanShade}
        style={{ transformOrigin: "94.5px 58px" }}
        animate={{ rotate: [0, 22, -8, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.g>

    {/* head */}
    <circle cx="104" cy="28" r="15" fill={BRAND.tan} />
    <path d="M92 18 L96 4 L104 16 Z" fill={BRAND.tan} />
    <path d="M114 18 L118 6 L107 15 Z" fill={BRAND.tan} />
    <path d="M94 15 L96 8 L100 15 Z" fill={BRAND.blush} />

    {/* eye — blink */}
    <motion.circle
      cx="109"
      cy="27"
      r="2.2"
      fill={BRAND.ink}
      animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        times: [0, 0.86, 0.9, 0.94, 1],
        ease: "easeInOut",
      }}
      style={{ transformOrigin: "109px 27px" }}
    />

    {/* nose + whiskers */}
    <path d="M114 30 L118 30 L116 33 Z" fill={BRAND.blush} />
    <g stroke={BRAND.brownDark} strokeWidth="0.8" strokeLinecap="round" opacity="0.5">
      <path d="M116 31 L124 29" />
      <path d="M116 34 L124 35" />
    </g>
  </svg>
);

// hidden: pass `open` from the parent so the cat steps aside once the
// chat panel covers this corner of the screen.
const AICatCompanion = ({ hidden = false }) => {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const listener = (e) => setReduceMotion(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  if (reduceMotion) return null;

  return (
    <motion.div
      className="pointer-events-none fixed bottom-6 right-6 z-40"
      animate={{
        opacity: hidden ? 0 : 1,
        x: PATH.map((p) => p.x),
        y: PATH.map((p) => p.y),
        scaleX: PATH.map((p) => p.face),
      }}
      transition={{
        opacity: { duration: 0.25 },
        default: {
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          times: TIMES,
        },
      }}
    >
      <CatSprite />
    </motion.div>
  );
};

export default AICatCompanion;