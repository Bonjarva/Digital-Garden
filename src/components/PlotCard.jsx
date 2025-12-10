// src/components/PlotCard.jsx
import React from "react";

const PlotCard = ({ name, description, seedCount, onOpen }) => {
  return (
    <div
      className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onOpen}
    >
      {/* Plot Name */}
      <h2 className="text-xl font-bold text-gray-800">{name}</h2>

      {/* Description */}
      <p className="text-gray-600 mt-1">{description}</p>

      {/* Seed Count */}
      <p className="text-sm text-gray-500 mt-2">
        {seedCount} {seedCount === 1 ? "seed" : "seeds"}
      </p>
    </div>
  );
};

export default PlotCard;
