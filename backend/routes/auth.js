const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../db');
const router = express.Router();

router.post('/register', async (req, res) => {
  await db.read();
  const { email, password } = req.body;
  const existingUser = db.data.users.find(u => u.email === email);
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = bcrypt.hashSync(password, 8);
  db.data.users.push({ email, password: hashedPassword });
  await db.write();
  res.json({ message: 'User registered successfully' });
});

router.post('/login', async (req, res) => {
  await db.read();
  const { email, password } = req.body;
  const user = db.data.users.find(u => u.email === email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;