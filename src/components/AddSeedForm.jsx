import React from "react";

function AddSeedForm() {
  return (
    <>
      <div className="bg-white-500 p-6 mb-4 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Add new Seed</h1>
        <form
          className="flex flex-col space-y-4"
          onSubmit={() =>
            console.log({ seed_name, seed_description, seed_plot_id })
          }
        >
          <label htmlFor="seed_name">Seed Name</label>
          <input className="" type="text" id="seed_name" name="seed_name" />
          <label htmlFor="seed_description">Seed Description</label>
          <input type="text" id="seed_description" name="seed_description" />
          <label htmlFor="seed_plot_id">Linked Plot ID</label>
          <input type="text" id="seed_plot_id" name="seed_plot_id" />
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            type="submit"
          >
            Add Seed
          </button>
          <button
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
