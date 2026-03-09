import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    expiry: Date,
  },
  { timestamps: true },
);

const Stock = mongoose.model("Stock", medicineSchema);

export default Stock;
