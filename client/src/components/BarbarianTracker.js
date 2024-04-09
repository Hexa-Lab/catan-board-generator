import React from "react";
import { cn } from "../utils/cn.ts";

const BarbarianTracker = ({ position }) => {
  return (
    <div className="absolute left-[100px] top-1/2 -translate-y-1/2 flex flex-col items-center justify-around w-[230px] h-[400px] bg-[#c8ffff] rounded-xl p-[10px] border-[40px] border-solid border-white border-opacity-0">
      {[...Array(8)].map((_, index) => {
        // Compute Tailwind classes based on index
        const positionClass =
          index % 3 === 0
            ? "left-[20px]"
            : index % 3 === 1
            ? "left-[60px]"
            : "left-[100px]";
        const backgroundColorClass = () => {
          if (position === 7) {
            return "bg-red-900";
          }
          if (position === index) {
            return "bg-lightblue";
          }
          return "bg-gray-200";
        };

        return (
          <div
            key={index}
            className={`w-12 h-12 rounded-full border-2 border-black absolute transition-all ease-linear duration-300 ${positionClass} ${backgroundColorClass()}`}
            style={{ top: `${index * 12.5}%` }} 
          ></div>
        );
      })}
      <div
        className={cn(
          "absolute w-[80px] h-[108px]",
          "bg-[url(../public/assets/images/pirate-ship.png)] bg-cover",
          "transition-all duration-300 ease-in-out",
          {
            "left-0": position % 3 === 0,
            "left-[40px]": position % 3 === 1,
            "left-[80px]": position % 3 === 2,
          }
        )}
        style={{ top: `${position * 12.5 - 20}%` }}
      ></div>
    </div>
  );
};

export default BarbarianTracker;
