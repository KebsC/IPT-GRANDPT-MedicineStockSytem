import express from "express";
import {
  getAllPurchases,
  addPurchase,
  updatePurchase,
  deletePurchase,
} from "../controller/purchaseController.js";

const router = express.Router();

router.get("/", getAllPurchases);
router.post("/", addPurchase);
router.put("/:id", updatePurchase);
router.delete("/:id", deletePurchase);

export default router;
