import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// const corsOptions = {
//     origin: ['http://localhost:5500'], 
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] 
// };

// app.use(cors(corsOptions));

app.use(cors());

app.post("/gemini-text", async (req, res) => {
  const { prompt } = req.body;

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=" +
      process.env.GEMINI_API_KEY,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  const data = await response.json();
  res.json(data);
});


app.post("/gemini-image", async (req, res) => {
  const { prompt, inlineData } = req.body;

  console.log("Received prompt:", prompt);
  console.log("Received inlineData:", inlineData );
  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=" +
      process.env.GEMINI_API_KEY,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
                {
                  inlineData: inlineData
                }
              ]
            }
          ]
        })

    }
  );

  const data = await response.json();
  res.json(data);
});


app.post("/gemini-file", async (req, res) => {
  const { prompt, imagePart } = req.body;

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=" +
      process.env.GEMINI_API_KEY,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }, imagePart] }],
      }),
    }
  );

  const data = await response.json();
  res.json(data);
});

app.listen(process.env.PORT || 4000, () => console.log("Server running on port " + (process.env.PORT || 4000)));
