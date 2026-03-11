import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  pharmacy: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Purchase = mongoose.model("Purchase", purchaseSchema);

export default Purchase;
