import React from "react";
import SeedCard from "../components/SeedCard";

function Seeds() {
  // Example: small array of sample seeds
  const seeds = [
    {
      title: "Learn React",
      description: "Understand components and state",
      dateCreated: "2025-12-09",
    },
    {
      title: "Explore Azure",
      description: "Try Cosmos DB and Static Web Apps",
      dateCreated: "2025-12-08",
    },
  ];

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {seeds.map((seed, i) => (
        <SeedCard
          key={i}
          title={seed.title}
          description={seed.description}
          dateCreated={seed.dateCreated}
          onEdit={() => console.log("Editing:", seed.title)}
          onDelete={() => console.log("Deleting:", seed.title)}
        />
      ))}
    </div>
  );
}

export default Seeds;
