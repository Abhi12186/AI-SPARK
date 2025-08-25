export async function sendMessage(provider: string, messages: any[]) {
  const res = await fetch("http://localhost:5000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      provider,
      messages,
    }),
  });

  if (!res.ok) throw new Error("Failed to send message");
  return res.json();
}
