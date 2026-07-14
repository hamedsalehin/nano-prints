"use client";

import React, { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Loader2, Sparkles, MessageSquare } from "lucide-react";

interface Message {
  role: "user" | "model";
  content: string;
}

export function GeminiChatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content:
        "Hello! I am your Nano Signs AI assistant. How can I help you customize or choose the perfect signs, flags, or banners today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to connect to assistant");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "model", content: data.text }]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content:
            "Sorry, I'm having trouble connecting right now. Please email us directly at nanosigns1@gmail.com or try again in a moment!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ─── FLOATING BOT TRIGGER BUBBLE ─── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 z-40 flex items-center justify-center w-12 h-12 bg-[#0a0a0c] text-white border border-[#00e5ff]/30 rounded-full shadow-2xl hover:border-[#00e5ff] transition-all duration-300 group hover:scale-105 active:scale-95"
        style={{
          boxShadow:
            "0 0 15px rgba(0,229,255,0.25), 0 0 30px rgba(255,45,120,0.1)",
        }}
        aria-label="Open AI chat support"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-[#00e5ff]" />
        ) : (
          <div className="relative">
            <Bot className="w-6 h-6 text-[#00e5ff] group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff2d78] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff2d78]"></span>
            </span>
          </div>
        )}
      </button>

      {/* ─── CHATBOX CONTAINER CARD ─── */}
      {isOpen && (
        <div
          className="fixed bottom-[100px] right-6 z-50 w-96 max-w-[calc(100vw-2rem)] h-[480px] max-h-[calc(100vh-12rem)] bg-[#070709]/95 text-white border border-slate-800/80 rounded-2xl flex flex-col overflow-hidden shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-5 fade-in duration-300"
          style={{
            boxShadow:
              "0 20px 40px rgba(0,0,0,0.85), 0 0 25px rgba(0,229,255,0.06), 0 0 50px rgba(255,45,120,0.04)",
          }}
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#0d0714] to-[#050b16] border-b border-slate-800/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-slate-900 border border-[#00e5ff]/30 flex items-center justify-center relative">
                <Bot className="w-4.5 h-4.5 text-[#00e5ff]" />
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-green-500 border border-black animate-pulse" />
              </div>
              <div>
                <h4 className="text-xs font-bold font-poppins tracking-wide flex items-center gap-1">
                  Nano Signs AI <Sparkles className="w-3 h-3 text-[#ff2d78]" />
                </h4>
                <p className="text-[10px] text-slate-400 font-medium">
                  Ask me about custom signs & pricing
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "model" && (
                  <div className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                )}
                <div
                  className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed font-opensans ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-[#b020ff] to-[#ff2d78] text-white rounded-tr-none font-medium"
                      : "bg-[#121216] border border-slate-800 text-slate-200 rounded-tl-none"
                  }`}
                  style={{
                    whiteSpace: "pre-line",
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2 justify-start">
                <div className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <div className="bg-[#121216] border border-slate-800 text-slate-400 rounded-2xl rounded-tl-none px-3.5 py-2.5 text-xs flex items-center gap-1.5 font-opensans">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Thinking...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSend}
            className="p-3 bg-[#0d0d11] border-t border-slate-800/60 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 bg-[#16161c] border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff] transition-all font-opensans"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2 bg-[#ff2d78] hover:bg-[#ff2d78]/95 disabled:bg-slate-800 text-white rounded-xl transition-all shadow-md active:scale-95 disabled:scale-100 flex items-center justify-center shrink-0"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
