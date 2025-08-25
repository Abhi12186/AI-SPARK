import React, { useState } from "react";

type Message = {
  sender: "user" | "chatgpt" | "gemini" | "grok";
  text: string;
};

interface ChatWindowProps {
  username: string;
}

export default function ChatWindow({ username }: ChatWindowProps) {
  const [selectedBot, setSelectedBot] = useState<"chatgpt" | "gemini" | "grok">(
    "chatgpt"
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    // user message
    const userMsg: Message = { sender: "user", text: `${username}: ${input}` };
    setMessages((prev) => [...prev, userMsg]);

    let apiUrl = "";
    let body = { message: input };

    if (selectedBot === "chatgpt") {
      apiUrl = "http://localhost:5000/api/chatgpt";
    } else if (selectedBot === "gemini") {
      apiUrl = "http://localhost:5000/api/gemini";
    } else if (selectedBot === "grok") {
      apiUrl = "http://localhost:5000/api/grok";
    }

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      const botMsg: Message = { sender: selectedBot, text: data.reply };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const botMsg: Message = {
        sender: selectedBot,
        text: "❌ Error contacting server",
      };
      setMessages((prev) => [...prev, botMsg]);
    }

    setInput("");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-900 text-white flex flex-col p-4">
        <h2 className="text-xl font-bold mb-4">🤖 AI Spark</h2>
        <button
          className={`p-2 rounded mb-2 ${
            selectedBot === "chatgpt" ? "bg-blue-500" : "bg-gray-700"
          }`}
          onClick={() => setSelectedBot("chatgpt")}
        >
          ChatGPT
        </button>
        <button
          className={`p-2 rounded mb-2 ${
            selectedBot === "gemini" ? "bg-green-500" : "bg-gray-700"
          }`}
          onClick={() => setSelectedBot("gemini")}
        >
          Gemini
        </button>
        <button
          className={`p-2 rounded ${
            selectedBot === "grok" ? "bg-purple-500" : "bg-gray-700"
          }`}
          onClick={() => setSelectedBot("grok")}
        >
          Grok
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-100">
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-2 ${
                msg.sender === "user" ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`inline-block px-3 py-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                {msg.text}
              </span>
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="p-4 flex border-t bg-white">
          <input
            className="flex-1 border rounded px-3 py-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="ml-2 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
