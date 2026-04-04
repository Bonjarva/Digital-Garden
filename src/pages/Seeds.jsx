import React, { useEffect } from "react";

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
    try {
      setIsSaving(true);
      setPageError(null);

      if (!title || !description) {
        setModalError("Title and description are required");
        return;
      }

      console.log("Calling API:", window.location.origin + "/api/createSeed");
      const response = await fetch("/api/createSeed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, plotId }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to create seed");
      }

      await loadSeeds(); // Use loadSeeds instead of refreshSeeds

      setModalError(null);
      closeForm();
    } catch (err) {
      console.error(err);

      setModalError(err.message);
    } finally {
      setIsSaving(false);
    }
  }

  async function onUpdateSeed(updatedSeed) {
    try {
      setIsSaving(true);
      setPageError(null);

      if (!updatedSeed.title || !updatedSeed.description) {
        setModalError("Title and description are required");
        return;
      }
      console.log("Calling API:", window.location.origin + "/api/updateSeed");
      const response = await fetch("/api/updateSeed", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedSeed),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to edit seed");
      }

      await loadSeeds(); // Use loadSeeds instead of refreshSeeds

      setModalError(null);
      closeForm();
    } catch (err) {
      setModalError(err.message);
    } finally {
      setIsSaving(false);
    }
  }

  async function onDeleteSeed(seed) {
    try {
      setIsSaving(true);
      setPageError(null);

      if (!seed || !seed.id) {
        setPageError("Seed ID is required");
        return;
      }

      console.log("Calling API:", window.location.origin + "/api/deleteSeed");
      const response = await fetch("/api/deleteSeed", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: seed.id, plotId: seed.plotId }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to delete seed");
      }

      await loadSeeds(); // Use loadSeeds instead of refreshSeeds

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
  const filteredSeeds = Array.isArray(seeds)
    ? selectedPlotId === "all"
      ? seeds
      : seeds.filter((seed) => seed.plotId == selectedPlotId)
    : [];

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
    loadSeeds();
  }, []);

  async function loadSeeds() {
    try {
      setIsLoading(true);
      setPageError(null);

      console.log("Calling API:", window.location.origin + "/api/listSeeds");
      const response = await fetch("/api/listSeeds");
      
      if (!response.ok) {
        let errorMessage = "Failed to fetch seeds from the server. Check your connection or the API state.";
        try {
          const errData = await response.json();
          if (errData && errData.error) {
            errorMessage = errData.error;
          }
        } catch (e) {
          // If not JSON, use default or response.statusText
          errorMessage += ` (Status: ${response.status} ${response.statusText})`;
        }
        throw new Error(errorMessage);
      }
      const data = await response.json();

      setSeeds(data);
    } catch (err) {
      console.error("Error loading seeds:", err);
      setPageError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Seeds Repository</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md flex items-center gap-2"
          onClick={() => setIsFormOpen(true)}
        >
          <span>Add Seed</span>
        </button>
      </div>

      {isFormOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => closeForm()}
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6"
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
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h3 className="text-sm font-bold text-red-800 uppercase tracking-wide">Error Loading Seeds</h3>
                <p className="text-sm text-red-700">{pageError}</p>
              </div>
            </div>
            <button 
              onClick={loadSeeds}
              className="px-3 py-1 bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors text-sm font-semibold"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center gap-4">
        <label className="text-sm font-semibold text-gray-700">Filter by plot:</label>
        <select
          value={selectedPlotId}
          onChange={(e) => setSelectedPlotId(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm transition-all"
        >
          <option value="all">All Plots</option>
          {plots.map((plot) => (
            <option key={plot.id} value={plot.id}>
              {plot.name}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center p-12 text-gray-500">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mb-4"></div>
          <p className="animate-pulse">Loading seeds from the garden...</p>
        </div>
      ) : filteredSeeds.length === 0 ? (
        <div className="text-center p-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <span className="text-4xl mb-4 block">🌱</span>
          <p className="text-gray-600 text-lg font-medium">No seeds in this plot yet</p>
          <p className="text-gray-400 text-sm mt-1">Start by adding a new seed to your digital garden!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSeeds.map((seed) => (
            <SeedCard
              key={seed.id}
              title={seed.title}
              description={seed.description}
              dateCreated={seed.dateCreated}
              plotName={getPlotName(seed.plotId)}
              onEdit={() => (setEditingSeed(seed), setIsFormOpen(true))}
              onDelete={() => onDeleteSeed(seed)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Seeds;
