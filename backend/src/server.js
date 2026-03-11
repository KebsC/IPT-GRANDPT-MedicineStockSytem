import express, { json } from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import medicineRoutes from "../routes/medicineRoutes.js";
import purchaseRoutes from "../routes/purchaseRoutes.js";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

connectDB();

app.use("/purchases", purchaseRoutes);
app.use("/medicines", medicineRoutes);

app.get("/", (req, res) => res.send("Hello, World!"));

app.listen(5001, () => {
  console.log("Server is running on port: 5001");
});
