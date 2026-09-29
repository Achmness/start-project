// server/server.js
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- API ROUTES ---

// 1. Get all transactions
app.get('/api/transactions', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM transactions ORDER BY date DESC').all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Add a new transaction
app.post('/api/transactions', (req, res) => {
  const { title, amount, type, category, date } = req.body;

  if (!title || !amount || !type || !category || !date) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO transactions (title, amount, type, category, date)
      VALUES (?, ?, ?, ?, ?)
    `);
    const info = stmt.run(title, amount, type, category, date);
    res.status(201).json({ id: info.lastInsertRowid, title, amount, type, category, date });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Get spending breakdown by category
app.get('/api/analytics/categories', (req, res) => {
  try {
    const rows = db.prepare(`
      SELECT category, SUM(amount) as total
      FROM transactions
      WHERE type = 'expense'
      GROUP BY category
    `).all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});