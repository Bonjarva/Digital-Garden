import React from "react";
import PlotCard from "../components/PlotCard";

function Plots() {
  const initialPlots = [
    {
      id: 1,
      name: "Frontend Ideas",
      description: "React, Tailwind, UI patterns",
      seedCount: 5,
    },
    {
      id: 2,
      name: "Backend & Azure",
      description: "Functions, Cosmos DB",
      seedCount: 3,
    },
  ];

  const [plots, setPlots] = React.useState(initialPlots);

  return (
    <>
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
    </>
  );
}

export default Plots;
