import React, { useState, useEffect, useRef } from "react";
import { Bot, User, Send, Mic, Loader2, Sparkles } from "lucide-react";
import { LiaCommentsSolid } from "react-icons/lia";

/* ── Typing Indicator ─────────────────────────── */
const TypingIndicator = () => (
  <div style={{ display: "flex", alignItems: "flex-end", gap: "10px" }}>
    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#3b82f6,#06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <Bot size={14} color="white" />
    </div>
    <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "16px", borderBottomLeftRadius: 4, padding: "12px 16px" }}>
      <div style={{ display: "flex", gap: 6, alignItems: "center", height: 16 }}>
        {[0, 0.2, 0.4].map((d, i) => (
          <span key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.5)", display: "inline-block", animation: "bounce3 1.4s infinite ease-in-out", animationDelay: `${d}s` }} />
        ))}
      </div>
    </div>
  </div>
);

/* ── Message Bubble ───────────────────────────── */
const MessageBubble = ({ message }) => {
  const isUser = message.sender === "user";
  const time = new Date(message.id).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return (
    <div style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start", alignItems: "flex-end", gap: 8 }}>
      {!isUser && (
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#3b82f6,#06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Bot size={14} color="white" />
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 4, maxWidth: "70%", alignItems: isUser ? "flex-end" : "flex-start" }}>
        <div style={isUser
          ? { background: "linear-gradient(135deg,#7c3aed,#6d28d9)", color: "white", padding: "10px 16px", borderRadius: 16, borderBottomRightRadius: 4, fontSize: 14, lineHeight: 1.6, boxShadow: "0 2px 8px rgba(124,58,237,0.3)" }
          : { background: "rgba(255,255,255,0.08)", color: "white", border: "1px solid rgba(255,255,255,0.12)", padding: "10px 16px", borderRadius: 16, borderBottomLeftRadius: 4, fontSize: 14, lineHeight: 1.6 }
        }>
          <p style={{ margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{message.text}</p>
        </div>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", padding: "0 4px" }}>{time}</span>
      </div>
      {isUser && (
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#7c3aed,#a855f7)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <User size={14} color="white" />
        </div>
      )}
    </div>
  );
};

/* ── Welcome Screen ───────────────────────────── */
const WelcomeScreen = () => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 16, padding: "0 24px", textAlign: "center" }}>
    <div style={{ width: 64, height: 64, borderRadius: 16, background: "linear-gradient(135deg,#7c3aed,#3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 32px rgba(124,58,237,0.4)" }}>
      <LiaCommentsSolid size={28} color="white" />
    </div>
    <div>
      <h3 style={{ margin: "0 0 8px", color: "white", fontSize: 20, fontWeight: 600 }}>AI Health Assistant</h3>
      <p style={{ margin: 0, color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.6 }}>Ask me about symptoms, health tips,<br />medications, or anything health-related.</p>
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginTop: 8 }}>
      {["What are common cold symptoms?", "Tips for better sleep", "Headache remedies"].map(s => (
        <span key={s} style={{ fontSize: 12, background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 999, padding: "5px 14px", cursor: "default" }}>{s}</span>
      ))}
    </div>
  </div>
);

/* ── Main Chatbot Page ────────────────────────── */
function Chatbot() {
  const [messages, setMessages] = useState([
    { id: Date.now(), sender: "bot", text: "Hello! 👋 I'm your AI Health Assistant. I can help you with general health information, symptom checking, and wellness tips. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) { ta.style.height = "auto"; ta.style.height = Math.min(ta.scrollHeight, 120) + "px"; }
  }, [input]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg = { id: Date.now(), sender: "user", text };
    setMessages(p => [...p, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5001/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: text }) });
      const data = await res.json();
      setMessages(p => [...p, { id: Date.now() + 1, sender: "bot", text: data.reply }]);
    } catch {
      setMessages(p => [...p, { id: Date.now() + 1, sender: "bot", text: "⚠️ Couldn't reach the server. Please try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <>
      {/* Bounce animation for typing dots */}
      <style>{`@keyframes bounce3{0%,80%,100%{transform:scale(0);opacity:.3}40%{transform:scale(1);opacity:1}}`}</style>

      {/* Full-width container that respects the layout's main-content area */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 160px)", padding: "0 16px 24px" }}>
        <div style={{
          width: "100%",
          maxWidth: 700,
          height: "75vh",
          minHeight: 480,
          display: "flex",
          flexDirection: "column",
          borderRadius: 20,
          overflow: "hidden",
          background: "#1a0a2e",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
        }}>

          {/* ── Header ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 20px", background: "linear-gradient(90deg,#7c3aed,#6d28d9,#3b82f6)", flexShrink: 0 }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Bot size={18} color="white" />
            </div>
            <div>
              <p style={{ margin: 0, color: "white", fontWeight: 600, fontSize: 15 }}>AI Health Assistant</p>
              <p style={{ margin: 0, color: "rgba(255,255,255,0.75)", fontSize: 11, display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#34d399", display: "inline-block" }} />
                Online · Always here to help
              </p>
            </div>
          </div>

          {/* ── Messages ── */}
          <div style={{ flex: 1, overflowY: "auto", padding: "20px 20px", display: "flex", flexDirection: "column", gap: 16 }}>
            {messages.length === 1 && !loading ? <WelcomeScreen /> : messages.map(m => <MessageBubble key={m.id} message={m} />)}
            {loading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* ── Input ── */}
          <div style={{ padding: "12px 16px", background: "rgba(255,255,255,0.04)", borderTop: "1px solid rgba(255,255,255,0.08)", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 10, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 24, padding: "8px 12px" }}>
              <button style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", padding: 4, display: "flex", alignItems: "center" }} title="Voice (coming soon)">
                <Mic size={16} />
              </button>
              <textarea
                ref={textareaRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                placeholder="Type a message..."
                rows={1}
                style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "white", fontSize: 14, resize: "none", maxHeight: 120, lineHeight: 1.6, padding: "2px 0", opacity: loading ? 0.6 : 1 }}
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                style={{ width: 36, height: 36, borderRadius: "50%", border: "none", cursor: loading || !input.trim() ? "not-allowed" : "pointer", background: input.trim() && !loading ? "linear-gradient(135deg,#7c3aed,#6d28d9)" : "rgba(255,255,255,0.12)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}
              >
                {loading ? <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> : <Send size={15} />}
              </button>
            </div>
            <p style={{ textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 6, marginBottom: 0 }}>
              Enter to send · Shift+Enter for new line
            </p>
          </div>

        </div>
      </div>
    </>
  );
}

export default Chatbot;