import React, { useEffect } from 'react';

export const preloadDiceImages = () => {
  const colors = ['red', 'yellow']; // Dice colors
  const diceNumbers = [1, 2, 3, 4, 5, 6]; // Possible dice numbers

  colors.forEach((color) => {
    diceNumbers.forEach((number) => {
      const img = new Image();
      img.src = `/assets/images/dice/${color}/${number}.png`;
    });
  });
};

const DiceDisplay = ({ diceRollResult }) => {
  useEffect(() => {
    preloadDiceImages(); // Preload images when the component mounts
  }, []); // Empty dependency array means this runs once on mount

  if (!diceRollResult) return null; // Do not render anything if there's no result

  return (
    <div style={{ position: 'absolute', bottom: '100px', right: '100px', display: "flex", width: "150px", justifyContent: "space-between"}}>
      <img src={`/assets/images/dice/red/${diceRollResult.dice1}.png`} style={{width: "70px"}} alt="Red Dice" />
      <img src={`/assets/images/dice/yellow/${diceRollResult.dice2}.png`} style={{width: "70px"}} alt="Yellow Dice" />
    </div>
  );
};

export default DiceDisplay;
