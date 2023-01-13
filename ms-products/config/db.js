import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    process.on('SIGINT', function() {
      mongoose.connection.close(function() {
        console.log('MongoDB disconnected.');
        process.exit(0);
      });
    });
  } catch (error) {
    console.error(`MongoDB error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB;