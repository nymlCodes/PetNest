"use client";

import { motion } from "framer-motion";

const BRAND = {
  brown: "#6B4C2A",
  brownDark: "#4E3A20",
  cream: "#FCF5EA",
  tan: "#F1E4D0",
  ink: "#2B2116",
  blush: "#E8A9A0",
};

const AIButton = ({ onClick, open }) => {
  return (
    <motion.button
      onClick={onClick}
      aria-label={open ? "Close PetNest AI" : "Open PetNest AI"}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full"
      style={{
        background: `linear-gradient(135deg, ${BRAND.brown} 0%, ${BRAND.brownDark} 100%)`,
        boxShadow: "0 12px 28px -6px rgba(107,76,42,0.45)",
      }}
    >
      {/* live indicator */}
      <span className="absolute right-1 top-1 flex h-3 w-3">
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
          style={{ background: "#8FD19E" }}
        />
        <span
          className="relative inline-flex h-3 w-3 rounded-full border-2"
          style={{ background: "#8FD19E", borderColor: BRAND.brownDark }}
        />
      </span>

      <svg width="34" height="34" viewBox="0 0 100 100" fill="none">
        {/* tail, wagging from its base */}
        <motion.path
          d="M70 78 C 90 78, 96 58, 84 46"
          stroke={BRAND.tan}
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
          style={{ transformOrigin: "70px 78px" }}
          animate={{ rotate: [0, 14, -6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* body */}
        <ellipse cx="50" cy="72" rx="26" ry="16" fill={BRAND.tan} />

        {/* head */}
        <circle cx="50" cy="42" r="24" fill={BRAND.tan} />

        {/* ears */}
        <path d="M28 30 L34 8 L46 26 Z" fill={BRAND.tan} />
        <path d="M72 30 L66 8 L54 26 Z" fill={BRAND.tan} />
        <path d="M31 26 L34 14 L42 25 Z" fill={BRAND.blush} />
        <path d="M69 26 L66 14 L58 25 Z" fill={BRAND.blush} />

        {/* eyes — blink on a loop */}
        <motion.g
          animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            times: [0, 0.85, 0.9, 0.95, 1],
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "50px 40px" }}
        >
          <circle cx="41" cy="40" r="3.4" fill={BRAND.ink} />
          <circle cx="59" cy="40" r="3.4" fill={BRAND.ink} />
        </motion.g>

        {/* nose + mouth */}
        <path d="M47 48 L53 48 L50 51 Z" fill={BRAND.blush} />
        <path
          d="M50 51 C 50 55, 44 56, 41 53 M50 51 C 50 55, 56 56, 59 53"
          stroke={BRAND.ink}
          strokeWidth="1.3"
          strokeLinecap="round"
          fill="none"
        />

        {/* whiskers */}
        <g stroke={BRAND.brownDark} strokeWidth="1" strokeLinecap="round" opacity="0.55">
          <path d="M20 44 L34 45" />
          <path d="M21 50 L34 49" />
          <path d="M80 44 L66 45" />
          <path d="M79 50 L66 49" />
        </g>
      </svg>
    </motion.button>
  );
};

export default AIButton;