import React, { useState, useEffect } from "react";
import { HexGrid, Layout, Pattern, Hexagon, Text } from "react-hexgrid";
import {IconButton} from '@mui/material'
import ShuffleIcon from '@mui/icons-material/Shuffle';


const BaseGame = () => {
  const [boardLayout, setBoardLayout] = useState([
    {
      q: 0,
      r: -2,
      s: 2,
      fill: "wheat",
      number: 2,
      id: 0,
      neighbors: [1, 3, 4],
    },
    {
      q: 1,
      r: -2,
      s: 1,
      fill: "wheat",
      number: 3,
      id: 1,
      neighbors: [0, 2, 4, 5],
    },
    {
      q: 2,
      r: -2,
      s: 0,
      fill: "wheat",
      number: 3,
      id: 2,
      neighbors: [1, 5, 6],
    },
    {
      q: -1,
      r: -1,
      s: 2,
      fill: "wheat",
      number: 4,
      id: 3,
      neighbors: [0, 4, 7, 8],
    },
    {
      q: 0,
      r: -1,
      s: 1,
      fill: "forest",
      number: 4,
      id: 4,
      neighbors: [0, 1, 3, 5, 8, 9],
    },
    {
      q: 1,
      r: -1,
      s: 0,
      fill: "forest",
      number: 5,
      id: 5,
      neighbors: [1, 2, 4, 6, 9, 10],
    },
    {
      q: 2,
      r: -1,
      s: -1,
      fill: "forest",
      number: 5,
      id: 6,
      neighbors: [2, 5, 10, 11],
    },
    {
      q: -2,
      r: 0,
      s: 2,
      fill: "forest",
      number: 6,
      id: 7,
      neighbors: [3, 8, 12],
    },
    {
      q: -1,
      r: 0,
      s: 1,
      fill: "ore",
      number: 6,
      id: 8,
      neighbors: [3, 4, 7, 9, 12, 13],
    },
    {
      q: 0,
      r: 0,
      s: 0,
      fill: "ore",
      number: 8,
      id: 9,
      neighbors: [4, 5, 8, 10, 13, 14],
    },
    {
      q: 1,
      r: 0,
      s: -1,
      fill: "ore",
      number: 8,
      id: 10,
      neighbors: [5, 6, 9, 11, 14, 15],
    },
    {
      q: 2,
      r: 0,
      s: -2,
      fill: "sheep",
      number: 9,
      id: 11,
      neighbors: [6, 10, 15],
    },
    {
      q: -2,
      r: 1,
      s: 1,
      fill: "sheep",
      number: 9,
      id: 12,
      neighbors: [7, 8, 13, 16],
    },
    {
      q: -1,
      r: 1,
      s: 0,
      fill: "sheep",
      number: 10,
      id: 13,
      neighbors: [8, 9, 12, 14, 16, 17],
    },
    {
      q: 0,
      r: 1,
      s: -1,
      fill: "sheep",
      number: 10,
      id: 14,
      neighbors: [9, 10, 13, 15, 17, 18],
    },
    {
      q: 1,
      r: 1,
      s: -2,
      fill: "brick",
      number: 11,
      id: 15,
      neighbors: [10, 11, 14, 18],
    },
    {
      q: -2,
      r: 2,
      s: 0,
      fill: "brick",
      number: 11,
      id: 16,
      neighbors: [12, 13, 17],
    },
    {
      q: -1,
      r: 2,
      s: -1,
      fill: "brick",
      number: 12,
      id: 17,
      neighbors: [13, 14, 16, 18],
    },
    {
      q: 0,
      r: 2,
      s: -2,
      fill: "desert",
      number: null,
      id: 18,
      neighbors: [14, 15, 17],
    },
  ]);

  useEffect(() => {
    shuffleBoard();
  }, boardLayout);

  function calculatePips(number) {
    switch (number) {
      case 2:
      case 12:
        return 1;
      case 3:
      case 11:
        return 2;
      case 4:
      case 10:
        return 3;
      case 5:
      case 9:
        return 4;
      case 6:
      case 8:
        return 5;
      default:
        return 0;
    }
  }

  function isValidPipDistribution() {
    const pipCounts = { forest: 0, brick: 0, sheep: 0, wheat: 0, ore: 0 };

    for (const hex of boardLayout) {
      if (hex.fill !== "desert") {
        pipCounts[hex.fill] += calculatePips(hex.number);
      }
    }

    return (
      pipCounts.forest >= 12 &&
      pipCounts.forest <= 15 &&
      pipCounts.brick >= 9 &&
      pipCounts.brick <= 12 &&
      pipCounts.sheep >= 12 &&
      pipCounts.sheep <= 15 &&
      pipCounts.wheat >= 12 &&
      pipCounts.wheat <= 15 &&
      pipCounts.ore >= 9 &&
      pipCounts.ore <= 12
    );
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function isNeighborWithSixOrEight(hexId, number) {
    const neighbors = boardLayout.find((hex) => hex.id === hexId).neighbors;
    return neighbors.some((neighborId) => {
      const neighbor = boardLayout[neighborId];
      return neighbor.number === 6 || neighbor.number === 8;
    });
  }

  function placeSixesAndEights() {
    let sixesAndEights = [6, 6, 8, 8];
    shuffleArray(sixesAndEights);
  
    let resourceSixOrEight = { forest: false, brick: false, sheep: false, wheat: false, ore: false };
  
    // Create an array of indices for hexagons that are not desert
    let nonDesertIndices = boardLayout
      .map((hex, index) => (hex.fill !== "desert" ? index : -1))
      .filter(index => index !== -1);
  
    for (let number of sixesAndEights) {
      shuffleArray(nonDesertIndices);
      let placed = false;
  
      for (let index of nonDesertIndices) {
        let hex = boardLayout[index];
        if (hex.number === null && !isNeighborWithSixOrEight(hex.id, number) && !resourceSixOrEight[hex.fill]) {
          hex.number = number;
          placed = true;
          resourceSixOrEight[hex.fill] = true; // Mark this resource as having a 6 or 8
          break;
        }
      }
  
      if (!placed) {
        boardLayout.forEach(hex => {
          if (hex.fill !== "desert") hex.number = null;
        });
        placeSixesAndEights(); // Retry recursively
        return;
      }
    }
  }

  function shuffleFills() {
    let validFills = false;
    let attempts = 0;
  
    while (!validFills && attempts < 1000) {
      // Shuffle 'fill' attributes including the desert
      const fills = boardLayout.map((hex) => hex.fill);
      shuffleArray(fills);
      for (let i = 0; i < boardLayout.length; i++) {
        boardLayout[i].fill = fills[i];
      }
  
      // Check if the new fills are valid
      validFills = checkFillValidity();
  
      attempts++;
    }
  
    if (attempts >= 1000) {
      console.log("Failed to find a valid fill distribution after 1000 attempts");
    }
  }
  
  function checkFillValidity() {
    for (const hex of boardLayout) {
      if (hex.fill === "desert") continue;
      let sameTypeCount = 0;
  
      for (const neighborId of hex.neighbors) {
        const neighbor = boardLayout[neighborId];
        if (neighbor.fill === hex.fill) {
          sameTypeCount++;
          if (sameTypeCount > 1) return false; // More than one neighbor of the same type
        }
      }
    }
    return true; // All hexes have valid neighbors
  }
  
  function isNeighborWithSameNumber(hexId, number) {
    const neighbors = boardLayout.find((hex) => hex.id === hexId).neighbors;
    return neighbors.some((neighborId) => {
      const neighbor = boardLayout[neighborId];
      return neighbor.number === number;
    });
  }
  
  function fillInOtherNumbers() {
    let otherNumbers = [2, 3, 3, 4, 4, 5, 5, 9, 9, 10, 10, 11, 11, 12];
    shuffleArray(otherNumbers);
  
    for (const hex of boardLayout) {
      if (hex.fill === "desert" || hex.number !== null) continue;
  
      let placed = false;
      for (let i = 0; i < otherNumbers.length; i++) {
        let currentNumber = otherNumbers[i];
        if (!isNeighborWithSameNumber(hex.id, currentNumber)) {
          hex.number = currentNumber;
          otherNumbers.splice(i, 1);
          placed = true;
          break;
        }
      }
  
      // If a number could not be placed, indicate the need for a reset
      if (!placed) {
        console.log("could not place a number")
        return false;
      }
    }
  
    return true; // All numbers placed successfully
  }
  
  function shuffleNumbers() {
    let attempts = 0;
    let success = false;
  
    do {
      attempts++;
      // Reset numbers
      boardLayout.forEach(
        (hex) => (hex.number = hex.fill === "desert" ? null : undefined)
      );

      placeSixesAndEights();
      success = fillInOtherNumbers();

      // Check if valid pip distribution is achieved
      if (success) {
        success = isValidPipDistribution();
      }
    } while (!success && attempts < 100);
  
    if (attempts >= 100 || !success) {
      console.log(`Failed to find a valid distribution after ${attempts} attempts`);
    }
}

  function shuffleBoard() {
    shuffleFills();
    shuffleNumbers();
    // Update the state to trigger re-render
    setBoardLayout([...boardLayout]);
  }

  return (
    <div>
      <HexGrid width={900} height={900} viewBox="-50 -50 100 100">
        <Layout
          size={{ x: 10, y: 10 }}
          flat={true}
          spacing={1}
          origin={{ x: 0, y: 0 }}
        >
          {boardLayout.map((hex, index) => (
            <Hexagon
              key={index}
              q={hex.q}
              r={hex.r}
              s={hex.s}
              stroke="#006994"
              strokeWidth={0.3}
              fill={hex.fill}
            >
              {hex.number && (
                <Text
                  fontFamily="Calibri"
                  fontSize={8}
                  strokeWidth={0.2}
                  stroke={
                    hex.number === 8 || hex.number === 6 ? "black" : "black"
                  }
                  fill={hex.number === 8 || hex.number === 6 ? "red" : "white"}
                >
                  {hex.number}
                </Text>
              )}
            </Hexagon>
          ))}
          <Pattern id="forest" link="/assets/wood.png" />
          <Pattern id="ore" link="/assets/ore.png" />
          <Pattern id="wheat" link="/assets/wheat.png" />
          <Pattern id="sheep" link="/assets/sheep.png" />
          <Pattern id="brick" link="/assets/brick.png" />
          <Pattern id="desert" link="/assets/desert.png" />
          <Pattern
            id="any-top-left"
            link="https://i.ibb.co/VNGt99L/any-bottom-left.png"
          />
          <Pattern
            id="any-bottom-left"
            link="https://i.ibb.co/MND5qK0/any-bottom-right.png"
          />
          <Pattern id="any-left" link="https://i.ibb.co/FbDryXJ/any-down.png" />
        </Layout>
      </HexGrid>
      <IconButton size="large" id="button-top-left" onClick={shuffleBoard}>
        <ShuffleIcon style={{color: "white"}} fontSize="large"/>
      </IconButton>
      <IconButton size="large" id="button-top-right" onClick={shuffleBoard}>
        <ShuffleIcon style={{color: "white"}} fontSize="large"/>
      </IconButton>
      <IconButton size="large" id="button-bottom-left" onClick={shuffleBoard}>
        <ShuffleIcon style={{color: "white"}} fontSize="large"/>
      </IconButton>
      <IconButton size="large" id="button-bottom-right" onClick={shuffleBoard}>
        <ShuffleIcon style={{color: "white"}} fontSize="large"/>
      </IconButton>
    </div>
  );
};

export default BaseGame;
