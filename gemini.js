const axios = require('axios');
require('dotenv').config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function getAnswer(question) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
  
  const body = {
    contents: [
      {
        parts: [{ text: `Read this MCQ and tell the correct option with a short explanation:\n\n${question}` }]
      }
    ]
  };

  try {
    const res = await axios.post(endpoint, body);
    return res.data.candidates[0].content.parts[0].text;
  } catch (err) {
    console.error(err.message);
    return "Something went wrong.";
  }
}

module.exports = { getAnswer };
