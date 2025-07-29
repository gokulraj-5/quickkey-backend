// server.js
const express = require("express");
const cors = require("cors");
const getGeminiAnswer = require("./gemini");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Add logging for debugging
app.post("/predict", async (req, res) => {
  const { question } = req.body;
  console.log("Received question:", question);  // ✅ Debug log

  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }

  try {
    const answer = await getGeminiAnswer(question);
    res.json({ answer });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Failed to get answer from Gemini" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
