import React, { useState, useEffect } from "react";
import { HexGrid, Layout, Pattern, Hexagon } from "react-hexgrid";
import NumberTileBackground from '../../components/NumberTileBackground';
import Tile from '../../components/Tile';
import { Hexes, Bridges, Ports } from './constants';

const FourIslands = (props) => {
  const [boardLayout, setBoardLayout] = useState(Hexes);
  const [bridges,] = useState(Bridges)
  const [ports,] = useState(Ports)
  const {twoTwelve} = props

  useEffect(() => {
    shuffleBoard();
  }, boardLayout);

  useEffect(() => {
    function handleKeyDown(e) {
      e.preventDefault();

      // Key: 3
      if (e.keyCode === 51) {
        shuffleBoard();
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
        pipCounts.forest >= 10 &&
        pipCounts.forest <= 15 &&
        pipCounts.brick >= 7 &&
        pipCounts.brick <= 12 &&
        pipCounts.sheep >= 10 &&
        pipCounts.sheep <= 15 &&
        pipCounts.wheat >= 10 &&
        pipCounts.wheat <= 15 &&
        pipCounts.ore >= 7 &&
        pipCounts.ore <= 12
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
    let sixesAndEights = [6, 6, 8, 8];
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
      for (let i = fills.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        if (fills[i] === 'ocean' || fills[j] === 'ocean') {
            continue;
        }
        [fills[i], fills[j]] = [fills[j], fills[i]];
      }
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

  function shufflePorts() {
    const fills = ports.map(port => port.fill);
    shuffleArray(fills);
    for (let i = 0; i < ports.length; i++) {
      ports[i].fill = fills[i];
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
    let otherNumbers = [2, 3, 3, 4, 4, 4, 5, 5, 9, 9, 9, 10, 10, 10, 11, 11, 12];
    shuffleArray(otherNumbers);

    for (const hex of boardLayout) {
      if (hex.fill === "desert" || hex.fill === "ocean" || hex.number !== null) continue;

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

  function shufflePorts() {
      // Shuffle 'fill' attributes including the desert
      const fills = ports.map(port => port.fill);
      shuffleArray(fills);
      for (let i = 0; i < ports.length; i++) {
        ports[i].fill = fills[i];
      }
  }

  function shuffleBoard() {
    shuffleFills();
    shuffleNumbers();
    shufflePorts();
    // Update the state to trigger re-render
    setBoardLayout([...boardLayout]);
  }

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <div className="hexgrid-container">
          <div className="board" style={{zIndex: -1, position: "absolute"}}>
            <HexGrid width={1000} height={1000} viewBox="-70 -70 140 140"
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
                    q={hex.q - 1}
                    r={hex.r + 0.5}
                    s={hex.s}
                    stroke="black"
                    strokeWidth={0.2}
                    strokeOpacity={.7}
                    fill={hex.fill}
                  >
                    {hex.number && (
                      <>
                        <NumberTileBackground />
                        <Tile hex={hex} twoTwelve={twoTwelve} />
                      </>
                    )}
                  </Hexagon>
                ))}
                <Pattern id="forest" link="/assets/images/hexes/wood.png" />
                <Pattern id="ore" link="/assets/images/hexes/ore.png" />
                <Pattern id="wheat" link="/assets/images/hexes/wheat.png" />
                <Pattern id="sheep" link="/assets/images/hexes/sheep.png" />
                <Pattern id="brick" link="/assets/images/hexes/brick.png" />
                <Pattern id="desert" link="/assets/images/hexes/desert.png" />
                <Pattern id="ocean" link="/assets/images/hexes/ocean.png" />
              </Layout>
            </HexGrid>
          </div>
        </div>
        <div className="bridges" style={{position: "absolute", zIndex: 1}}>
          <HexGrid width={1000} height={1000} viewBox="-70 -70 140 140"
              style={{ transform: "rotate(90deg)" }}>
              <Layout
                size={{ x: 10, y: 10 }}
                flat={true}
                spacing={1}
                origin={{ x: 0, y: 0 }}
              >
                {bridges.map((bridge, index) => (
                  <Hexagon
                    key={index}
                    q={bridge.q - 1}
                    r={bridge.r + 0.5}
                    s={bridge.s}
                    fill={bridge.fill}
                  >
                  </Hexagon>
                ))}
                <Pattern id="bridges-top-left" link="/assets/images/bridges/bridges-bottom-left.png" />
                <Pattern id="bridges-top-right" link="/assets/images/bridges/bridges-top-left.png" />
                <Pattern id="bridges-left" link="/assets/images/bridges/bridges-bottom.png" />
                <Pattern id="bridges-right" link="/assets/images/bridges/bridges-top.png" />
                <Pattern id="bridges-bottom-left" link="/assets/images/bridges/bridges-bottom-right.png" />
                <Pattern id="bridges-bottom-right" link="/assets/images/bridges/bridges-top-right.png" />
              </Layout>
            </HexGrid>
          </div>
          <div className="ports" style={{position: "absolute", zIndex: 1}}>
            <HexGrid width={1000} height={1000} viewBox="-70 -70 140 140"
              style={{ transform: "rotate(90deg)" }}>
              <Layout
                size={{ x: 10, y: 10 }}
                flat={true}
                spacing={1}
                origin={{ x: 0, y: 0 }}
              >
                {ports.map((port, index) => (
                  <Hexagon
                    key={index}
                    q={port.q - 1}
                    r={port.r + 0.5}
                    s={port.s}
                    fill={port.fill}
                  >
                  </Hexagon>
                ))}
                <Pattern id="any" link="/assets/images/ports/any-port.png" />
                <Pattern id="ore-port" link="/assets/images/ports/ore-port.png" />
                <Pattern id="wheat-port" link="/assets/images/ports/wheat-port.png" />
                <Pattern id="sheep-port" link="/assets/images/ports/sheep-port.png" />
                <Pattern id="brick-port" link="/assets/images/ports/brick-port.png" />
                <Pattern id="wood-port" link="/assets/images/ports/wood-port.png" />
              </Layout>
            </HexGrid>
          </div>
      </div>
    </>
  );
};

export default FourIslands;
