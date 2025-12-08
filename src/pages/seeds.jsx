import React from "react";
import SeedCard from "../components/SeedCard";

function Seeds() {
  const seeds = [
    { title: "Idea 1", description: "This is a sample seed." },
    { title: "Idea 2", description: "Another seed example." },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Seeds</h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {seeds.map((seed, i) => (
          <SeedCard key={i} title={seed.title} description={seed.description} />
        ))}
      </div>
    </div>
  );
}

export default Seeds;
