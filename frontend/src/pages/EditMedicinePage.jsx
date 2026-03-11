import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import EditStockModal from "../components/EditStockModal";
import toast from "react-hot-toast";
import paracetamol from "../lib/images/paracetamol.jpg";

const CartPage = () => {
  const [medicines, setMedicines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const fetchMedicines = async () => {
    try {
      const res = await fetch("http://localhost:5001/medicines");
      const data = await res.json();
      const sorted = [...data].sort((a, b) => a.name.localeCompare(b.name));
      setMedicines(sorted);
    } catch (error) {
      console.error("Error fetching medicines:", error);
      toast.error("Failed to load medicines.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleEditStock = async (id, newStock) => {
    try {
      const res = await fetch(`http://localhost:5001/medicines/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stock: newStock }),
      });
      if (res.ok) {
        toast.success("Stock updated!");
        await fetchMedicines();
        setSelectedMedicine(null);
      } else {
        toast.error("Failed to update stock.");
      }
    } catch (error) {
      console.error("Error updating stock:", error);
      toast.error("Something went wrong.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5001/medicines/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Medicine deleted!");
        await fetchMedicines();
      } else {
        toast.error("Failed to delete medicine.");
      }
    } catch (error) {
      console.error("Error deleting medicine:", error);
      toast.error("Something went wrong.");
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen">
        <Navbar />
        <p className="m-12">Loading medicines...</p>
      </div>
    );

  if (medicines.length === 0)
    return (
      <div className="min-h-screen">
        <Navbar />
        <p className="m-12">No medicines found.</p>
      </div>
    );

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="m-12 flex flex-col gap-4">
        <h2 className="text-2xl font-bold">All Medicines</h2>
        {medicines.map((medicine) => (
          <div
            key={medicine._id}
            className="card card-side bg-base-100 shadow-xl h-24"
          >
            <figure className="h-full">
              <img
                src={paracetamol}
                alt="Medicine"
                className="w-48 h-full object-cover"
              />
            </figure>
            <div className="card-body flex flex-row items-center justify-between">
              <div>
                <h2 className="card-title">{medicine.name}</h2>
                <p>{medicine.pharmacy}</p>
                <p className="text-sm text-gray-500">
                  Stock: {medicine.stock} | ₱{medicine.price}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  className="btn btn-warning"
                  onClick={() => setSelectedMedicine(medicine)}
                >
                  Edit Stock
                </button>
                <button
                  className="btn btn-error"
                  onClick={() => handleDelete(medicine._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedMedicine && (
        <EditStockModal
          medicine={selectedMedicine}
          onClose={() => setSelectedMedicine(null)}
          onConfirm={handleEditStock}
        />
      )}
    </div>
  );
};

export default CartPage;
