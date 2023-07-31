const express = require("express");
const cors = require("cors");
const journal = require("./journal");

const app = express();
app.use(cors());

// Endpoint to get a random quote
app.get("/api/Prompt", (req, res) => {
  const { Time } = req.query;

  if (Time) {
    const PromptforTime = journal.filter((Prompt) => Prompt.Time === Time);
    if (PromptforTime.length === 0) {
      res.status(404).json({ error: "No time of day" });
    } else {
      const randomIndex = Math.floor(Math.random() * PromptforTime.length);
      const randomPrompt = PromptforTime[randomIndex];
      res.json({ Prompt: randomPrompt });
    }
  } else {
    const randomIndex = Math.floor(Math.random() * journal.length);
    const randomPrompt = journal[randomIndex];
    res.json({ Prompt: randomPrompt });
  }
});

const port = process.env.PORT || 9001;

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

module.exports = app