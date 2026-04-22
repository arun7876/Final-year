import React, { useRef, useEffect, forwardRef } from "react";
import { Send, Mic } from "lucide-react";

const ChatInput = forwardRef(function ChatInput({ value, onChange, onSend, loading }, ref) {
    const textareaRef = useRef(null);

    // Auto-resize textarea
    useEffect(() => {
        const ta = textareaRef.current;
        if (ta) {
            ta.style.height = "auto";
            ta.style.height = Math.min(ta.scrollHeight, 120) + "px";
        }
    }, [value]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSend();
        }
    };

    return (
        <div className="p-3 bg-white/5 border-t border-white/10">
            <div className="flex items-end gap-2 bg-white/10 rounded-2xl border border-white/20 px-3 py-2 focus-within:border-violet-400 transition-colors">
                {/* Microphone Button */}
                <button
                    type="button"
                    className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-violet-500 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-all mb-0.5"
                    title="Voice input (coming soon)"
                >
                    <Mic size={16} />
                </button>

                {/* Textarea */}
                <textarea
                    ref={(el) => {
                        textareaRef.current = el;
                        if (typeof ref === "function") ref(el);
                        else if (ref) ref.current = el;
                    }}
                    value={value}
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                    disabled={loading}
                    placeholder="Type a message... (Enter to send)"
                    rows={1}
                    style={{ flex: 1, background: 'transparent', fontSize: '14px', color: 'white', resize: 'none', outline: 'none', padding: '6px 0', maxHeight: '120px', lineHeight: 1.6, opacity: loading ? 0.6 : 1 }}
                />

                {/* Send Button */}
                <button
                    type="button"
                    onClick={onSend}
                    disabled={loading || !value.trim()}
                    className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all mb-0.5 ${value.trim() && !loading
                        ? "bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-md hover:shadow-violet-300 dark:hover:shadow-violet-800 hover:scale-105 active:scale-95"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                        }`}
                >
                    <Send size={14} />
                </button>
            </div>
            <p style={{ textAlign: 'center', fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '6px' }}>
                Press <kbd className="font-mono bg-white/10 rounded px-1">Enter</kbd> to send · <kbd className="font-mono bg-white/10 rounded px-1">Shift+Enter</kbd> for newline
            </p>
        </div>
    );
});

export default ChatInput;
