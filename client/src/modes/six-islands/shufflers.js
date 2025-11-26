export function calculatePips(number, twoTwelve) {
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

export function isValidPipDistribution(boardLayout, twoTwelve) {
    const pipCounts = { forest: 0, brick: 0, sheep: 0, wheat: 0, ore: 0 };

    for (const hex of boardLayout) {
        if (hex.fill !== "desert") {
            pipCounts[hex.fill] += calculatePips(hex.number, twoTwelve);
        }
    }

    return (
        pipCounts.forest >= 8 &&
        pipCounts.forest <= 30 &&
        pipCounts.brick >= 5 &&
        pipCounts.brick <= 30 &&
        pipCounts.sheep >= 8 &&
        pipCounts.sheep <= 30 &&
        pipCounts.wheat >= 8 &&
        pipCounts.wheat <= 30 &&
        pipCounts.ore >= 5 &&
        pipCounts.ore <= 30
    );
}

export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function isNeighborWithSixOrEight(boardLayout, hexId) {
    const neighbors = boardLayout.find((hex) => hex.id === hexId).neighbors;
    return neighbors.some((neighborId) => {
        const neighbor = boardLayout[neighborId];
        return neighbor.number === 6 || neighbor.number === 8;
    });
}

// export function placeSixesAndEights(boardLayout) {
//     let sixesAndEights = [6, 6, 6, 6, 8, 8, 8];
//     shuffleArray(sixesAndEights);

//     let resourceSixOrEight = {
//         forest: false,
//         brick: false,
//         sheep: false,
//         wheat: false,
//         ore: false,
//     };

//     // Create an array of indices for hexagons that are not desert
//     let nonDesertIndices = boardLayout
//         .map((hex, index) =>
//             hex.fill !== "desert" && hex.fill !== "ocean" ? index : -1
//         )
//         .filter((index) => index !== -1);

//     for (let number of sixesAndEights) {
//         shuffleArray(nonDesertIndices);
//         let placed = false;

//         for (let index of nonDesertIndices) {
//             let hex = boardLayout[index];
//             if (
//                 hex.number === null &&
//                 !isNeighborWithSixOrEight(boardLayout, hex.id) &&
//                 !resourceSixOrEight[hex.fill]
//             ) {
//                 hex.number = number;
//                 placed = true;
//                 resourceSixOrEight[hex.fill] = true; // Mark this resource as having a 6 or 8
//                 break;
//             }
//         }

//         if (!placed) {
//             boardLayout.forEach((hex) => {
//                 if (hex.fill !== "desert") hex.number = null;
//             });
//             placeSixesAndEights(boardLayout); // Retry recursively
//             return;
//         }
//     }
// }

export function placeSixesAndEights(boardLayout) {
    // Hard-coded mapping of indices → numbers
    const placements = {
        7: 8,
        13: 6,
        36: 6,
        42: 8,
        46: 6,
        50: 6,
        52: 8,
    };

    for (const index in placements) {
        const num = placements[index];
        if (boardLayout[index]) {
            boardLayout[index].number = num;
        }
    }
}


export function shuffleFills(boardLayout) {
    let validFills = false;
    let attempts = 0;

    while (!validFills && attempts < 1000) {
        // Shuffle 'fill' attributes including the desert
        const fills = boardLayout.map((hex) => hex.fill);
        for (let i = fills.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            if (fills[i] === "ocean" || fills[j] === "ocean") {
                continue;
            }
            [fills[i], fills[j]] = [fills[j], fills[i]];
        }
        for (let i = 0; i < boardLayout.length; i++) {
            boardLayout[i].fill = fills[i];
        }

        // Check if the new fills are valid
        validFills = checkFillValidity(boardLayout);

        attempts++;
    }

    if (attempts >= 1000) {
        console.log(
            "Failed to find a valid fill distribution after 1000 attempts"
        );
    }
}

export function checkFillValidity(boardLayout) {
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

export function isNeighborWithSameNumber(boardLayout, hexId, number) {
    const neighbors = boardLayout.find((hex) => hex.id === hexId).neighbors;
    return neighbors.some((neighborId) => {
        const neighbor = boardLayout[neighborId];
        return neighbor.number === number;
    });
}

export function fillInOtherNumbers(boardLayout) {
    // All remaining tokens (no 6s or 8s)
    let otherNumbers = [
        2, 2,
        3, 3, 3,
        4, 4, 4, 4,
        5, 5, 5, 5,
        9, 9, 9, 9,
        10, 10, 10, 10,
        11, 11,
        12, 12,
    ];

    shuffleArray(otherNumbers);

    let index = 0;

    for (const hex of boardLayout) {
        if (hex.fill === "desert" || hex.fill === "ocean") continue;
        if (hex.number != null) continue; // skip the 6s and 8s you already placed

        // Just place the next number blindly
        hex.number = otherNumbers[index];
        index++;
    }

    return true;  // placement always succeeds
}


export function shuffleNumbers(boardLayout, twoTwelve) {
    let attempts = 0;
    let success = false;

    do {
        attempts++;
        // Reset numbers
        boardLayout.forEach(
            (hex) => (hex.number = hex.fill === "desert" ? null : undefined)
        );

        placeSixesAndEights(boardLayout);
        success = fillInOtherNumbers(boardLayout);

        // Check if valid pip distribution is achieved
        if (success) {
            success = isValidPipDistribution(boardLayout, twoTwelve);
        }
    } while (!success && attempts < 500);

    if (attempts >= 500 || !success) {
        console.log(
            `Failed to find a valid distribution after ${attempts} attempts`
        );
    }
}

export function shufflePorts(ports) {
    // Shuffle 'fill' attributes including the desert
    const fills = ports.map((port) => port.fill);
    shuffleArray(fills);
    for (let i = 0; i < ports.length; i++) {
        ports[i].fill = fills[i];
    }
}

export function shuffleBoard(boardLayout, ports, twoTwelve) {
    shuffleFills(boardLayout);
    shuffleNumbers(boardLayout, twoTwelve);
    shufflePorts(ports);
    // Update the state to trigger re-render
    return [...boardLayout];
}