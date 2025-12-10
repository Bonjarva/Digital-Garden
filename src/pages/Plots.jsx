import React from "react";
import PlotCard from "../components/PlotCard";

function Plots() {
  const plots = [
    {
      name: "Frontend Ideas",
      description: "React, Tailwind, UI patterns, animations.",
      seedCount: 5,
    },
    {
      name: "Backend & Azure",
      description: "Cosmos DB, Functions, Static Web Apps, API ideas.",
      seedCount: 0,
    },
    {
      name: "Learning Notes",
      description: "Personal study notes, tutorials, tips.",
      seedCount: 3,
    },
    {
      name: "Books & Articles",
      description: "Ideas from books, blogs, and articles I want to remember.",
      seedCount: 7,
    },
    {
      name: "Side Projects",
      description: "Small experiments, prototypes, and side project ideas.",
      seedCount: 1,
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Plots</h1>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plots.map((plot, i) => (
          <PlotCard
            key={i}
            name={plot.name}
            description={plot.description}
            seedCount={plot.seedCount}
            onOpen={() => console.log("Opening plot:", plot.name)}
          />
        ))}
      </div>
    </div>
  );
}

export default Plots;
