import React from "react";

function AddSeedForm({ onAddSeed, setIsFormOpen, initialSeed }) {
  //  Local state for controlled inputs
  const [title, setTitle] = React.useState(initialSeed?.title || "");
  const [description, setDescription] = React.useState(
    initialSeed?.description || ""
  );

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Call the parent function to add seed
    onAddSeed({ title, description });
  };

  return (
    <>
      <div className="bg-white-500 p-6 mb-4 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Add new Seed</h1>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <label htmlFor="seed_name">Seed Name</label>
          <input
            type="text"
            id="seed_name"
            name="seed_name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="seed_description">Seed Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter seed description"
            id="seed_description"
            name="seed_description"
          />
          <label htmlFor="seed_plot_id">Linked Plot ID</label>
          <input type="text" id="seed_plot_id" name="seed_plot_id" />
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            type="submit"
          >
            Add Seed
          </button>
          <button
            type="button"
            className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            onClick={() => setIsFormOpen(false)}
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
}

export default AddSeedForm;
