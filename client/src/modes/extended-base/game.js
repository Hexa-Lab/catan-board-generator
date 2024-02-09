import React, { useState, useEffect } from "react";
import { HexGrid, Layout, Pattern, Hexagon } from "react-hexgrid";
import { Hexes, Bridges, Ports } from './constants';
import { Button, Alert } from '@mui/material'

const ExtendedBaseGame = (props) => {
  const [boardLayout, setBoardLayout] = useState(Hexes);
  const [bridges,] = useState(Bridges);
  const [ports,] = useState(Ports);
  const [selectedHexes, setSelectedHexes] = useState([]);
  const [showAcceptButtons, setShowAcceptButtons] = useState(false);
  const [isDesertSelected, setIsDesertSelected] = useState(false);
  const {twoTwelve} = props
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    shuffleBoard();
  }, boardLayout);

  useEffect(() => {
    function handleKeyDown(e) {
      e.preventDefault();

      // Key: 2
      if (e.keyCode === 50) {
        shuffleBoard();
      }
    }

    document.addEventListener('keydown', handleKeyDown, false);

    return () => document.removeEventListener('keydown', handleKeyDown, false);
  }, [shuffleBoard]);

  function calculatePips(number) {
    switch (number) {
      case 2:
      case 12:
        return twoTwelve ? 2 : 1;
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
    shuffleFills();
    shuffleNumbers();
    shufflePorts();
    // Update the state to trigger re-render
    setBoardLayout([...boardLayout]);
  }

  const handleHexClick = (index) => {
    const alreadySelected = selectedHexes.includes(index);
    let newSelectedHexes = selectedHexes;

    if (alreadySelected) {
      newSelectedHexes = selectedHexes.filter(hexIndex => hexIndex !== index);
    } else if (selectedHexes.length < 2) {
      newSelectedHexes = [...selectedHexes, index];
    } else {
      newSelectedHexes = [...selectedHexes.slice(1), index];
    }

    setSelectedHexes(newSelectedHexes);
    setIsDesertSelected(newSelectedHexes.some(hexIndex => boardLayout[hexIndex].fill === 'desert'));
    setShowAcceptButtons(newSelectedHexes.length === 2);
  };

  const handleSwapResources = () => {
    if (selectedHexes.length === 2) {
      const newBoardLayout = [...boardLayout];
      if (newBoardLayout[selectedHexes[0]].fill === "desert" || newBoardLayout[selectedHexes[1]].fill === "desert") {
        setErrorMessage("Invalid Swap. Desert cannot have a number token.");

        // Clear the error message after 3 seconds
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      } else {
        const fillTemp = newBoardLayout[selectedHexes[0]].fill
        newBoardLayout[selectedHexes[0]].fill = newBoardLayout[selectedHexes[1]].fill
        newBoardLayout[selectedHexes[1]].fill = fillTemp
  
        setBoardLayout(newBoardLayout);
      }
      setSelectedHexes([]);
      setShowAcceptButtons(false);
    }
  };
  const handleSwapNumbers = () => {
    if (selectedHexes.length === 2) {
      const newBoardLayout = [...boardLayout];
      if (newBoardLayout[selectedHexes[0]].fill === "desert" || newBoardLayout[selectedHexes[1]].fill === "desert") {
        setErrorMessage("Invalid Swap. Desert cannot have a number token.");

        // Clear the error message after 3 seconds
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      } else {
        const numberTemp = newBoardLayout[selectedHexes[0]].number
        newBoardLayout[selectedHexes[0]].number = newBoardLayout[selectedHexes[1]].number
        newBoardLayout[selectedHexes[1]].number = numberTemp
        setBoardLayout(newBoardLayout);
      }

      setSelectedHexes([]);
      setShowAcceptButtons(false);
    }
  };

  const handleSwapResourcesAndNumbers = () => {
    if (selectedHexes.length === 2) {
      const newBoardLayout = [...boardLayout];
      const numberTemp = newBoardLayout[selectedHexes[0]].number
      newBoardLayout[selectedHexes[0]].number = newBoardLayout[selectedHexes[1]].number
      newBoardLayout[selectedHexes[1]].number = numberTemp
      const fillTemp = newBoardLayout[selectedHexes[0]].fill
      newBoardLayout[selectedHexes[0]].fill = newBoardLayout[selectedHexes[1]].fill
      newBoardLayout[selectedHexes[1]].fill = fillTemp

      setBoardLayout(newBoardLayout);
      setSelectedHexes([]);
      setShowAcceptButtons(false);
    }
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <div className="hexgrid-container">
          <div className="board" style={{zIndex: -1, position: "absolute"}}>
            <HexGrid width={1700} height={1700} viewBox="-100 -100 200 200"
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
                    r={hex.r -0.5}
                    s={hex.s}
                    stroke="black"
                    strokeWidth={0.2}
                    strokeOpacity={.7}
                    fill={hex.fill}
                  >
                  </Hexagon>
                ))}
                <Pattern id="forest" link="/assets/images/hexes/wood.png" />
                <Pattern id="ore" link="/assets/images/hexes/ore.png" />
                <Pattern id="wheat" link="/assets/images/hexes/wheat.png" />
                <Pattern id="sheep" link="/assets/images/hexes/sheep.png" />
                <Pattern id="brick" link="/assets/images/hexes/brick.png" />
                <Pattern id="desert" link="/assets/images/hexes/desert.png" />
              </Layout>
            </HexGrid>
          </div>
          <div className="tokens" style={{zIndex: 1, position: "absolute"}}>
            <HexGrid width={1700} height={1700} viewBox="-100 -100 200 200"
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
                    r={hex.r - 0.5}
                    s={hex.s}
                    stroke={selectedHexes.includes(index) ? "red" : null}
                    strokeWidth={selectedHexes.includes(index) ? 0.7 : null}
                    fill={hex.number ? (twoTwelve && (hex.number === 2 || hex.number === 12)) ? "2-12" : `${hex.number}` : "blank"}
                    onClick={() => handleHexClick(index)}
                  >
                  </Hexagon>
                ))}
                <Pattern id="2" link="/assets/images/tokens/2.png" style={{transform: "scale(200)"}} />
                <Pattern id="3" link="/assets/images/tokens/3.png" />
                <Pattern id="4" link="/assets/images/tokens/4.png" />
                <Pattern id="5" link="/assets/images/tokens/5.png" />
                <Pattern id="6" link="/assets/images/tokens/6.png" />
                <Pattern id="8" link="/assets/images/tokens/8.png" />
                <Pattern id="9" link="/assets/images/tokens/9.png" />
                <Pattern id="10" link="/assets/images/tokens/10.png" />
                <Pattern id="11" link="/assets/images/tokens/11.png" />
                <Pattern id="12" link="/assets/images/tokens/12.png" />
                <Pattern id="2-12" link="/assets/images/tokens/2-12.png" />
                <Pattern id="blank" link="/assets/images/tokens/blank.png" />
              </Layout>
            </HexGrid>
          </div>
        </div>
        <div className="bridges" style={{position: "absolute"}}>
          <HexGrid width={1700} height={1700} viewBox="-100 -100 200 200"
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
                    q={bridge.q}
                    r={bridge.r}
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
          <div className="ports" style={{position: "absolute"}}>
            <HexGrid width={1700} height={1700} viewBox="-100 -100 200 200"
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
                    q={port.q}
                    r={port.r}
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
      {showAcceptButtons && (
        <div className="accept-buttons" style={{ zIndex: 2, position: 'absolute', bottom: 50, right: '50%', transform: 'translateX(50%)', display: 'flex', justifyContent: 'center' }}>
          {isDesertSelected ? (
            <Button variant="contained" onClick={handleSwapResourcesAndNumbers} style={{ backgroundColor: '#196a7e', color: 'white'}}>
              swap
            </Button>
          ) : (
            <>
              <Button variant="contained" onClick={handleSwapNumbers} style={{ marginRight: '10%', backgroundColor: '#196a7e', color: 'white' }}>
                swap numbers
              </Button>
              <Button variant="contained" onClick={handleSwapResources} style={{ marginRight: '10%', backgroundColor: '#196a7e', color: 'white' }}>
                swap resources
              </Button>
              <Button variant="contained" onClick={handleSwapResourcesAndNumbers} style={{ backgroundColor: '#196a7e', color: 'white'}}>
                swap both
              </Button>
            </>
          )}
        </div>
      )}
      {errorMessage && (
        <Alert variant="filled" severity="error" style={{position: "absolute", top: "20px", left: 0, right: 0, width: "max-content", marginLeft: "auto", marginRight: "auto"}}>
          {errorMessage}
      </Alert>
      )}
    </>
  );
};

export default ExtendedBaseGame;
