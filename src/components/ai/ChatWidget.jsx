import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Bot, User, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function ChatWidget() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "w1",
      role: "model",
      content:
        "Hi! I’m your SyncUp AI Coach. I can help with ideas, teammate strategy, MVP scope, and pitch drafts. What are you working on?",
    },
  ]);

  const listRef = useRef(null);
  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const quickPrompts = useMemo(
    () => [
      "Suggest 3 project ideas based on my skills",
      "Draft a 3-minute pitch outline",
      "Help me plan an MVP for a fintech idea",
      "How do I split roles for a team of 3?",
    ],
    []
  );

  async function sendMessage(text) {
    if (!text?.trim()) return;
    const userMsg = { id: crypto.randomUUID(), role: "user", content: text.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setSending(true);
    try {
      const res = await fetch(`${API_BASE}/api/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg.content,
          // ✅ Only send user messages to Gemini
          history: messages
            .filter((m) => m.role === "user")
            .map(({ role, content }) => ({ role, content })),
          user: {
            skills: user?.skills || [],
            goals: user?.goals || "",
            location: user?.location || "",
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "AI error");
      const botMsg = { id: crypto.randomUUID(), role: "model", content: data.reply };
      setMessages((m) => [...m, botMsg]);
    } catch (e) {
      const errMsg = {
        id: crypto.randomUUID(),
        role: "model",
        content: "Sorry, I couldn’t reach the AI just now. Try again in a moment.",
      };
      setMessages((m) => [...m, errMsg]);
      console.error(e);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 rounded-full shadow-xl p-4 bg-black text-white hover:opacity-90"
        aria-label="Open chat"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileTap={{ scale: 0.96 }}
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-20 right-5 z-50 w-[360px] max-h-[70vh] flex flex-col rounded-2xl shadow-2xl bg-white border font-sans text-black"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b flex items-center justify-between bg-gradient-to-r from-black to-gray-800 text-white rounded-t-2xl font-medium text-sm">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <span>SyncUp AI Coach</span>
              </div>
              <button className="opacity-80 hover:opacity-100" onClick={() => setOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={listRef}
              className="px-3 py-3 overflow-y-auto space-y-3 flex-1 bg-neutral-50 text-sm leading-relaxed text-black"
            >
              {messages.map((m) => (
                <div key={m.id} className="flex items-start gap-2">
                  <div
                    className={`rounded-full p-1 mt-0.5 ${
                      m.role === "user" ? "bg-gray-200" : "bg-black text-white"
                    }`}
                  >
                    {m.role === "user" ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>
                  <div
                    className={`rounded-2xl px-3 py-2 max-w-[78%] whitespace-pre-wrap border text-black ${
                      m.role === "user" ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick prompts */}
            <div className="px-3 pb-2 pt-1 flex flex-wrap gap-2 border-t bg-white text-black">
              {quickPrompts.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-xs border rounded-full px-3 py-1 hover:bg-gray-50 font-sans text-black"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex items-center gap-2 p-3 border-t bg-white rounded-b-2xl text-black"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={sending ? "Thinking…" : "Ask about ideas, MVPs, pitches…"}
                className="flex-1 border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 font-sans text-black"
                disabled={sending}
              />
              <Button type="submit" disabled={sending || !input.trim()} className="rounded-xl">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
