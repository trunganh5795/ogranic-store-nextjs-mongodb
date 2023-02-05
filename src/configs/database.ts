import mongoose from 'mongoose';

mongoose.set('strictQuery', false);
const connectDB = async () => {
  if (mongoose.connection.readyState) {
    // 0 = disconnected
    // 1 = connected
    // 2 = connecting
    // 3 = disconnecting
    console.log('Already connected.');
    return;
  }
  // mongoose.connect(process.env.MONGODB_URL, {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      'mongodb://127.0.0.1:27017/testdb',
      // 'mongodb://127.0.0.1:27017/<<database>>',
      // {
      //   useCreateIndex: true,
      //   useFindAndModify: false,
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      // },
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
