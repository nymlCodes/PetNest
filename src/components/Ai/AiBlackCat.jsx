"use client";

import { motion } from "framer-motion";

// A sleek, lean black cat — narrow refined face, tall alert ears, amber
// "cat-eye" gaze, slender body. Poised and confident rather than round
// and cartoonish.
const FUR_TOP = "#3E3A35";
const FUR_BOTTOM = "#0F0E0D";
const FUR_EDGE = "#1C1A17";
const EYE = "#E7A94B";
const EYE_DEEP = "#B9791F";
const PINK = "#D98C8C";
const CREAM = "#F3ECDF";

const WRAP_STYLE = {
  position: "fixed",
  bottom: 76,
  right: 22,
  width: 70,
  height: 88,
  zIndex: 60,
  pointerEvents: "none",
};

const AIBlackCat = ({ hidden = false }) => {
  return (
    <motion.div
      style={WRAP_STYLE}
      animate={{ opacity: hidden ? 0 : 1, rotate: [-1, 1, -1] }}
      transition={{
        opacity: { duration: 0.25 },
        rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <svg
        width="70"
        height="88"
        viewBox="0 0 90 112"
        style={{ overflow: "visible", transformOrigin: "45px 102px" }}
      >
        <defs>
          <linearGradient id="catFur2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={FUR_TOP} />
            <stop offset="100%" stopColor={FUR_BOTTOM} />
          </linearGradient>
          <radialGradient id="contactShadow2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* contact shadow */}
        <ellipse cx="45" cy="103" rx="22" ry="6" fill="url(#contactShadow2)" />

        {/* tail — long, elegant, slow continuous sweep */}
        <motion.path
          d="M68 92 C 88 86, 92 54, 76 38 C 70 32, 62 37, 66 46
             C 73 58, 71 76, 54 86"
          fill="none"
          stroke="url(#catFur2)"
          strokeWidth="7"
          strokeLinecap="round"
          style={{ transformOrigin: "68px 92px" }}
          animate={{ rotate: [0, -6, 3, -4, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.3, 0.55, 0.8, 1],
          }}
        />
        <motion.path
          d="M68 92 C 88 86, 92 54, 76 38 C 70 32, 62 37, 66 46
             C 73 58, 71 76, 54 86"
          fill="none"
          stroke={FUR_EDGE}
          strokeWidth="7"
          strokeLinecap="round"
          opacity="0.45"
          style={{ transformOrigin: "68px 92px", mixBlendMode: "multiply" }}
          animate={{ rotate: [0, -6, 3, -4, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.3, 0.55, 0.8, 1],
          }}
        />

        {/* body — slender, upright, gentle breathing */}
        <motion.g
          style={{ transformOrigin: "45px 103px" }}
          animate={{ scaleY: [1, 1.014, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M45 40 C33 40 24 55 25 74 C25.4 89 31 98 45 98
               C59 98 64.6 89 65 74 C66 55 57 40 45 40 Z"
            fill="url(#catFur2)"
          />
          {/* subtle chest/shoulder highlight for form */}
          <path
            d="M32 56 C30 68 33 82 42 92"
            stroke="#514C45"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
            opacity="0.3"
          />
          {/* front paws, close together, refined */}
          <ellipse cx="38" cy="96" rx="5.5" ry="4" fill="url(#catFur2)" />
          <ellipse cx="52" cy="96" rx="5.5" ry="4" fill="url(#catFur2)" />
        </motion.g>

        {/* head — narrow, alert, slow regal tilt */}
        <motion.g
          style={{ transformOrigin: "45px 38px" }}
          animate={{ rotate: [0, 5, 5, -4, -4, 0, 0] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.18, 0.42, 0.58, 0.82, 0.94, 1],
          }}
        >
          {/* ears — tall, alert; only a rare subtle twitch */}
          <motion.g
            style={{ transformOrigin: "31px 16px" }}
            animate={{ rotate: [0, -4, 0, 0, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <path d="M31 16 L21 -6 L43 9 Z" fill="url(#catFur2)" />
            <path d="M30 9 L24 -3 L38 6 Z" fill={PINK} opacity="0.8" />
          </motion.g>
          <motion.g
            style={{ transformOrigin: "59px 16px" }}
            animate={{ rotate: [0, 0, 5, 0, 0] }}
            transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            <path d="M59 16 L69 -6 L47 9 Z" fill="url(#catFur2)" />
            <path d="M60 9 L66 -3 L52 6 Z" fill={PINK} opacity="0.8" />
          </motion.g>

          {/* head shape — narrower jaw than a round face */}
          <path
            d="M45 8 C33 8 25 17 25 27 C25 37 33 44 45 44
               C57 44 65 37 65 27 C65 17 57 8 45 8 Z"
            fill="url(#catFur2)"
          />

          {/* eyes — sharp amber cat-eye, upswept outer corner, half-lidded confidence */}
          <motion.g
            animate={{ scaleY: [1, 1, 0.15, 1, 1] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              times: [0, 0.92, 0.95, 0.98, 1],
              ease: "easeInOut",
            }}
          >
            <g style={{ transformOrigin: "36px 25px" }}>
              <path d="M28 26 Q36 16 45 23 Q37 30 28 26 Z" fill={EYE} />
              <path d="M28 26 Q36 16 45 23" stroke={EYE_DEEP} strokeWidth="0.8" fill="none" />
              <ellipse cx="37" cy="24" rx="1.5" ry="4.2" fill="#15130F" />
              <ellipse cx="35.8" cy="22.2" rx="0.6" ry="0.8" fill={CREAM} opacity="0.85" />
            </g>
            <g style={{ transformOrigin: "54px 25px" }}>
              <path d="M62 26 Q54 16 45 23 Q53 30 62 26 Z" fill={EYE} />
              <path d="M62 26 Q54 16 45 23" stroke={EYE_DEEP} strokeWidth="0.8" fill="none" />
              <ellipse cx="53" cy="24" rx="1.5" ry="4.2" fill="#15130F" />
              <ellipse cx="51.8" cy="22.2" rx="0.6" ry="0.8" fill={CREAM} opacity="0.85" />
            </g>
          </motion.g>

          {/* nose + smirking mouth */}
          <path d="M42.5 31 L47.5 31 L45 34 Z" fill={PINK} />
          <path
            d="M45 34 C45 36.5 41.5 38 39 36
               M45 34 C45 37.5 51 39 54 35.5"
            stroke="#211F1B"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
          />

          {/* whiskers */}
          <g stroke={CREAM} strokeWidth="0.85" strokeLinecap="round" opacity="0.7">
            <path d="M27 29 L11 26" />
            <path d="M27 32 L11 33" />
            <path d="M27 35 L12 40" />
            <path d="M63 29 L79 26" />
            <path d="M63 32 L79 33" />
            <path d="M63 35 L78 40" />
          </g>
        </motion.g>
      </svg>
    </motion.div>
  );
};

export default AIBlackCat;