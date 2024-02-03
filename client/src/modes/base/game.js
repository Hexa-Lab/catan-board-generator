import React, { useState, useEffect } from "react";
import { HexGrid, Layout, Pattern, Hexagon } from "react-hexgrid";
import { Hexes, Bridges, Ports } from './constants'
import { Button, Alert } from '@mui/material'

const BaseGame = (props) => {
  const [boardLayout, setBoardLayout] = useState(Hexes);
  const [bridges,] = useState(Bridges)
  const [ports,] = useState(Ports)
  const [selectedHexes, setSelectedHexes] = useState([]);
  const [showAcceptButtons, setShowAcceptButtons] = useState()
  const { twoTwelve } = props
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    shuffleBoard();
  }, boardLayout);

  useEffect(() => {
    function handleKeyDown(e) {
      e.preventDefault();

      // Key: 1
      if (e.keyCode === 49) {
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

    let resourceSixOrEight = { forest: false, brick: false, sheep: false, wheat: false, ore: false };

    // Create an array of indices for hexagons that are not desert
    let nonDesertIndices = boardLayout
      .map((hex, index) => hex.fill !== "desert" ? index : -1)
      .filter(index => index !== -1);

    for (let number of sixesAndEights) {
      shuffleArray(nonDesertIndices);
      let placed = false;

      for (let index of nonDesertIndices) {
        let hex = boardLayout[index];
        if (hex.number === null && !isNeighborWithSixOrEight(hex.id) && !resourceSixOrEight[hex.fill]) {
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
    // Shuffle 'fill' attributes including the desert
    const fills = ports.map(port => port.fill);
    shuffleArray(fills);
    for (let i = 0; i < ports.length; i++) {
      ports[i].fill = fills[i];
    }
  }

  function checkFillValidity() {
    for (const hex of boardLayout) {
      if (hex.fill === "desert" || hex.fill === "any-top-left") continue;
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
        (hex) => (hex.number = (hex.fill === "desert" || hex.fill === "any-top-left") ? null : undefined)
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
    shufflePorts();
    // Update the state to trigger re-render
    setBoardLayout([...boardLayout]);
  }

  const handleHexClick = (index) => {
    const alreadySelected = selectedHexes.includes(index);

    if (alreadySelected) {
      setSelectedHexes(selectedHexes.filter(i => i !== index));
      if (selectedHexes.length <= 2) setShowAcceptButtons(false);
    } else if (selectedHexes.length < 2) {
      setSelectedHexes([...selectedHexes, index]);
      if (selectedHexes.length === 1) setShowAcceptButtons(true);
    }
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
          <div className="board" style={{ zIndex: -1, position: "absolute" }}>
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
          <div className="tokens" style={{ zIndex: 1, position: "absolute" }}>
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
                    stroke={selectedHexes.includes(index) ? "red" : null}
                    strokeWidth={selectedHexes.includes(index) ? 0.7 : null}
                    fill={hex.number ? (twoTwelve && (hex.number === 2 || hex.number === 12)) ? "2-12" : `${hex.number}` : "blank"}
                    onClick={() => handleHexClick(index)}
                  >
                  </Hexagon>
                ))}
                <Pattern id="2" link="/assets/images/tokens/2.png" style={{ transform: "scale(200)" }} />
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
          <div className="bridges" style={{ position: "absolute"}}>
            <HexGrid width={1000} height={1000} viewBox="-60 -60 120 120"
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
          <div className="ports" style={{ position: "absolute" }}>
            <HexGrid width={1000} height={1000} viewBox="-60 -60 120 120"
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
      </div>
      {showAcceptButtons && (
        <div className="accept-buttons" style={{ zIndex: 2, position: 'absolute', bottom: 50, right: '50%', transform: 'translateX(50%)' }}>
          <Button variant="contained" color="primary" onClick={handleSwapNumbers}>
            swap numbers
          </Button>
          <Button variant="contained" color="primary" onClick={handleSwapResources}>
            swap resources
          </Button>
          <Button variant="contained" color="primary" onClick={handleSwapResourcesAndNumbers}>
            swap both
          </Button>
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

export default BaseGame;
