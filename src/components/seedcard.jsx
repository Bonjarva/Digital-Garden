import React from "react";

function SeedCard({ title, description }) {
  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition">
      <h2 className="font-bold text-lg mb-2">{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export default SeedCard;
