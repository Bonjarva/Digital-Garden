import React, { useEffect, useRef } from "react";

function AddSeedForm({
  onAddSeed,
  onUpdateSeed,
  initialSeed,
  closeForm,
  plots,
  isSaving,
  error,
}) {
  //  Local state for controlled inputs
  const [title, setTitle] = React.useState(initialSeed?.title || "");
  const [description, setDescription] = React.useState(
    initialSeed?.description || ""
  );
  const [plotId, setPlotId] = React.useState(
    initialSeed ? initialSeed.plotId : plots[0]?.id
  );

  const isEditMode = Boolean(initialSeed);

  const titleInputRef = useRef(null);
  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (initialSeed) {
      await onUpdateSeed({
        ...initialSeed,
        title,
        description,
        plotId,
      });
    } else {
      await onAddSeed({ title, description, plotId });
    }
  };

  return (
    <>
      {error && (
        <div className="mb-4 rounded bg-red-100 text-red-700 px-3 py-2 text-sm">
          {error}
        </div>
      )}

      <h2 className="text-lg font-semibold">
        {isEditMode ? "Edit Seed" : "Add Seed"}
      </h2>

      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Seed Name</span>
          <input
            type="text"
            ref={titleInputRef}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter seed name"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">
            Seed Description
          </span>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter seed description"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Plot</span>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={plotId}
            onChange={(e) => setPlotId(Number(e.target.value))}
          >
            {plots.map((plot) => (
              <option key={plot.id} value={plot.id}>
                {plot.name}
              </option>
            ))}
          </select>
        </label>

        <button
          className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          type="submit"
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : isEditMode ? "Save Changes" : "Add Seed"}
        </button>

        <button
          type="button"
          className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          disabled={isSaving}
          onClick={() => closeForm()}
        >
          Cancel
        </button>
      </form>
    </>
  );
}

export default AddSeedForm;
