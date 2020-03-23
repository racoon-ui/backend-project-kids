import mongoose, { Document, Schema } from 'mongoose';

export interface IPoint extends Document {
  type: string;
  coordinates: number[];
}

const pointSchema: Schema = new Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

export interface IStore extends Document {
  name: string;
  address: string;
  phone: string;
  hour: string;
  facilities: string[];
  location: IPoint;
}

const storeSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, '상점명은 필수입력 항목입니다'],
      trim: true,
    },
    address: {
      type: String,
      required: [true, '주소는 필수입력 항목입니다'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, '전화번호는 필수입력 항목입니다'],
      trim: true,
    },
    hour: {
      type: String,
      trim: true,
    },
    location: {
      type: pointSchema,
      required: [true, '상점 위치정보는 필수입력 항목입니다'],
    },
  },
  { timestamps: true },
);

export default mongoose.model<IStore>('Store', storeSchema);
