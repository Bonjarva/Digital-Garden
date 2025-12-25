import React, { useEffect } from "react";
import { createSeed, updateSeed, deleteSeed } from "../services/seedService";

import SeedCard from "../components/SeedCard";
import AddSeedForm from "../components/AddSeedForm";

function Seeds() {
  const initialPlots = [
    { id: 1, name: "Frontend" },
    { id: 2, name: "Cloud" },
    { id: 3, name: "Career" },
  ];

  function closeForm() {
    setIsFormOpen(false);
    setEditingSeed(null);
  }

  async function onAddSeed({ title, description, plotId }) {
    setIsSaving(true);

    try {
      const newSeed = await createSeed({ title, description, plotId });

      setSeeds([...seeds, newSeed]);
      setModalError(null);
      closeForm();
    } catch (err) {
      setModalError(err.message);
    } finally {
      setIsSaving(false);
    }
  }

  async function onUpdateSeed(updatedSeed) {
    setIsSaving(true);

    try {
      const updatedSeeds = await updateSeed(seeds, updatedSeed);
      setSeeds(updatedSeeds);
      setModalError(null);
      closeForm();
    } catch (err) {
      setModalError(err.message);
    } finally {
      setIsSaving(false);
    }
  }

  async function onDeleteSeed(seedId) {
    setIsSaving(true);

    try {
      const updatedSeeds = await deleteSeed(seeds, seedId);
      setSeeds(updatedSeeds);
      setPageError(null);
    } catch (err) {
      setPageError(err.message);
    } finally {
      setIsSaving(false);
    }
  }

  // Helper to get plot name by id
  function getPlotName(plotId) {
    const plot = plots.find((p) => p.id === plotId);
    return plot ? plot.name : "Unknown";
  }

  const [seeds, setSeeds] = React.useState([]);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingSeed, setEditingSeed] = React.useState(null);
  const [plots] = React.useState(initialPlots);
  const [selectedPlotId, setSelectedPlotId] = React.useState("all");
  const [isSaving, setIsSaving] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const [pageError, setPageError] = React.useState(null);
  const [modalError, setModalError] = React.useState(null);

  // Filter seeds based on selected plot
  const filteredSeeds =
    selectedPlotId === "all"
      ? seeds
      : seeds.filter((seed) => seed.plotId === Number(selectedPlotId));

  // Handle Escape key to close modal
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

  // Prevent background scrolling when modal is open
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

  // Load seeds on component mount
  React.useEffect(() => {
    async function loadSeeds() {
      try {
        setIsLoading(true);
        setPageError(null);

        const response = await fetch("/api/listSeeds");

        if (!response.ok) {
          throw new Error("Failed to fetch seeds");
        }

        const data = await response.json();

        setSeeds(data);
      } catch (err) {
        setPageError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadSeeds();
  }, []);

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
              isSaving={isSaving}
              error={modalError}
            />
          </div>
        </div>
      )}
      {pageError && (
        <div className="mb-4 rounded bg-red-100 text-red-700 px-4 py-2">
          {pageError}
        </div>
      )}
      {isLoading && <p className="p-6 text-gray-500">Loading seeds...</p>}
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

      {!isLoading && filteredSeeds.length === 0 ? (
        <p className="text-gray-500 italic">No seeds in this plot yet 🌱</p>
      ) : (
        !isLoading && (
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
        )
      )}
    </>
  );
}

export default Seeds;
