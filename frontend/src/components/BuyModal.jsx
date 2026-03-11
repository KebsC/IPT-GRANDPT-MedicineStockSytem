import { useState } from "react";

const BuyModal = ({ medicine, onClose, onConfirm }) => {
  const [quantity, setQuantity] = useState(1);

  const handleConfirm = async () => {
    if (quantity < 1 || quantity > medicine.stock) return;

    await fetch("http://localhost:5001/purchases", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: medicine.name,
        pharmacy: medicine.pharmacy,
        quantity,
        price: medicine.price,
      }),
    });

    onConfirm(medicine._id, quantity);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg flex flex-col gap-4 w-80">
        <h2 className="text-xl font-bold">{medicine.name}</h2>
        <p className="text-gray-500">Available stock: {medicine.stock}</p>
        <input
          type="number"
          min={1}
          max={medicine.stock}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border rounded p-2"
        />
        <div className="flex gap-2">
          <button
            onClick={handleConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded flex-1"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded flex-1"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyModal;
