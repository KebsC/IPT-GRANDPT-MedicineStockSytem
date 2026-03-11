import React, { useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

const AddMedicinePage = () => {
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [pharmacy, setPharmacy] = useState("");
  const [message, setMessage] = useState("");

  const handleAdd = async () => {
    if (!name || !stock || !price || !pharmacy) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5001/medicines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          stock: Number(stock),
          price: Number(price),
          pharmacy,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Medicine added successfully!");
        setName("");
        setStock("");
        setPrice("");
        setPharmacy("");
      } else {
        setMessage(data.message || "Failed to add medicine.");
      }
    } catch (error) {
      console.error("Error adding medicine:", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-20 gap-4">
        <h2 className="text-2xl font-bold">Add Medicine</h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Medicine name"
          className="border px-4 py-2 rounded w-80"
        />

        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          type="number"
          className="border px-4 py-2 rounded w-80"
        />

        <input
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="Stock"
          type="number"
          className="border px-4 py-2 rounded w-80"
        />

        <input
          value={pharmacy}
          onChange={(e) => setPharmacy(e.target.value)}
          placeholder="Pharmacy"
          className="border px-4 py-2 rounded w-80"
        />

        <button
          onClick={handleAdd}
          className="bg-primary text-white px-6 py-2 rounded hover:opacity-90"
        >
          Add Medicine
        </button>
      </div>
    </div>
  );
};

export default AddMedicinePage;
