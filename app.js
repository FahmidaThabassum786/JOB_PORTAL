const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Job = require('./models/job'); // ✅ Correct path to job model

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// ✅ MongoDB Connection (no deprecated warnings)
mongoose.connect('mongodb://localhost:27017/jobportal')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// 🔹 Get all jobs
app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs.' });
  }
});

// 🔹 Post a new job
app.post('/api/jobs/post', async (req, res) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.status(201).json({ message: 'Job posted successfully.' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to post job.' });
  }
});

// 🔹 (Optional) Get jobs by employer role (you can filter later if needed)
app.get('/api/jobs/employer', async (req, res) => {
  try {
    const jobs = await Job.find(); // You can add filtering logic here
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employer jobs.' });
  }
});

// Start the server
const PORT = 5004;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
