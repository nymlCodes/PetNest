"use client";

import { useState } from "react";
import AIButton from "./AIButton";
import AIChatModal from "./AIChatModal";
import AIBlackCat from "./AiBlackCat";
// import AIBlackCat from "./AIBlackCat";

// Single state, single source of truth — this is what fixes the
// "click twice" bug. Both AIButton and AIChatModal read/write `open`
// through props only; neither one keeps its own internal copy.
const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSendMessage = async (text) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      console.error("Chat request failed:", res.status, errBody);
      throw new Error(errBody.error || `Request failed with ${res.status}`);
    }

    const data = await res.json();
    return data.reply;
  };

  return (
    <>
      <AIBlackCat hidden={isOpen} />
      <AIButton open={isOpen} onClick={() => setIsOpen((v) => !v)} />

      {/* Always mounted — AIChatModal's own `open` prop controls visibility
          via AnimatePresence. Wrapping this in `{isOpen && ...}` here would
          unmount it before the exit animation can run, and forgetting to
          pass `open` (as in the previous version) is why it never opened. */}
      <AIChatModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onSendMessage={handleSendMessage}
      />
    </>
  );
};

export default AIChat;