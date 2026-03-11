import React, { useEffect, useState } from "react";
import paracetamol from "../lib/images/paracetamol.jpg";
import ProductCard from "./ProductCard";
import BuyModal from "./BuyModal.jsx";

const MainContent = ({ searchResults }) => {
  const [medicines, setMedicines] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const displayMedicines = searchResults ?? medicines;

  const fetchMedicines = async () => {
    try {
      const response = await fetch("http://localhost:5001/medicines");
      const data = await response.json();
      setMedicines(data);
    } catch (error) {
      console.error("Error fetching the Medicines: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleConfirmPurchase = async (id, quantity) => {
    try {
      const medicine = medicines.find((m) => m._id === id);
      await fetch(`http://localhost:5001/medicines/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stock: medicine.stock - quantity }),
      });
      await fetchMedicines();
      setSelectedMedicine(null);
      setQuantity(1);
    } catch (error) {
      console.error("Error buying medicine:", error);
    }
  };

  // Loading
  if (isLoading) return <p>Loading Medicines...</p>;

  if (displayMedicines.filter((m) => m.stock > 0).length === 0) {
    return (
      <p className="text-center p-12 text-2xl">
        No medicines in stock with that name.
      </p>
    );
  }

  return (
    <div className="m-12 flex flex-col gap-4">
      {displayMedicines
        .filter((medicine) => medicine.stock > 0)
        .map((medicine) => (
          <ProductCard
            key={medicine._id}
            medicine={medicine}
            onOpenModal={setSelectedMedicine}
          />
        ))}

      {selectedMedicine && (
        <BuyModal
          medicine={selectedMedicine}
          onClose={() => setSelectedMedicine(null)}
          onConfirm={handleConfirmPurchase}
        />
      )}
    </div>
  );
};

export default MainContent;
