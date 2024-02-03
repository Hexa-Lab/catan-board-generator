import React, { useEffect } from 'react';

export const preloadDiceImages = () => {
  const colors = ['red', 'yellow', 'event']; // Add 'event' to preload event dice images
  const diceNumbers = [1, 2, 3, 4, 5, 6];
  const eventDiceImages = ['pirate', 'green', 'blue', 'yellow']; // Event dice images

  colors.forEach((color) => {
    if (color === 'event') {
      eventDiceImages.forEach((image) => {
        const img = new Image();
        img.src = `/assets/images/dice/event/${image}.png`;
      });
    } else {
      diceNumbers.forEach((number) => {
        const img = new Image();
        img.src = `/assets/images/dice/${color}/${number}.png`;
      });
    }
  });
};

const DiceDisplay = ({ diceRollResult, isCitiesAndKnights }) => {
  useEffect(() => {
    preloadDiceImages(); // Preload images when the component mounts
  }, []);

  // Generate a random event die roll
  const eventDieResult = () => {
    const results = ['pirate', 'pirate', 'pirate', 'green', 'blue', 'yellow'];
    return results[Math.floor(Math.random() * results.length)];
  };

  if (!diceRollResult) return null; // Do not render anything if there's no result

  return (
    <div style={{ position: 'absolute', bottom: '100px', right: '100px', display: "flex", width: isCitiesAndKnights ? "225px" : "150px", justifyContent: "space-between"}}>
      <img src={`/assets/images/dice/red/${diceRollResult.dice1}.png`} style={{width: "70px"}} alt="Red Dice" />
      <img src={`/assets/images/dice/yellow/${diceRollResult.dice2}.png`} style={{width: "70px"}} alt="Yellow Dice" />
      {isCitiesAndKnights && <img src={`/assets/images/dice/event/${eventDieResult()}.png`} style={{width: "70px"}} alt="Event Dice" />}
    </div>
  );
};

export default DiceDisplay;
