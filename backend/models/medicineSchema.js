import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  pharmacy: {
    type: String,
    required: true,
  },
});

const Medicine = mongoose.model("Medicine", medicineSchema);

export default Medicine;
