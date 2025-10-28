const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(async () => {
    console.log('MongoDB connected...');
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections in the database:', collections);
})
.catch(err => console.error('MongoDB connection error:', err));
