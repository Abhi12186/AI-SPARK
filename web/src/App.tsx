import React, { useState } from "react";
import ChatWindow from "./components/ChatWindow";

const App: React.FC = () => {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    if (username.trim() !== "") {
      setIsLoggedIn(true);
    } else {
      alert("Please enter a username");
    }
  };

  return (
    <>
      {!isLoggedIn ? (
        // 🔹 Login Page (same as before)
        <div className="h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              🚀 Enter Username to Join Chat
            </h2>
            <div className="flex items-center border rounded-lg overflow-hidden shadow-sm">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your username"
                className="flex-1 px-4 py-3 focus:outline-none text-gray-700"
              />
              <button
                onClick={handleLogin}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 font-semibold transition-all"
              >
                Join
              </button>
            </div>
          </div>
        </div>
      ) : (
        // 🔹 Chat Window (full screen layout without gradient)
        <div className="h-screen w-screen">
          <ChatWindow username={username} />
        </div>
      )}
    </>
  );
};

export default App;
