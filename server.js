const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const path = require('path');

// Initialize express app
const app = express();

// Load environment variables from .env file
dotenv.config();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send notification emails
const sendNotification = (data) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.NOTIFY_EMAIL,
    subject: 'New Form Submission',
    text: `New submission:\n\nName: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return;
    }
    console.log('Email sent:', info.response);
  });
};

// Models
const Contact = require('./models/contact');
const Feedback = require('./models/feedback');
const Appointment = require('./models/appointment'); // Correct import here

// Contact form submission route
app.post('/api/contact', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    sendNotification(req.body);
    res.status(200).send({ success: true, data: contact });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(400).send({ success: false, error: error.message });
  }
});

// Feedback form submission route
app.post('/api/feedback', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    sendNotification(req.body);
    res.status(201).send({ success: true, data: feedback });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(400).send({ success: false, error: error.message });
  }
});

// Appointment form submission route
app.post('/api/appointment', async (req, res) => {
  try {
    console.log('Appointment Data:', req.body);
    const appointment = new Appointment(req.body);
    await appointment.save();
    sendNotification(req.body);
    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    console.error('Error saving appointment:', error);
    res.status(400).send({ success: false, error: error.message });
  }
});

// Simple test route
app.get('/test', (req, res) => {
  res.send({ success: true });
});

// Serve static index.html for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Start the server on the defined port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
