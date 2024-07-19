const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Routes
app.get('/api/customers', (req, res) => {
  fs.readFile(path.join(__dirname, 'data', 'customers.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Failed to read customers data' });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.get('/api/transactions', (req, res) => {
  fs.readFile(path.join(__dirname, 'data', 'transactions.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Failed to read transactions data' });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
