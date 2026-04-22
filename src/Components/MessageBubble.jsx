import React from "react";
import { Bot, User } from "lucide-react";

const MessageBubble = ({ message }) => {
    const isUser = message.sender === "user";

    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div
            className={`flex items-end gap-2 animate-fade-in ${isUser ? "flex-row-reverse" : "flex-row"
                }`}
        >
            {/* Avatar */}
            <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md ${isUser
                    ? "bg-gradient-to-br from-violet-500 to-purple-600"
                    : "bg-gradient-to-br from-blue-500 to-cyan-500"
                    }`}
            >
                {isUser ? (
                    <User size={14} className="text-white" />
                ) : (
                    <Bot size={14} className="text-white" />
                )}
            </div>

            {/* Bubble + Timestamp */}
            <div className={`flex flex-col gap-1 max-w-[75%] ${isUser ? "items-end" : "items-start"}`}>
                <div
                    style={isUser
                        ? { background: 'linear-gradient(135deg,#7c3aed,#6d28d9)', color: 'white', padding: '10px 16px', borderRadius: '16px', borderBottomRightRadius: '4px', fontSize: '14px', lineHeight: 1.6, boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }
                        : { background: 'rgba(255,255,255,0.08)', color: 'white', border: '1px solid rgba(255,255,255,0.12)', padding: '10px 16px', borderRadius: '16px', borderBottomLeftRadius: '4px', fontSize: '14px', lineHeight: 1.6 }
                    }
                >
                    <p className="whitespace-pre-wrap break-words">{message.text}</p>
                </div>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', padding: '0 4px' }}>
                    {formatTime(message.id)}
                </span>
            </div>
        </div>
    );
};

export default MessageBubble;
