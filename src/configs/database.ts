import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const password = process.env.ATALS_MONGO_PASSWORD || '';
const mongoAtlasUri = `mongodb+srv://nonameex2:${password}@ogranicstore.pek7sfr.mongodb.net/ogranicstore?retryWrites=true&w=majority`;

const connectDB = async () => {
  if (mongoose.connection.readyState) {
    // 0 = disconnected
    // 1 = connected
    // 2 = connecting
    // 3 = disconnecting
  }

  return new Promise((resolve, reject) => {
    mongoose.connect(
      mongoAtlasUri,
      {
        maxPoolSize: 50,
        minPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      },
      (err: mongoose.CallbackError) => {
        if (err) {
          reject(err);
        }
        console.log('Connected to mongoDB');
        resolve('Connected to mongoDB');
      },
    );
  });
};

export default connectDB;
