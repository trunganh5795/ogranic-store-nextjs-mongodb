import mongoose, { Schema } from 'mongoose';

import { Address, Cart } from '../configs/type';

const Address = new Schema<
  Pick<Address, 'name' | 'address' | 'city' | 'state' | 'phone' | 'postcode'>
>(
  {
    name: String,
    address: String,
    city: String,
    state: String,
    phone: String,
    postcode: Number,
  },
  { _id: false },
);

const Product = new Schema<Cart>(
  {
    id: String,
    title: String,
    quantity: String,
    price: Number,
    img: String,
    // category: Number,
  },
  { _id: false },
);
const orderSchema = new Schema(
  {
    shippingFee: Number,
    userId: String,
    address: {
      type: Address,
      require: true,
    },
    products: {
      type: [Product],
      require: true,
    },
  },
  {
    autoCreate: true, // tự tạo collection khi connect database, ko cần có document nó vẫn tạo collection
    timestamps: true,
    autoIndex: false, // false no se khong tao index
  },
);

const Dataset = mongoose.models.order || mongoose.model('order', orderSchema);

export default Dataset;
