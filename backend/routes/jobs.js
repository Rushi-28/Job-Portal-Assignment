const express = require('express');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { db } = require('../db');
const router = express.Router();

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

router.get('/', authenticate, async (req, res) => {
  await db.read();
  res.json(db.data.jobs);
});

router.post('/', authenticate, async (req, res) => {
  await db.read();
  const job = { id: uuidv4(), ...req.body };
  db.data.jobs.push(job);
  await db.write();
  res.status(201).json(job);
});

router.put('/:id', authenticate, async (req, res) => {
  await db.read();
  const jobIndex = db.data.jobs.findIndex(job => job.id === req.params.id);

  if (jobIndex === -1) {
    return res.status(404).json({ message: 'Job not found' });
  }

  db.data.jobs[jobIndex] = { ...db.data.jobs[jobIndex], ...req.body };
  await db.write();

  res.json(db.data.jobs[jobIndex]);
});

router.delete('/:id', authenticate, async (req, res) => {
  await db.read();
  db.data.jobs = db.data.jobs.filter(job => job.id !== req.params.id);
  await db.write();
  res.json({ message: 'Job deleted' });
});

module.exports = router;