import React, { useEffect } from "react";
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

  function onAddSeed({ title, description, plotId }) {
    const newSeed = {
      id: Date.now(),
      title,
      description,
      plotId,
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

  function getPlotName(plotId) {
    const plot = plots.find((p) => p.id === plotId);
    return plot ? plot.name : "Unknown";
  }

  const [seeds, setSeeds] = React.useState(initialSeeds);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingSeed, setEditingSeed] = React.useState(null);
  const [plots] = React.useState(initialPlots);
  const [selectedPlotId, setSelectedPlotId] = React.useState("all");

  const filteredSeeds =
    selectedPlotId === "all"
      ? seeds
      : seeds.filter((seed) => seed.plotId === Number(selectedPlotId));

  useEffect(() => {
    if (!isFormOpen) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        closeForm();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFormOpen]);

  useEffect(() => {
    if (isFormOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isFormOpen]);

  return (
    <>
      <button
        className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        onClick={() => setIsFormOpen(true)}
      >
        Add Seed
      </button>
      {isFormOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => closeForm()}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <AddSeedForm
              onAddSeed={onAddSeed}
              onUpdateSeed={onUpdateSeed}
              initialSeed={editingSeed}
              closeForm={closeForm}
              plots={plots}
            />
          </div>
        </div>
      )}
      <div className="mb-4">
        <label className="mr-2 text-sm font-medium">Filter by plot:</label>
        <select
          value={selectedPlotId}
          onChange={(e) => setSelectedPlotId(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm"
        >
          <option value="all">All</option>
          {plots.map((plot) => (
            <option key={plot.id} value={plot.id}>
              {plot.name}
            </option>
          ))}
        </select>
      </div>

      {filteredSeeds.length === 0 ? (
        <p className="text-gray-500 italic">No seeds in this plot yet 🌱</p>
      ) : (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSeeds.map((seed, i) => (
            <SeedCard
              key={seed.id}
              title={seed.title}
              description={seed.description}
              dateCreated={seed.dateCreated}
              plotName={getPlotName(seed.plotId)}
              onEdit={() => (setEditingSeed(seed), setIsFormOpen(true))}
              onDelete={() => onDeleteSeed(seed.id)}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default Seeds;
