import mongoose from 'mongoose';
type CartSchema = {
  id: String;
  title: String;
  quantity: Number;
};
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
    },
    avatar: {
      type: String,
    },
    cart: {
      type: [],
      default: [],
    },
  },
  {
    autoCreate: true, // tự tạo collection khi connect database, ko cần có document nó vẫn tạo collection
    timestamps: true,
    autoIndex: true, //false no se khong tao index
  }
);

// userSchema.index({ email: 1 });
// userSchema.on('index', (error) => {
//   // "_id index cannot be sparse"
//   console.log(error.message);
// });
let Dataset = mongoose.models.user || mongoose.model('user', userSchema);

export default Dataset;
