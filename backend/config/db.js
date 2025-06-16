import mongoose from 'mongoose';

const connectDb = async () => {
  const url = process.env.DB_URL;

  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Server connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1); // optional: crash the app if DB fails
  }
};

export default connectDb;
