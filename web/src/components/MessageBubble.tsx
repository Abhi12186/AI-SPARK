type Props = {
  role: "user" | "assistant";
  content: string;
};

export default function MessageBubble({ role, content }: Props) {
  return (
    <div
      className={`p-3 my-2 max-w-lg rounded-lg ${
        role === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-300 self-start"
      }`}
    >
      {content}
    </div>
  );
}
