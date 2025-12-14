import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: message }],
        temperature: 0.8
      })
    });

    const data = await r.json();
    res.json({ reply: data.choices[0].message.content });

  } catch (e) {
    res.status(500).json({ error: "GPT 오류" });
  }
});

app.listen(3000, () =>
  console.log("✅ GPT 서버 실행중 http://localhost:3000")
);
