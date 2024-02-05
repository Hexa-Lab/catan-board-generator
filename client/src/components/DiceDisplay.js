import React from 'react';

const DiceDisplay = ({ diceRollResult, eventDieResult, isCitiesAndKnights }) => {
  if (!diceRollResult) return null; // Do not render anything if there's no result

  return (
    <div style={{ position: 'absolute', bottom: '100px', right: '100px', display: "flex", width: isCitiesAndKnights ? "225px" : "150px", justifyContent: "space-between"}}>
      <img src={`/assets/images/dice/red/${diceRollResult.dice1}.png`} style={{width: "70px"}} alt="Red Dice" />
      <img src={`/assets/images/dice/yellow/${diceRollResult.dice2}.png`} style={{width: "70px"}} alt="Yellow Dice" />
      {isCitiesAndKnights && <img src={eventDieResult ? `/assets/images/dice/event/${eventDieResult}.png` : "/assets/images/dice/event/pirate.png"} style={{width: "70px"}} alt="Event Die" />}
    </div>
  );
};

export default DiceDisplay;
