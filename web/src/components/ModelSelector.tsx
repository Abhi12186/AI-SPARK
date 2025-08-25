import React from "react";

type Props = {
  provider: string;
  setProvider: (p: string) => void;
};

export default function ModelSelector({ provider, setProvider }: Props) {
  return (
    <div className="flex gap-4 mb-4">
      {["openai", "xai", "gemini"].map((p) => (
        <button
          key={p}
          onClick={() => setProvider(p)}
          className={`px-4 py-2 rounded-lg ${
            provider === p ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          {p.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
