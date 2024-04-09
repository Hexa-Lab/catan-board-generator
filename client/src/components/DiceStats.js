import React, { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const DiceStats = ({ numberStats, eventStats, isCitiesAndKnights }) => {
  const [group, setGroup] = useState("numbers");

  useEffect(() => {
    if (!isCitiesAndKnights) {
      setGroup("numbers");
    }
  }, [isCitiesAndKnights]);

  const handleChange = (event, newGroup) => {
    if (newGroup !== null) {
      setGroup(newGroup);
    }
  };

  return (
    <div className="absolute top-[30px] right-[30px] w-[470px] h-max bg-white bg-opacity-50 overflow-hidden rounded-2xl ">
      {isCitiesAndKnights && (
        <ToggleButtonGroup
          exclusive
          onChange={handleChange}
          value={group}
          className="w-full overflow-auto"
        >
          <ToggleButton className="flex-1" value="numbers">
            Numbers
          </ToggleButton>
          <ToggleButton className="flex-1" value="event">
            Event Die
          </ToggleButton>
        </ToggleButtonGroup>
      )}
      {group === "numbers" && (
        <BarChart
          dataset={numberStats}
          xAxis={[{ scaleType: "band", dataKey: "number", label: "Number" }]}
          yAxis={[{ label: "Amount Rolled" }]}
          series={[{ dataKey: "value", color: "rgb(60, 60, 60)" }]}
          width={500}
          height={300}
        />
      )}
      {group === "event" && (
        <div>
          <BarChart
            dataset={eventStats}
            xAxis={[{ scaleType: "band", dataKey: "side", label: "Event" }]}
            yAxis={[{ label: "Amount Rolled" }]}
            series={[{ dataKey: "value", color: "rgb(60, 60, 60)" }]}
            width={500}
            height={300}
          />
        </div>
      )}
    </div>
  );
};

export default DiceStats;
