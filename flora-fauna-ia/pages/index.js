
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const res = await fetch("/api/pergunte", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: input }),
    });
    const data = await res.json();
    setResponses([...responses, { question: input, answer: data.answer }]);
    setInput("");
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white grid place-items-center p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-4 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite seu comando..."
            className="flex-1 p-2 rounded bg-gray-800 border border-gray-700"
          />
          <button
            onClick={handleSend}
            className="bg-green-600 px-4 py-2 rounded disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Gerando..." : "+"}
          </button>
        </div>
        <div className="space-y-4">
          {responses.map((res, i) => (
            <div key={i} className="p-4 bg-gray-900 rounded shadow">
              <p className="text-sm text-gray-400">Você:</p>
              <p className="mb-2">{res.question}</p>
              <p className="text-sm text-gray-400">IA:</p>
              <pre className="whitespace-pre-wrap">{res.answer}</pre>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
