export const Hexes = [
    {
      q: 0,
      r: -2,
      s: 2,
      fill: "wheat",
      number: 2,
      id: 0,
      neighbors: [1, 4, 5]
    },
    {
      q: 1,
      r: -2,
      s: 1,
      fill: "wheat",
      number: 2,
      id: 1,
      neighbors: [0, 2, 5, 6]
    },
    {
      q: 2,
      r: -2,
      s: 0,
      fill: "wheat",
      number: 3,
      id: 2,
      neighbors: [1, 3, 6, 7]
    },
    {
      q: 3,
      r: -2,
      s: -1,
      fill: "wheat",
      number: 3,
      id: 3,
      neighbors: [2, 7, 8]
    },
    {
      q: -1,
      r: -1,
      s: 2,
      fill: "wheat",
      number: 3,
      id: 4,
      neighbors: [0, 5, 9, 10]
    },
    {
      q: 0,
      r: -1,
      s: 2,
      fill: "wheat",
      number: 4,
      id: 5,
      neighbors: [0, 1, 4, 6, 10, 11]
    },
    {
      q: 1,
      r: -1,
      s: 2,
      fill: "sheep",
      number: 4,
      id: 6,
      neighbors: [1, 2, 5, 7, 11, 12]
    },
    {
      q: 2,
      r: -1,
      s: 2,
      fill: "sheep",
      number: 4,
      id: 7,
      neighbors: [6, 2, 3, 6, 8, 12, 13]
    },
    {
      q: 3,
      r: -1,
      s: 2,
      fill: "sheep",
      number: 5,
      id: 8,
      neighbors: [3, 7, 13, 14]
    },
    {
      q: -2,
      r: 0,
      s: 2,
      fill: "sheep",
      number: 5,
      id: 9,
      neighbors: [4, 10, 15, 16]
    },
    {
      q: -1,
      r: 0,
      s: 2,
      fill: "sheep",
      number: 5,
      id: 10,
      neighbors: [4, 5, 9, 11, 16, 17]
    },
    {
      q: 0,
      r: 0,
      s: 2,
      fill: "sheep",
      number: 6,
      id: 11,
      neighbors: [5, 6, 10, 12, 17, 18]
    },
    {
      q: 1,
      r: 0,
      s: 2,
      fill: "forest",
      number: 6,
      id: 12,
      neighbors: [6, 7, 11, 13, 18, 19]
    },
    {
      q: 2,
      r: 0,
      s: 2,
      fill: "forest",
      number: 6,
      id: 13,
      neighbors: [7, 8, 12, 14, 19, 20]
    },
    {
      q: 3,
      r: 0,
      s: 2,
      fill: "forest",
      number: 8,
      id: 14,
      neighbors: [8, 13, 20]
    },
    {
      q: -3,
      r: 1,
      s: 2,
      fill: "forest",
      number: 8,
      id: 15,
      neighbors: [9, 16, 21]
    },
    {
      q: -2,
      r: 1,
      s: 2,
      fill: "forest",
      number: 8,
      id: 16,
      neighbors: [9, 10, 12, 15, 21, 22]
    },
    {
      q: -1,
      r: 1,
      s: 2,
      fill: "forest",
      number: 9,
      id: 17,
      neighbors: [10, 11, 16, 18, 22, 23]
    },
    {
      q: 0,
      r: 1,
      s: 2,
      fill: "brick",
      number: 9,
      id: 18,
      neighbors: [11, 12, 17, 19, 23, 24]
    },
    {
      q: 1,
      r: 1,
      s: 2,
      fill: "brick",
      number: 9,
      id: 19,
      neighbors: [12, 13, 18, 20, 24, 25]
    },
    {
      q: 2,
      r: 1,
      s: 2,
      fill: "brick",
      number: 10,
      id: 20,
      neighbors: [13, 14, 19, 25]
    },
    {
      q: -3,
      r: 2,
      s: 2,
      fill: "brick",
      number: 10,
      id: 21,
      neighbors: [15, 16, 22, 26]
    },
    {
      q: -2,
      r: 2,
      s: 2,
      fill: "brick",
      number: 10,
      id: 22,
      neighbors: [16, 17, 21, 23, 26, 27]
    },
    {
      q: -1,
      r: 2,
      s: 2,
      fill: "ore",
      number: 11,
      id: 23,
      neighbors: [18, 22, 24, 24, 27, 28]
    },
    {
      q: 0,
      r: 2,
      s: 2,
      fill: "ore",
      number: 11,
      id: 24,
      neighbors: [18, 19, 23, 25, 28, 29]
    },
    {
      q: 1,
      r: 2,
      s: 2,
      fill: "ore",
      number: 11,
      id: 25,
      neighbors: [19, 20, 24, 29]
    },
    {
      q: -3,
      r: 3,
      s: 2,
      fill: "ore",
      number: 12,
      id: 26,
      neighbors: [21, 22, 27]
    },
    {
      q: -2,
      r: 3,
      s: 2,
      fill: "ore",
      number: 12,
      id: 27,
      neighbors: [22, 23, 26, 28]
    },
    {
      q: -1,
      r: 3,
      s: 2,
      fill: "desert",
      number: null,
      id: 28,
      neighbors: [23, 24, 27, 29]
    },
    {
      q: 0,
      r: 3,
      s: 2,
      fill: "desert",
      number: null,
      id: 29,
      neighbors: [24, 25, 28]
    },
  ];
  
  export const Bridges = [
    {
      q: 0,
      r: -3.5,
      s: 0,
      fill: "bridges-left",
      id: 0,
    },
    {
      q: -3,
      r: -0.5,
      s: 3,
      fill: "bridges-bottom-left",
      id: 0,
    },
    {
      q: -4,
      r: 1.5,
      s: 1,
      fill: "bridges-bottom-left",
      id: 0,
    },
    {
      q: -4,
      r: 3.5,
      s: 1,
      fill: "bridges-bottom-right",
      id: 0,
    },
    {
      q: -1,
      r: 3.5,
      s: 1,
      fill: "bridges-right",
      id: 0,
    },
    {
      q: 1,
      r: 2.5,
      s: 3,
      fill: "bridges-right",
      id: 0,
    },
    {
      q: 4,
      r: -0.5,
      s: 3,
      fill: "bridges-top-right",
      id: 0,
    },
    {
      q: 4,
      r: -2.5,
      s: 3,
      fill: "bridges-top-left",
      id: 0,
    },
    {
      q: 2,
      r: -3.5,
      s: 3,
      fill: "bridges-top-left",
      id: 0,
    },
    {
      q: 2,
      r: 1.5,
      s: 0,
      fill: "bridges-right",
      id: 0,
    },
    {
      q: 3,
      r: -3.5,
      s: 0,
      fill: "bridges-left",
      id: 0,
    }
  ];
  
  export const Ports = [
    {
      q: 0,
      r: -3.5,
      s: 0,
      fill: "any",
      id: 0,
    },
    {
      q: -3,
      r: -0.5,
      s: 3,
      fill: "any",
      id: 0,
    },
    {
      q: -4,
      r: 1.5,
      s: 1,
      fill: "any",
      id: 0,
    },
    {
      q: -4,
      r: 3.5,
      s: 1,
      fill: "any",
      id: 0,
    },
    {
      q: -1,
      r: 3.5,
      s: 1,
      fill: "any",
      id: 0,
    },
    {
      q: 1,
      r: 2.5,
      s: 3,
      fill: "wood-port",
      id: 0,
    },
    {
      q: 4,
      r: -0.5,
      s: 3,
      fill: "brick-port",
      id: 0,
    },
    {
      q: 4,
      r: -2.5,
      s: 3,
      fill: "sheep-port",
      id: 0,
    },
    {
      q: 2,
      r: -3.5,
      s: 3,
      fill: "sheep-port",
      id: 0,
    },
    {
      q: 2,
      r: 1.5,
      s: 0,
      fill: "wheat-port",
      id: 0,
    },
    {
      q: 3,
      r: -3.5,
      s: 0,
      fill: "ore-port",
      id: 0,
    },
  ];