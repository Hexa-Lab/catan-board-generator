import React, { useState, useEffect } from "react";
import { HexGrid, Layout, Pattern, Hexagon, Text } from "react-hexgrid";
import NumberBackground from './NumberBackground';
import Tile from './Tile';
import { ExtendedBaseGameBoard } from '../utils/constants';

const ExtendedBaseGame = () => {
  const [prevBoardLayout, setPrevBoardLayout] = useState([]);
  const [boardLayout, setBoardLayout] = useState(ExtendedBaseGameBoard);

  useEffect(() => {
    shuffleBoard();
  }, boardLayout);

  useEffect(() => {
    function handleKeyDown(e) {
      e.preventDefault();
      if (e.keyCode === 50) {
        shuffleBoard();
      }

      if (e.keyCode === 187) {
        setBoardLayout([...prevBoardLayout]);
      }
    }

    document.addEventListener('keydown', handleKeyDown, false);

    return () => document.removeEventListener('keydown', handleKeyDown, false);
  }, []);

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
        pipCounts.forest >= 16 &&
        pipCounts.forest <= 20 &&
        pipCounts.brick >= 14 &&
        pipCounts.brick <= 18 &&
        pipCounts.sheep >= 16 &&
        pipCounts.sheep <= 20 &&
        pipCounts.wheat >= 16 &&
        pipCounts.wheat <= 20 &&
        pipCounts.ore >= 14 &&
        pipCounts.ore <= 18
      );
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function isNeighborWithSixOrEight(hexId) {
    const neighbors = boardLayout.find(hex => hex.id === hexId).neighbors;
    return neighbors.some(neighborId => {
      const neighbor = boardLayout[neighborId];
      return neighbor.number === 6 || neighbor.number === 8;
    });
  }

  function placeSixesAndEights() {
    let sixesAndEights = [6, 6, 6, 8, 8, 8];
    shuffleArray(sixesAndEights);
  
    // Initialize a count for 6s and 8s for each resource type
    const resourceCounts = { forest: 0, brick: 0, sheep: 0, wheat: 0, ore: 0 };
  
    // Helper function to check if a resource type can receive another 6 or 8
    const canPlaceNumber = (resource, number) => {
      const counts = Object.values(resourceCounts);
      const minCount = Math.min(...counts);
      return resourceCounts[resource] === minCount || (number === 8 && resourceCounts[resource] === minCount + 1);
    };
  
    for (let number of sixesAndEights) {
      let nonDesertHexes = boardLayout.filter(hex => hex.fill !== 'desert' && hex.number === null && !isNeighborWithSixOrEight(hex.id));
      shuffleArray(nonDesertHexes);
  
      let placed = false;
      for (let hex of nonDesertHexes) {
        if (canPlaceNumber(hex.fill, number)) {
          hex.number = number;
          resourceCounts[hex.fill]++;
          placed = true;
          break;
        }
      }
  
      if (!placed) {
        // Reset and retry if unable to place number with proper distribution
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
      const fills = boardLayout.map(hex => hex.fill);
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
    const neighbors = boardLayout.find(hex => hex.id === hexId).neighbors;
    return neighbors.some((neighborId) => {
      const neighbor = boardLayout[neighborId];
      return neighbor.number === number;
    });
  }

  function fillInOtherNumbers() {
    let otherNumbers = [2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 9, 9, 9, 10, 10, 10, 11, 11, 11, 12, 12];
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
        (hex) => (hex.number = (hex.fill === "desert") ? null : undefined)
      );

      placeSixesAndEights();
      success = fillInOtherNumbers();

      // Check if valid pip distribution is achieved
      if (success) {
        success = isValidPipDistribution();
      }
    } while (!success && attempts < 500);

    if (attempts >= 500 || !success) {
      console.log(`Failed to find a valid distribution after ${attempts} attempts`);
    }
  }

  function shuffleBoard() {
    setPrevBoardLayout([...boardLayout]);
    shuffleFills();
    shuffleNumbers();
    // Update the state to trigger re-render
    setBoardLayout([...boardLayout]);
  }

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <div className="hexgrid-container">
          <div className="board" style={{zIndex: -1, position: "absolute"}}>
            <HexGrid width={1000} height={1000} viewBox="-60 -60 120 120"
              style={{ transform: "rotate(90deg)" }}>
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
                      <>
                        <NumberBackground />
                        <Tile hex={hex} />
                      </>
                    )}
                  </Hexagon>
                ))}
                <Pattern id="forest" link="/assets/wood.png" />
                <Pattern id="ore" link="/assets/ore.png" />
                <Pattern id="wheat" link="/assets/wheat.png" />
                <Pattern id="sheep" link="/assets/sheep.png" />
                <Pattern id="brick" link="/assets/brick.png" />
                <Pattern id="desert" link="/assets/desert.png" />
              </Layout>
            </HexGrid>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExtendedBaseGame;
