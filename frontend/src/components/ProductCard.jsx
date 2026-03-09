import React from "react";
import paracetamol from "../lib/images/paracetamol.jpg";

const ProductCard = ({ medicine, onOpenModal }) => {
  return (
    <div className="card card-side bg-base-100 shadow-xl h-24">
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
        <div className="card-actions">
          <button
            className="btn btn-primary"
            onClick={() => onOpenModal(medicine)}
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
