export function createSeed({ title, description, plotId }) {
  return {
    id: Date.now(),
    title,
    description,
    plotId,
    dateCreated: new Date().toISOString(),
  };
}

export function updateSeed(seed) {
  // logic will go here
}

export function deleteSeed(seeds, seedId) {
  // logic will go here
}
