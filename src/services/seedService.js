function delay(ms = 500) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function createSeed({ title, description, plotId }) {
  await delay();

  return {
    id: Date.now(),
    title,
    description,
    plotId,
    dateCreated: new Date().toISOString(),
  };
}

export async function updateSeed(seeds, updatedSeed) {
  await delay();

  return seeds.map((seed) => (seed.id === updatedSeed.id ? updatedSeed : seed));
}

export async function deleteSeed(seeds, seedId) {
  await delay();

  return seeds.filter((seed) => seed.id !== seedId);
}
