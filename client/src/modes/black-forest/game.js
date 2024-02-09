import React, { useState, useEffect } from "react";
import { HexGrid, Layout, Pattern, Hexagon, Text } from "react-hexgrid";
import { Hexes, Bridges, Ports } from './constants';
import { Button, Alert } from '@mui/material'

const BlackForest = (props) => {
  const [boardLayout, setBoardLayout] = useState(Hexes);
  const [bridges,] = useState(Bridges);
  const [ports,] = useState(Ports);
  const [selectedHexes, setSelectedHexes] = useState([]);
  const [showAcceptButtons, setShowAcceptButtons] = useState(false);
  const [isInvalidHexSelected, setIsInvalidHexSelected] = useState(false);
  const { twoTwelve } = props
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    shuffleBoard();
  }, []);

  useEffect(() => {
    function handleKeyDown(e) {
      e.preventDefault();

      // Key: 4
      if (e.keyCode === 52) {
        shuffleBoard();
      }
    }

    document.addEventListener('keydown', handleKeyDown, false);

    return () => document.removeEventListener('keydown', handleKeyDown, false);
  }, [shuffleBoard]);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function placeSixesAndEights(layout) {
    let sixesAndEights = [6, 6, 6, 8, 8, 8];
    shuffleArray(sixesAndEights);
  
    sixesAndEights.forEach(number => {
      const validHexes = layout.filter(hex => hex.locked && hex.fill !== "desert" && hex.fill !== "ocean" && !isNeighborWithSixOrEight(hex.id, layout) && !hex.number);
      if (validHexes.length > 0) {
        const selectedHex = validHexes[0]; // Pick the first valid hex
        selectedHex.number = number;
      }
    });
  }
  
  function assignNumbers(layout, locked) {
    const numbersForLocked = [2, 3, 4, 4, 4, 5, 5, 5, 5, 9, 9, 9, 9, 10, 10, 10, 11, 12];
    const numbersForNonLocked = [3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 10, 10, 10, 10, 11];
    let numbers = locked ? [...numbersForLocked] : [...numbersForNonLocked];
  
    if (locked) {
      // Handle special placement for 6s and 8s among locked hexes
      placeSixesAndEights(layout);
    }
  
    // Shuffle remaining numbers for randomness
    shuffleArray(numbers);
  
    layout.forEach(hex => {
      if (hex.locked === locked && (hex.fill !== "desert" && hex.fill !== "ocean" && !hex.number)) {
        // Ensure this hex hasn't already been assigned a number in special cases
        hex.number = numbers.shift();
      }
    });
  }
  
  // Utilize assignNumbers during board setup and shuffling
  function shuffleBoard() {
    // Prepare the board layout, hiding non-locked hexes and clearing numbers
    let updatedLayout = boardLayout.map(hex => ({
      ...hex,
      hidden: !hex.locked,
      number: null // Clear numbers to reassess distribution
    }));
  
    // Shuffle and assign numbers separately for locked and non-locked hexes
    assignNumbers(updatedLayout, true); // Locked hexes
    assignNumbers(updatedLayout, false); // Non-locked hexes
  
    // Update the board layout state
    setBoardLayout(updatedLayout);
  }
  
  function isNeighborWithSixOrEight(hexId, layout) {
    const hex = layout.find(hex => hex.id === hexId);
    if (!hex || !hex.neighbors) return false;
    return hex.neighbors.some(neighborId => {
      const neighbor = layout.find(hex => hex.id === neighborId);
      return neighbor && (neighbor.number === 6 || neighbor.number === 8);
    });
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
    setIsInvalidHexSelected(newSelectedHexes.some(hexIndex => boardLayout[hexIndex].fill === 'desert' || boardLayout[hexIndex].fill === 'ocean'));
    setShowAcceptButtons(newSelectedHexes.length === 2);
  };

  const handleSwapResources = () => {
    if (selectedHexes.length === 2) {
      const newBoardLayout = [...boardLayout];
      if ((newBoardLayout[selectedHexes[0]].fill === "desert" || newBoardLayout[selectedHexes[0]].fill === "ocean") &&
        (newBoardLayout[selectedHexes[1]].fill === "desert" || newBoardLayout[selectedHexes[1]].fill === "ocean")) {
        const fillTemp = newBoardLayout[selectedHexes[0]].fill
        newBoardLayout[selectedHexes[0]].fill = newBoardLayout[selectedHexes[1]].fill
        newBoardLayout[selectedHexes[1]].fill = fillTemp

        setBoardLayout(newBoardLayout);
      } else if (newBoardLayout[selectedHexes[0]].fill === "desert" || newBoardLayout[selectedHexes[1]].fill === "desert") {
        setErrorMessage("Invalid Swap. Desert cannot have a number token.");

        // Clear the error message after 3 seconds
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      } else if (newBoardLayout[selectedHexes[0]].fill === "ocean" || newBoardLayout[selectedHexes[1]].fill === "ocean") {
        setErrorMessage("Invalid Swap. Ocean cannot have a number token.");

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
      if ((newBoardLayout[selectedHexes[0]].fill === "desert" || newBoardLayout[selectedHexes[0]].fill === "ocean") &&
        (newBoardLayout[selectedHexes[1]].fill === "desert" || newBoardLayout[selectedHexes[1]].fill === "ocean")) {
        setErrorMessage("No number tokens to swap.");

        // Clear the error message after 3 seconds
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      } else if (newBoardLayout[selectedHexes[0]].fill === "desert" || newBoardLayout[selectedHexes[1]].fill === "desert") {
        setErrorMessage("Invalid Swap. Desert cannot have a number token.");

        // Clear the error message after 3 seconds
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      } else if (newBoardLayout[selectedHexes[0]].fill === "ocean" || newBoardLayout[selectedHexes[1]].fill === "ocean") {
        setErrorMessage("Invalid Swap. Ocean cannot have a number token.");

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

  const handleReveal = (index) => {
    const newBoardLayout = [...boardLayout];
      newBoardLayout[index].hidden = false;
    setBoardLayout(newBoardLayout)
  }

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <div className="hexgrid-container">
          <div className="board" style={{ zIndex: -1, position: "absolute" }}>
            <HexGrid width={1200} height={1200} viewBox="-80 -80 160 160"
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
                    strokeWidth={hex.hidden ? 0 : 0.2}
                    strokeOpacity={.7}
                    fill={hex.hidden ? "hidden" : hex.fill}
                    opacity={hex.fill === "ocean" ? 0.5 : 1}
                  >
                  </Hexagon>
                ))}
                <Pattern id="forest" link="/assets/images/hexes/wood.png" />
                <Pattern id="ore" link="/assets/images/hexes/ore.png" />
                <Pattern id="wheat" link="/assets/images/hexes/wheat.png" />
                <Pattern id="sheep" link="/assets/images/hexes/sheep.png" />
                <Pattern id="brick" link="/assets/images/hexes/brick.png" />
                <Pattern id="desert" link="/assets/images/hexes/desert.png" />
                <Pattern id="ocean" link="/assets/images/hexes/ocean.png" />
                <Pattern id="hidden" link="/assets/images/hexes/hidden.png" />
              </Layout>
            </HexGrid>
          </div>
          <div className="tokens" style={{ zIndex: 1, position: "absolute" }}>
            <HexGrid width={1200} height={1200} viewBox="-80 -80 160 160"
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
                    fill={
                      (hex.number && !hex.hidden ? (twoTwelve && (hex.number === 2 || hex.number === 12)) ? "2-12" : `${hex.number}` : "blank")}
                    onClick={hex.hidden ? () => handleReveal(index) : () => handleHexClick(index)}
                    onContextMenu={(e) => {
                      e.preventDefault()
                      let layout = [...boardLayout];
                      layout[index].hidden = true;
                      setBoardLayout(layout);
                    }}
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
        </div>
        <div className="bridges" style={{ position: "absolute" }}>
          <HexGrid width={1200} height={1200} viewBox="-80 -80 160 160"
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
          <HexGrid width={1200} height={1200} viewBox="-80 -80 160 160"
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
          {showAcceptButtons && isInvalidHexSelected ? (
            <Button variant="contained" onClick={handleSwapResourcesAndNumbers} style={{ backgroundColor: '#196a7e', color: 'white' }}>
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
              <Button variant="contained" onClick={handleSwapResourcesAndNumbers} style={{ backgroundColor: '#196a7e', color: 'white' }}>
                swap both
              </Button>
            </>
          )}
        </div>
      )}
      {errorMessage && (
        <Alert variant="filled" severity="error" style={{ position: "absolute", top: "20px", left: 0, right: 0, width: "max-content", marginLeft: "auto", marginRight: "auto" }}>
          {errorMessage}
        </Alert>
      )}
    </>
  );
};

export default BlackForest;
