function delay(ms = 500) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function maybeFail() {
  const shouldFail = Math.random() < 0.2; // 20% failure rate
  if (shouldFail) {
    throw new Error("Something went wrong. Please try again.");
  }
}

export async function createSeed({ title, description, plotId }) {
  await delay();
  maybeFail();

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
  maybeFail();

  return seeds.map((seed) => (seed.id === updatedSeed.id ? updatedSeed : seed));
}

export async function deleteSeed(seeds, seedId) {
  await delay();
  maybeFail();

  return seeds.filter((seed) => seed.id !== seedId);
}
