export async function createSeed({ title, description, plotId }) {
  return {
    id: Date.now(),
    title,
    description,
    plotId,
    dateCreated: new Date().toISOString(),
  };
}

export async function updateSeed(seeds, updatedSeed) {
  return seeds.map((seed) => (seed.id === updatedSeed.id ? updatedSeed : seed));
}

export async function deleteSeed(seeds, seedId) {
  return seeds.filter((seed) => seed.id !== seedId);
}
