const express = require('express');
const cors = require('cors');
const { getAnswer } = require('./gemini');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/predict', async (req, res) => {
  const { question } = req.body;
  const answer = await getAnswer(question);
  res.json({ answer });
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
