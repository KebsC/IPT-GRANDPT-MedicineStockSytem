import { useState } from "react";

const EditStockModal = ({ medicine, onClose, onConfirm }) => {
  const [stock, setStock] = useState(medicine.stock ?? medicine.quantity);

  const handleConfirm = () => {
    if (stock < 0) return;
    onConfirm(medicine._id, stock);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg flex flex-col gap-4 w-80">
        <h2 className="text-xl font-bold">Edit — {medicine.name}</h2>
        <p className="text-gray-500">Pharmacy: {medicine.pharmacy}</p>
        <input
          type="number"
          min={0}
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          className="border rounded p-2"
        />
        <div className="flex gap-2">
          <button
            onClick={handleConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded flex-1"
          >
            Save
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

export default EditStockModal;
