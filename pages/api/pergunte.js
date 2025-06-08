
export default async function handler(req, res) {
  const { question } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: question }],
    }),
  });

  const data = await response.json();
  const answer = data.choices?.[0]?.message?.content || "Erro na resposta da IA.";

  res.status(200).json({ answer });
}
