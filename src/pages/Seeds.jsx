import React from "react";
import SeedCard from "../components/SeedCard";
import AddSeedForm from "../components/AddSeedForm";

function Seeds() {
  const initialPlots = [
    { id: 1, name: "Frontend" },
    { id: 2, name: "Cloud" },
    { id: 3, name: "Career" },
  ];

  const initialSeeds = [
    {
      id: 0,
      title: "Learn React",
      description: "Understand components and state",
      dateCreated: "2025-12-09",
      plotId: 1,
    },
    {
      id: 1,
      title: "Explore Azure",
      description: "Try Cosmos DB and Static Web Apps",
      dateCreated: "2025-12-08",
      plotId: 2,
    },
  ];

  function closeForm() {
    setIsFormOpen(false);
    setEditingSeed(null);
  }

  function onAddSeed({ title, description }) {
    const newSeed = {
      id: Date.now(),
      title,
      description,
      dateCreated: new Date().toISOString(),
    };
    setSeeds([...seeds, newSeed]);
    closeForm();
  }

  function onUpdateSeed(updatedSeed) {
    setSeeds(
      seeds.map((seed) => (seed.id === updatedSeed.id ? updatedSeed : seed))
    );
    closeForm();
  }

  function onDeleteSeed(seedId) {
    setSeeds(seeds.filter((seed) => seed.id !== seedId));
  }

  const [seeds, setSeeds] = React.useState(initialSeeds);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingSeed, setEditingSeed] = React.useState(null);
  const [plots] = React.useState(initialPlots);

  return (
    <>
      <button
        className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        onClick={() => setIsFormOpen(true)}
      >
        Add Seed
      </button>
      {isFormOpen && (
        <AddSeedForm
          onAddSeed={onAddSeed}
          onUpdateSeed={onUpdateSeed}
          initialSeed={editingSeed}
          closeForm={closeForm}
        />
      )}

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {seeds.map((seed, i) => (
          <SeedCard
            key={seed.id}
            title={seed.title}
            description={seed.description}
            dateCreated={seed.dateCreated}
            onEdit={() => (setEditingSeed(seed), setIsFormOpen(true))}
            onDelete={() => onDeleteSeed(seed.id)}
          />
        ))}
      </div>
    </>
  );
}

export default Seeds;
