import React, { useState, useEffect } from "react";
import { HexGrid, Layout, Pattern, Hexagon } from "react-hexgrid";
import { Hexes, Bridges, Ports } from "./constants";
import { Alert } from "@mui/material";
import { shuffleBoard } from "./shufflers"

const FourIslands = (props) => {
  const [boardLayout, setBoardLayout] = useState(Hexes);
  const [bridges] = useState(Bridges);
  const [ports] = useState(Ports);
  const [selectedHexes, setSelectedHexes] = useState([]);
  const [showAcceptButtons, setShowAcceptButtons] = useState(false);
  const [isInvalidHexSelected, setIsInvalidHexSelected] = useState(false);
  const { twoTwelve } = props;
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setBoardLayout(() => shuffleBoard(Hexes, Ports, twoTwelve));
  }, [twoTwelve]);


  useEffect(() => {
    function handleKeyDown(e) {
      if (e.keyCode === 51) {
        setBoardLayout(prev =>
          shuffleBoard(prev, Ports, twoTwelve)
        );
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [twoTwelve]);


  const handleHexClick = (index) => {
    const alreadySelected = selectedHexes.includes(index);
    let newSelectedHexes = selectedHexes;

    if (alreadySelected) {
      newSelectedHexes = selectedHexes.filter((hexIndex) => hexIndex !== index);
    } else if (selectedHexes.length < 2) {
      newSelectedHexes = [...selectedHexes, index];
    } else {
      newSelectedHexes = [...selectedHexes.slice(1), index];
    }

    setSelectedHexes(newSelectedHexes);
    setIsInvalidHexSelected(
      newSelectedHexes.some(
        (hexIndex) =>
          boardLayout[hexIndex].fill === "desert" ||
          boardLayout[hexIndex].fill === "ocean"
      )
    );
    setShowAcceptButtons(newSelectedHexes.length === 2);
  };

  const handleSwapResources = () => {
    if (selectedHexes.length === 2) {
      const newBoardLayout = [...boardLayout];
      if (
        (newBoardLayout[selectedHexes[0]].fill === "desert" ||
          newBoardLayout[selectedHexes[0]].fill === "ocean") &&
        (newBoardLayout[selectedHexes[1]].fill === "desert" ||
          newBoardLayout[selectedHexes[1]].fill === "ocean")
      ) {
        const fillTemp = newBoardLayout[selectedHexes[0]].fill;
        newBoardLayout[selectedHexes[0]].fill =
          newBoardLayout[selectedHexes[1]].fill;
        newBoardLayout[selectedHexes[1]].fill = fillTemp;

        setBoardLayout(newBoardLayout);
      } else if (
        newBoardLayout[selectedHexes[0]].fill === "desert" ||
        newBoardLayout[selectedHexes[1]].fill === "desert"
      ) {
        setErrorMessage("Invalid Swap. Desert cannot have a number token.");

        // Clear the error message after 3 seconds
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      } else if (
        newBoardLayout[selectedHexes[0]].fill === "ocean" ||
        newBoardLayout[selectedHexes[1]].fill === "ocean"
      ) {
        setErrorMessage("Invalid Swap. Ocean cannot have a number token.");

        // Clear the error message after 3 seconds
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      } else {
        const fillTemp = newBoardLayout[selectedHexes[0]].fill;
        newBoardLayout[selectedHexes[0]].fill =
          newBoardLayout[selectedHexes[1]].fill;
        newBoardLayout[selectedHexes[1]].fill = fillTemp;

        setBoardLayout(newBoardLayout);
      }
      setSelectedHexes([]);
      setShowAcceptButtons(false);
    }
  };

  const handleSwapNumbers = () => {
    if (selectedHexes.length === 2) {
      const newBoardLayout = [...boardLayout];
      if (
        (newBoardLayout[selectedHexes[0]].fill === "desert" ||
          newBoardLayout[selectedHexes[0]].fill === "ocean") &&
        (newBoardLayout[selectedHexes[1]].fill === "desert" ||
          newBoardLayout[selectedHexes[1]].fill === "ocean")
      ) {
        setErrorMessage("No number tokens to swap.");

        // Clear the error message after 3 seconds
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      } else if (
        newBoardLayout[selectedHexes[0]].fill === "desert" ||
        newBoardLayout[selectedHexes[1]].fill === "desert"
      ) {
        setErrorMessage("Invalid Swap. Desert cannot have a number token.");

        // Clear the error message after 3 seconds
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      } else if (
        newBoardLayout[selectedHexes[0]].fill === "ocean" ||
        newBoardLayout[selectedHexes[1]].fill === "ocean"
      ) {
        setErrorMessage("Invalid Swap. Ocean cannot have a number token.");

        // Clear the error message after 3 seconds
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      } else {
        const numberTemp = newBoardLayout[selectedHexes[0]].number;
        newBoardLayout[selectedHexes[0]].number =
          newBoardLayout[selectedHexes[1]].number;
        newBoardLayout[selectedHexes[1]].number = numberTemp;
        setBoardLayout(newBoardLayout);
      }

      setSelectedHexes([]);
      setShowAcceptButtons(false);
    }
  };

  const handleSwapResourcesAndNumbers = () => {
    if (selectedHexes.length === 2) {
      const newBoardLayout = [...boardLayout];
      const numberTemp = newBoardLayout[selectedHexes[0]].number;
      newBoardLayout[selectedHexes[0]].number =
        newBoardLayout[selectedHexes[1]].number;
      newBoardLayout[selectedHexes[1]].number = numberTemp;
      const fillTemp = newBoardLayout[selectedHexes[0]].fill;
      newBoardLayout[selectedHexes[0]].fill =
        newBoardLayout[selectedHexes[1]].fill;
      newBoardLayout[selectedHexes[1]].fill = fillTemp;

      setBoardLayout(newBoardLayout);
      setSelectedHexes([]);
      setShowAcceptButtons(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-[100vh]">
        <div className="flex items-center justify-center">
          <div className="-z-[1] absolute flex flex-wrap justify-center m-5">
            <HexGrid
              width={1600}
              height={1120}
              viewBox="-100 -70 200 140"
              className="rotate-90"
            >
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
                    strokeOpacity={0.7}
                    fill={hex.fill}
                    opacity={hex.fill === "ocean" ? 0.5 : 1}
                  ></Hexagon>
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
          <div className="z-[1] absolute">
            <HexGrid
              width={1600}
              height={1120}
              viewBox="-100 -70 200 140"
              className="rotate-90"
            >
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
                    stroke={selectedHexes.includes(index) ? "red" : null}
                    strokeWidth={selectedHexes.includes(index) ? 0.7 : null}
                    fill={
                      hex.number
                        ? twoTwelve && (hex.number === 2 || hex.number === 12)
                          ? "2-12"
                          : `${hex.number}`
                        : "blank"
                    }
                    onClick={() => handleHexClick(index)}
                  ></Hexagon>
                ))}
                <Pattern id="2" link="/assets/images/tokens/2.png" />
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
        <div className="absolute">
          <HexGrid
            width={1600}
            height={1120}
            viewBox="-100 -70 200 140"
            className="rotate-90"
          >
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
                ></Hexagon>
              ))}
              <Pattern
                id="bridges-top-left"
                link="/assets/images/bridges/bridges-bottom-left.png"
              />
              <Pattern
                id="bridges-top-right"
                link="/assets/images/bridges/bridges-top-left.png"
              />
              <Pattern
                id="bridges-left"
                link="/assets/images/bridges/bridges-bottom.png"
              />
              <Pattern
                id="bridges-right"
                link="/assets/images/bridges/bridges-top.png"
              />
              <Pattern
                id="bridges-bottom-left"
                link="/assets/images/bridges/bridges-bottom-right.png"
              />
              <Pattern
                id="bridges-bottom-right"
                link="/assets/images/bridges/bridges-top-right.png"
              />
            </Layout>
          </HexGrid>
        </div>
        <div className="absolute">
          <HexGrid
            width={1600}
            height={1120}
            viewBox="-100 -70 200 140"
            className="rotate-90"
          >
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
                ></Hexagon>
              ))}
              <Pattern id="any" link="/assets/images/ports/any-port.png" />
              <Pattern id="ore-port" link="/assets/images/ports/ore-port.png" />
              <Pattern
                id="wheat-port"
                link="/assets/images/ports/wheat-port.png"
              />
              <Pattern
                id="sheep-port"
                link="/assets/images/ports/sheep-port.png"
              />
              <Pattern
                id="brick-port"
                link="/assets/images/ports/brick-port.png"
              />
              <Pattern
                id="wood-port"
                link="/assets/images/ports/wood-port.png"
              />
            </Layout>
          </HexGrid>
        </div>
      </div>
      {showAcceptButtons && (
        <div className="flex flex-row w-[600px] justify-center z-[2] absolute bottom-[50px] right-1/2 translate-x-1/2 ">
          {showAcceptButtons && isInvalidHexSelected ? (
            <button
              onClick={handleSwapResourcesAndNumbers}
              className="bg-[#196a7e] text-white rounded px-4 py-2 font-medium"
            >
              SWAP
            </button>
          ) : (
            <>
              <button
                onClick={handleSwapNumbers}
                className="bg-[#196a7e] text-white rounded px-4 py-2 font-medium mr-[10%]"
              >
                SWAP NUMBERS
              </button>
              <button
                onClick={handleSwapResources}
                className="bg-[#196a7e] text-white rounded px-4 py-2 font-medium mr-[10%]"
              >
                SWAP RESOURCES
              </button>
              <button
                onClick={handleSwapResourcesAndNumbers}
                className="bg-[#196a7e] text-white rounded px-4 py-2 font-medium"
              >
                SWAP BOTH
              </button>
            </>
          )}
        </div>
      )}
      {errorMessage && (
        <Alert
          variant="filled"
          severity="error"
          className="absolute z-auto top-[20px] left-0 right-0 w-max ml-auto mr-auto"
        >
          {errorMessage}
        </Alert>
      )}
    </>
  );
};

export default FourIslands;
