import Purchase from "../models/purchaseSchema.js";

export const getAllPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find().sort({ date: -1 });
    res.status(200).json(purchases);
  } catch (error) {
    console.error("Error in getAllPurchases Controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addPurchase = async (req, res) => {
  try {
    const { name, pharmacy, quantity, price } = req.body;
    if (!name || !pharmacy || !quantity || !price) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const newPurchase = new Purchase({ name, pharmacy, quantity, price });
    await newPurchase.save();
    res.status(201).json(newPurchase);
  } catch (error) {
    console.error("Error in addPurchase Controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updatePurchase = async (req, res) => {
  try {
    const updated = await Purchase.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated)
      return res.status(404).json({ message: "Purchase not found" });
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error in updatePurchase Controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deletePurchase = async (req, res) => {
  try {
    const deleted = await Purchase.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Purchase not found" });
    res.status(200).json({ message: "Order cancelled successfully" });
  } catch (error) {
    console.error("Error in deletePurchase Controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
