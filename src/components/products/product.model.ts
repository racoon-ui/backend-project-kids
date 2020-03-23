import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  category: string;
  name: string;
  summary: string;
  price: number;
  available: boolean;
  description: string;
}

const productSchema: Schema = new Schema(
  {
    category: {
      type: String,
      required: [true, '카테고리는 필수입력 항목입니다'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, '이미지 URL은 필수입력 항목입니다'],
      trim: true,
    },
    name: {
      type: String,
      required: [true, '상점명은 필수입력 항목입니다'],
      trim: true,
    },
    summary: {
      type: String,
      required: [true, '요약정보는 필수입력 항목입니다'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, '가격정보는 필수입력 항목입니다'],
      trim: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      required: [true, '상품 상세정보는 필수입력 항목입니다'],
      trim: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IProduct>('Product', productSchema);
