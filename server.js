const express = require("express");
const cors = require("cors");
const math = require("mathjs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend.html at root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "calc.html"));
});

// Calculator API
app.post("/calculate", (req, res) => {
  try {
    const { expression } = req.body;
    if (!expression) return res.status(400).json({ error: "No expression provided" });

    const result = math.evaluate(expression);
    res.json({ result });
  } catch (err) {
    res.status(400).json({ error: "Invalid expression" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Backend + Frontend running at http://localhost:${PORT}`));
