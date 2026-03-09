import Medicine from "../models/medicineSchema.js";

export const getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.status(200).json(medicines);
  } catch (error) {
    console.error("Error in getAllMedicines Controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMedicinesByName = async (req, res) => {
  try {
    const name = req.params.name;
    const medicines = await Medicine.find({
      name: { $regex: new RegExp(name, "i") },
    });

    if (medicines.length === 0) {
      return res
        .status(404)
        .json({ message: "No Medicine Found with that name" });
    }
    res.status(200).json(medicines);
  } catch (error) {
    console.error("Error in getAllMedicines Controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addMedicine = async (req, res) => {
  try {
    const { name, stock, price, pharmacy } = req.body;

    if (!name || !stock || !price || !pharmacy) {
      return res.status(400).json({
        message: "All fields are required: name, stock, price, pharmacy",
      });
    }

    const newMedicine = new Medicine({ name, stock, price, pharmacy });
    await newMedicine.save();
    res.status(201).json(newMedicine);
  } catch (error) {
    console.error("Error in addMedicine Controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateMedicine = async (req, res) => {
  try {
    const updated = await Medicine.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("Error in updateMedicine Controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteMedicine = async (req, res) => {
  try {
    const deleted = await Medicine.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    res.status(200).json({ message: "Medicine deleted successfully" });
  } catch (error) {
    console.error("Error in deleteMedicine Controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
