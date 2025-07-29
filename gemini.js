// gemini.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

async function getGeminiAnswer(question) {
  try {
    const result = await model.generateContent(question);
    const response = await result.response;
    return response.text();
  } catch (err) {
    console.error("Gemini Error:", err);
    return "Something went wrong. Try again later.";
  }
}

module.exports = getGeminiAnswer;
