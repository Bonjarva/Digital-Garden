import React from "react";

function AddSeedForm({
  onAddSeed,
  onUpdateSeed,
  initialSeed,
  closeForm,
  plots,
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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (initialSeed) {
      onUpdateSeed({
        ...initialSeed,
        title,
        description,
        plotId,
      });
    } else {
      onAddSeed({ title, description, plotId });
    }
  };

  return (
    <>
      <div className="bg-white-500 p-6 mb-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold">
          {isEditMode ? "Edit Seed" : "Add Seed"}
        </h2>

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Seed Name</span>
            <input
              type="text"
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
          >
            Add Seed
          </button>
          <button
            type="button"
            className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            onClick={() => closeForm()}
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
}

export default AddSeedForm;
