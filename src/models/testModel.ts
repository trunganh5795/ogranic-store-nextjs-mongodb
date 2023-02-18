import mongoose, { Schema } from 'mongoose';

const test = new Schema(
  {
    value: Number,
  },
  {
    autoCreate: true, // tự tạo collection khi connect database, ko cần có document nó vẫn tạo collection
    timestamps: true,
    autoIndex: false, // false no se khong tao index
  },
);

const Dataset = mongoose.models.test || mongoose.model('test', test);
export default Dataset;
