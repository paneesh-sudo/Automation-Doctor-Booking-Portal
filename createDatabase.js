const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected...');
    // Models will automatically create collections if they do not exist
    const Contact = require('./models/contact');
    const Feedback = require('./models/feedback');
    const Appointment = require('./models/appointment');

    // You can add sample data here if needed
    // Example: new Contact({ name: 'John Doe', email: 'john@example.com', message: 'Hello!' }).save();

})
.catch(err => console.error('MongoDB connection error:', err));
