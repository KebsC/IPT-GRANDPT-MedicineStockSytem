import express from "express";
import {
  getAllMedicines,
  addMedicine,
  updateMedicine,
  deleteMedicine,
  getMedicinesByName,
} from "../controller/medicineController.js";

const router = express.Router();

router.get("/", getAllMedicines);
router.get("/:name", getMedicinesByName);
router.post("/", addMedicine);
router.put("/:id", updateMedicine);
router.delete("/:id", deleteMedicine);

export default router;
