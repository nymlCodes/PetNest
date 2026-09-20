"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PawPrint, X, Send, Sparkles } from "lucide-react";

const BRAND = {
  bg: "#FBF4EA",
  card: "#FFFFFF",
  brown: "#6B4C2A",
  brownDark: "#4E3A20",
  tan: "#F1E4D0",
  tanText: "#7A5B33",
  border: "#E9DCC3",
  text: "#2B2116",
  muted: "#8A7A63",
};

const TypingDots = () => (
  <div className="flex items-center gap-1 px-1">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: BRAND.tanText }}
        animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
        transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
      />
    ))}
  </div>
);

// Controlled component: `open` and `onClose` come from the parent that
// also owns AIButton, so there is a single source of truth for open state.
const AIChatModal = ({ open, onClose, onSendMessage }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing, open]);

  const send = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", text: trimmed },
    ]);
    setInput("");

    if (!onSendMessage) {
      console.warn("AIChatModal: pass an onSendMessage(text) prop to connect a real AI response.");
      return;
    }

    setTyping(true);
    try {
      const reply = await onSendMessage(trimmed);
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", text: reply },
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="fixed z-50 flex flex-col overflow-hidden
                     bottom-24 right-4 left-4
                     sm:left-auto sm:right-6 sm:w-[380px]
                     h-[70vh] max-h-[560px] rounded-[28px]"
          style={{
            background: BRAND.card,
            border: `1px solid ${BRAND.border}`,
            boxShadow:
              "0 24px 60px -12px rgba(107,76,42,0.28), 0 4px 16px -4px rgba(107,76,42,0.12)",
          }}
        >
          {/* Header */}
          <div
            className="relative flex items-center justify-between px-5 py-4 shrink-0"
            style={{
              background: `linear-gradient(135deg, ${BRAND.brown} 0%, ${BRAND.brownDark} 100%)`,
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ background: "rgba(255,255,255,0.14)" }}
              >
                <PawPrint size={19} color="#F6E9D8" strokeWidth={2.2} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-[15px] font-semibold text-white leading-none">
                    PetNest AI
                  </h3>
                  <Sparkles size={12} color="#F6E9D8" />
                </div>
                <p className="mt-1 flex items-center gap-1.5 text-[12px] text-white/75 leading-none">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8FD19E]" />
                  Ready to help
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close chat"
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/15"
            >
              <X size={17} />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-4"
            style={{ background: BRAND.bg }}
          >
            {messages.length === 0 && !typing ? (
              <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full"
                  style={{ background: BRAND.tan }}
                >
                  <PawPrint size={18} color={BRAND.tanText} />
                </div>
                <p className="text-[13px]" style={{ color: BRAND.muted }}>
                  Ask about adoption steps, a pet's temperament, or care basics.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex items-end gap-2 ${
                      m.role === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    {m.role === "assistant" && (
                      <div
                        className="mb-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                        style={{ background: BRAND.tan }}
                      >
                        <PawPrint size={12} color={BRAND.tanText} />
                      </div>
                    )}
                    <div
                      className="max-w-[78%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed"
                      style={
                        m.role === "user"
                          ? {
                              background: BRAND.brown,
                              color: "#FCF5EA",
                              borderBottomRightRadius: 6,
                            }
                          : {
                              background: BRAND.tan,
                              color: BRAND.text,
                              borderBottomLeftRadius: 6,
                            }
                      }
                    >
                      {m.text}
                    </div>
                  </div>
                ))}

                {typing && (
                  <div className="flex items-end gap-2">
                    <div
                      className="mb-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                      style={{ background: BRAND.tan }}
                    >
                      <PawPrint size={12} color={BRAND.tanText} />
                    </div>
                    <div
                      className="rounded-2xl px-3.5 py-3"
                      style={{ background: BRAND.tan, borderBottomLeftRadius: 6 }}
                    >
                      <TypingDots />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Input */}
          <div
            className="flex shrink-0 items-center gap-2 px-3 py-3"
            style={{ background: BRAND.card, borderTop: `1px solid ${BRAND.border}` }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder="Ask about your pet..."
              className="flex-1 rounded-full px-4 py-2.5 text-[13.5px] outline-none transition-shadow"
              style={{
                background: BRAND.bg,
                border: `1px solid ${BRAND.border}`,
                color: BRAND.text,
              }}
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim() || typing}
              aria-label="Send message"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-opacity disabled:opacity-40"
              style={{ background: BRAND.brown }}
            >
              <Send size={16} color="#FCF5EA" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIChatModal;