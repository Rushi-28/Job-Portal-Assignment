const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { initDB } = require('./db');
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

initDB().then(() => {
  app.use('/api/auth', authRoutes);
  app.use('/api/jobs', jobRoutes);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});