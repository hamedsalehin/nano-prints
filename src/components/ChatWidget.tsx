"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-6 left-6 z-40 font-poppins">
      {/* ─── Floating Popup Card ─── */}
      {isOpen && (
        <div
          className="absolute bottom-16 left-0 w-72 bg-[#09090b] text-white border border-slate-800/80 rounded-2xl p-4 shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-4 duration-300 flex flex-col gap-3.5"
          style={{
            boxShadow: "0 10px 30px rgba(0,0,0,0.8), 0 0 15px rgba(0,229,255,0.1)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-800/60">
            <div>
              <h4 className="font-bold text-sm tracking-wide text-white">Chat with Us</h4>
              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">We reply within minutes!</p>
            </div>
            <button
              onClick={toggleOpen}
              className="p-1 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              aria-label="Close chat menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Buttons */}
          <div className="flex flex-col gap-2.5">
            {/* WhatsApp */}
            <a
              href="https://wa.me/13059671005"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5.5 h-5.5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.858.002-2.634-1.023-5.11-2.885-6.974C16.574 1.91 14.097.884 11.47.884c-5.447 0-9.875 4.42-9.879 9.861-.001 1.72.463 3.398 1.34 4.872l-.991 3.62 3.71-.973zm11.367-7.447c-.31-.155-1.837-.906-2.115-1.006-.279-.101-.482-.15-.683.151-.202.3-.778.98-.953 1.18-.176.2-.351.226-.662.07-1.365-.684-2.279-1.21-3.197-2.78-.24-.41.24-.38.687-1.27.076-.15.038-.282-.019-.383-.057-.101-.482-1.16-.66-1.59-.174-.417-.38-.36-.52-.36h-.44c-.152 0-.4.056-.61.286-.21.23-.8.78-.8 1.9s.815 2.21.93 2.36c.114.15 1.606 2.451 3.89 3.437.543.234.968.374 1.299.479.546.173 1.042.149 1.434.09.438-.066 1.837-.751 2.095-1.479.258-.729.258-1.353.18-1.48-.077-.126-.283-.201-.593-.356z" />
                </svg>
                WhatsApp Chat
              </span>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full text-white">Online</span>
            </a>

            {/* Facebook Messenger */}
            <a
              href="https://m.me/signsnano"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-3 bg-[#0084FF] hover:bg-[#0074E4] text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5.5 h-5.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 .007C5.31.007 0 4.908 0 11.516c0 3.447 1.455 6.541 3.819 8.761.2.188.318.448.318.72l-.014 2.235c-.006.906.936 1.54 1.776 1.185l2.457-1.033c.226-.095.478-.112.716-.05 1 .258 2.052.395 3.136.395 6.69 0 12-4.902 12-11.51S18.69.007 12 .007zm1.258 15.358l-2.433-2.607-4.757 2.607 5.234-5.558 2.493 2.607 4.697-2.607-5.234 5.558z" />
                </svg>
                Messenger Chat
              </span>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full text-white">Online</span>
            </a>
          </div>
        </div>
      )}

      {/* ─── Floating Toggle Bubble ─── */}
      <button
        onClick={toggleOpen}
        className="flex items-center justify-center w-14 h-14 bg-[#0a0a0c] text-white border border-cyan-500/30 rounded-full shadow-2xl hover:border-cyan-400 transition-all duration-300 group hover:scale-105 active:scale-95"
        style={{
          boxShadow: "0 0 15px rgba(0,229,255,0.3), 0 0 30px rgba(255,45,120,0.1)",
        }}
        aria-label="Open chat support options"
      >
        <MessageCircle className="w-6 h-6 text-[#00e5ff] group-hover:scale-110 transition-transform duration-300" />
      </button>
    </div>
  );
}
