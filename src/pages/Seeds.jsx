import React from "react";
import SeedCard from "../components/SeedCard";
import AddSeedForm from "../components/AddSeedForm";

function Seeds() {
  const initialSeeds = [
    {
      title: "Learn React",
      description: "Understand components and state",
      dateCreated: "2025-12-09",
      plotId: 1,
    },
    {
      title: "Explore Azure",
      description: "Try Cosmos DB and Static Web Apps",
      dateCreated: "2025-12-08",
      plotId: 2,
    },
  ];

  const [seeds, setSeeds] = React.useState(initialSeeds);
  const [isFormOpen, setIsFormOpen] = React.useState(false);

  return (
    <>
      <button className="bg-blue-500" onClick={() => setIsFormOpen(true)}>
        Add Seed
      </button>
      {isFormOpen && <AddSeedForm />}

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
    </>
  );
}

export default Seeds;
