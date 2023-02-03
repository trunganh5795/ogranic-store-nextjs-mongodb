import mongoose, { Schema } from 'mongoose';

import { Address, Cart } from '../configs/type';

const CartSchema = new Schema<Cart>(
  {
    id: String,
    title: String,
    price: Number,
    quantity: Number,
    img: String,
  },
  { _id: false },
);

const Addresses = new Schema<Address>(
  {
    name: String,
    address: String,
    city: String,
    state: String,
    phone: String,
    postcode: Number,
    defaultAdd: Boolean,
  },
  { _id: false },
);
const userSchema = new Schema(
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
      type: [CartSchema],
      default: [],
    },
    address: {
      type: [Addresses],
      default: [],
    },
  },
  {
    autoCreate: true, // tự tạo collection khi connect database, ko cần có document nó vẫn tạo collection
    timestamps: true,
    autoIndex: true, // false no se khong tao index
  },
);

// userSchema.index({ email: 1 });
// userSchema.on('index', (error) => {
//   // "_id index cannot be sparse"
//   console.log(error.message);
// });
const Dataset = mongoose.models.user || mongoose.model('user', userSchema);

export default Dataset;
