// src/components/SeedCard.jsx
import React from "react";

// Think: what props should this component accept?
// Hint: title, description, dateCreated, plotName, onEdit, onDelete
function SeedCard({
  title,
  description,
  dateCreated,
  plotName,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 flex flex-col gap-2 hover:shadow-lg transition-shadow">
      {/* Tailwind: card container with padding, shadow, rounded corners */}

      <h2 className="text-xl font-bold text-gray-800">{title}</h2>

      <p className="text-gray-600">{description}</p>

      <p className="text-xs text-gray-500 mb-2">Plot: {plotName}</p>

      <small className="text-gray-400 text-sm">
        Created on: {new Date(dateCreated).toLocaleDateString()}
      </small>

      {/* Buttons (only show if passed in) */}

      <div className="flex gap-3 mt-2">
        {onEdit && (
          <button
            onClick={onEdit}
            className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Edit
          </button>
        )}

        {onDelete && (
          <button
            onClick={onDelete}
            className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default SeedCard;
