// api/index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3004;

app.use(cors());
app.use(bodyParser.json());

// Improved MongoDB connection with error handling
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/timer';
    console.log('Attempting to connect to MongoDB with URI:', mongoURI);
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();

const TimerSchema = new mongoose.Schema({
  name: String,
  duration: Number,
  createdAt: { type: Date, default: Date.now },
});

const Timer = mongoose.model('Timer', TimerSchema);

app.post('/api/timers', async (req, res) => {
  try {
    const { name, duration } = req.body;
    const timer = new Timer({ name, duration });
    await timer.save();
    res.status(201).json(timer);
  } catch (error) {
    res.status(500).json({ error: 'Error creating timer' });
  }
});

app.get('/api/timers', async (req, res) => {
  try {
    const timers = await Timer.find().sort({ createdAt: -1 });
    res.json(timers);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching timers' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});