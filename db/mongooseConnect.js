// db/mongoose.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/nakalangcaterers', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
  }
};

export default connectDB;