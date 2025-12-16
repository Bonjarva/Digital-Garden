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

  function onAddSeed({ title, description }) {
    setSeeds([
      ...seeds,
      {
        title,
        description,
        dateCreated: new Date().toISOString(),
      },
    ]);
    setIsFormOpen(false);
  }

  function onDeleteSeed(seedId) {
    setSeeds(seeds.filter((_, index) => index !== seedId));
  }

  const [seeds, setSeeds] = React.useState(initialSeeds);
  const [isFormOpen, setIsFormOpen] = React.useState(false);

  return (
    <>
      <button
        className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        onClick={() => setIsFormOpen(true)}
      >
        Add Seed
      </button>
      {isFormOpen && (
        <AddSeedForm onAddSeed={onAddSeed} setIsFormOpen={setIsFormOpen} />
      )}

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {seeds.map((seed, i) => (
          <SeedCard
            key={i}
            title={seed.title}
            description={seed.description}
            dateCreated={seed.dateCreated}
            onEdit={() => console.log("Editing:", seed.title)}
            onDelete={() => onDeleteSeed(i)}
          />
        ))}
      </div>
    </>
  );
}

export default Seeds;
