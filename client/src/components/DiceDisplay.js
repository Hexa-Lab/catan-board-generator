import React from "react";
import { cn } from "../utils/cn.ts";

const DiceDisplay = ({
  diceRollResult,
  eventDieResult,
  isCitiesAndKnights,
}) => {
  if (!diceRollResult) return null; // Do not render anything if there's no result

  if (diceRollResult.dice1 === "?" && diceRollResult.dice2 === "?") {
    diceRollResult.dice1 = Math.floor(Math.random() * 6) + 1;
    diceRollResult.dice2 = Math.floor(Math.random() * 6) + 1;
  }

  let randomEventDie = [
    "pirate",
    "pirate",
    "pirate",
    "green",
    "blue",
    "yellow",
  ][Math.floor(Math.random() * 6)];

  return (
    <div
      className={cn(
        "absolute bottom-[100px] right-[100px] flex justify-between",
        isCitiesAndKnights ? "w-[225px]" : "w-[150px]"
      )}
    >
      <img
        src={`/assets/images/dice/red/${diceRollResult.dice1}.png`}
        className="w-[70px]"
        alt="Red Dice"
      />
      <img
        src={`/assets/images/dice/yellow/${diceRollResult.dice2}.png`}
        className="w-[70px]"
        alt="Yellow Dice"
      />
      {isCitiesAndKnights && (
        <img
          src={
            eventDieResult
              ? `/assets/images/dice/event/${eventDieResult}.png`
              : `/assets/images/dice/event/${randomEventDie}.png`
          }
          className="w-[70px]"
          alt="Event Die"
        />
      )}
    </div>
  );
};

export default DiceDisplay;
