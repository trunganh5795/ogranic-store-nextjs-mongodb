import mongoose, { Schema } from 'mongoose';
var CommentSchema = new Schema({
  userId: { type: String, required: true },
  date: { type: Date, required: true, default: new Date() },
  content: String,
});
var DiscountSchema = new Schema({
  value: { type: Number, required: true, default: 0 },
  startDate: Date,
  endDate: Date,
});

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    unit: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    imgs: {
      type: [{ img: String }],
      required: true,
    },
    category: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    rate: {
      type: Number,
      default: 0,
    },
    numOfRate: {
      type: Number,
      default: 0,
    },
    comments: [CommentSchema],
    discount: {
      type: DiscountSchema,
      required: false,
    },
  },
  {
    autoCreate: true, // tự tạo collection khi connect database, ko cần có document nó vẫn tạo collection
    timestamps: true,
    autoIndex: true, //false no se khong tao index
  }
);

productSchema.index({ title: 'text', description: 'text' });

let Dataset =
  mongoose.models.product || mongoose.model('product', productSchema);
export default Dataset;
