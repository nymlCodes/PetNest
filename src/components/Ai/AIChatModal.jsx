"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PawPrint, X, Send, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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

// Compact Markdown renderer tuned for a narrow chat bubble — small,
// tight spacing, brand colors, and a scrollable wrapper for the rare
// table that slips through despite the system prompt discouraging them.
const mdComponents = {
  p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
  strong: ({ children }) => (
    <strong className="font-semibold" style={{ color: BRAND.brownDark }}>
      {children}
    </strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  ul: ({ children }) => <ul className="mb-2 ml-4 list-disc space-y-1 last:mb-0">{children}</ul>,
  ol: ({ children }) => <ol className="mb-2 ml-4 list-decimal space-y-1 last:mb-0">{children}</ol>,
  li: ({ children }) => <li className="leading-snug">{children}</li>,
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline underline-offset-2"
      style={{ color: BRAND.brown }}
    >
      {children}
    </a>
  ),
  code: ({ children }) => (
    <code
      className="rounded px-1 py-0.5 text-[12px]"
      style={{ background: BRAND.bg, color: BRAND.brownDark }}
    >
      {children}
    </code>
  ),
  table: ({ children }) => (
    <div className="mb-2 -mx-1 overflow-x-auto">
      <table className="min-w-full border-collapse text-[12px]">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th
      className="border px-2 py-1 text-left font-semibold"
      style={{ borderColor: BRAND.border, background: BRAND.bg }}
    >
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border px-2 py-1 align-top" style={{ borderColor: BRAND.border }}>
      {children}
    </td>
  ),
};





const TypingDots = () => (
  <div className="flex items-center gap-1.5 px-1 py-0.5">
    {/* petnest ai is thinking */}
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: BRAND.tanText }}
        animate={{
          y: [0, -4, 0],
          opacity: [0.35, 1, 0.35],
          scale: [0.9, 1.15, 0.9],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          delay: i * 0.15,
          ease: "easeInOut",
        }}
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
                    className={`flex items-end gap-2 ${m.role === "user" ? "flex-row-reverse" : ""
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
                      className={`rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed ${m.role === "user" ? "max-w-[78%]" : "max-w-[92%]"
                        }`}
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
                      {m.role === "assistant" ? (
                        <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                          {m.text}
                        </ReactMarkdown>
                      ) : (
                        m.text
                      )}
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