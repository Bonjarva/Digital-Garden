export function createSeed({ title, description, plotId }) {
  return {
    id: Date.now(),
    title,
    description,
    plotId,
    dateCreated: new Date().toISOString(),
  };
}

export function updateSeed(seeds, updatedSeed) {
  return seeds.map((seed) => (seed.id === updatedSeed.id ? updatedSeed : seed));
}

export function deleteSeed(seeds, seedId) {
  // logic will go here
}
