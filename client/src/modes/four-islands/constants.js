export const Hexes = [
    {
      q: 0,
      r: 0,
      s: 0,
      fill: "ocean",
      number: null,
      id: 0,
      neighbors: [1, 2, 3, 4, 5, 6]
    },
    {
      q: 1,
      r: 0,
      s: 0,
      fill: "ocean",
      number: null,
      id: 1,
      neighbors: [0, 2, 6, 7, 8, 9]
    },
    {
      q: 0,
      r: 1,
      s: 0,
      fill: "brick",
      number: 2,
      id: 2,
      neighbors: [0, 1, 3, 9, 10, 11]
    },
    {
      q: -1,
      r: 1,
      s: 0,
      fill: "ocean",
      number: null,
      id: 3,
      neighbors: [0, 2, 4, 11, 12, 13]
    },
    {
      q: -1,
      r: 0,
      s: 0,
      fill: "ocean",
      number: null,
      id: 4,
      neighbors: [0, 3, 5, 13, 14, 15]
    },
    {
      q: 0,
      r: -1,
      s: 0,
      fill: "ocean",
      number: null,
      id: 5,
      neighbors: [0, 4, 6, 15, 16, 17]
    },
    {
      q: 1,
      r: -1,
      s: 0,
      fill: "ocean",
      number: null,
      id: 6,
      neighbors: [0, 1, 5, 7, 17, 18]
    },
    {
      q: 2,
      r: -1,
      s: 0,
      fill: "ocean",
      number: null,
      id: 7,
      neighbors: [1, 6, 8, 18, 19, 20]
    },
    {
      q: 2,
      r: 0,
      s: 0,
      fill: "desert",
      number: null,
      id: 8,
      neighbors: [1, 7, 9, 20, 21, 22]
    },
    {
      q: 1,
      r: 1,
      s: 0,
      fill: "ocean",
      number: null,
      id: 9,
      neighbors: [1, 2, 8, 10, 22, 23]
    },
    {
      q: 0,
      r: 2,
      s: 0,
      fill: "forest",
      number: 5,
      id: 10,
      neighbors: [2, 9, 11, 23, 24, 25]
    },
    {
      q: -1,
      r: 2,
      s: 0,
      fill: "brick",
      number: 8,
      id: 11,
      neighbors: [2, 3, 10, 12, 25, 26]
    },
    {
      q: -2,
      r: 2,
      s: 0,
      fill: "desert",
      number: null,
      id: 12,
      neighbors: [3, 11, 13, 26]
    },
    {
      q: -2,
      r: 1,
      s: 0,
      fill: "ocean",
      number: null,
      id: 13,
      neighbors: [3, 4, 12, 14]
    },
    {
      q: -2,
      r: 0,
      s: 0,
      fill: "ore",
      number: 8,
      id: 14,
      neighbors: [4, 13, 15, 27]
    },
    {
      q: -1,
      r: -1,
      s: 0,
      fill: "wheat",
      number: 10,
      id: 15,
      neighbors: [4, 5, 14, 16, 27, 28]
    },
    {
      q: 0,
      r: -2,
      s: 0,
      fill: "ocean",
      number: null,
      id: 16,
      neighbors: [5, 15, 17, 28, 29, 30]
    },
    {
      q: 1,
      r: -2,
      s: 0,
      fill: "ocean",
      number: null,
      id: 17,
      neighbors: [5, 6, 16, 18, 30, 31]
    },
    {
      q: 2,
      r: -2,
      s: 0,
      fill: "brick",
      number: 11,
      id: 18,
      neighbors: [6, 7, 17, 19, 31, 32]
    },
    {
      q: 3,
      r: -2,
      s: 0,
      fill: "ocean",
      number: null,
      id: 19,
      neighbors: [7, 18, 20, 32, 33, 34]
    },
    {
      q: 3,
      r: -1,
      s: 0,
      fill: "ocean",
      number: null,
      id: 20,
      neighbors: [7, 8, 19, 21, 34, 35]
    },
    {
      q: 3,
      r: 0,
      s: 0,
      fill: "wheat",
      number: 3,
      id: 21,
      neighbors: [8, 20, 22, 35, 36, 37]
    },
    {
      q: 2,
      r: 1,
      s: 0,
      fill: "ocean",
      number: null,
      id: 22,
      neighbors: [8, 9, 21, 23, 37, 38]
    },
    {
      q: 1,
      r: 2,
      s: 0,
      fill: "ocean",
      number: null,
      id: 23,
      neighbors: [9, 10, 22, 24, 38, 39]
    },
    {
      q: 0,
      r: 3,
      s: 0,
      fill: "wheat",
      number: 4,
      id: 24,
      neighbors: [10, 23, 25, 39]
    },
    {
      q: -1,
      r: 3,
      s: 0,
      fill: "sheep",
      number: 11,
      id: 25,
      neighbors: [10, 11, 24, 26]
    },
    {
      q: -2,
      r: 3,
      s: 0,
      fill: "wheat",
      number: 9,
      id: 26,
      neighbors: [11, 12, 25]
    },
    {
      q: -2,
      r: -1,
      s: 0,
      fill: "sheep",
      number: 4,
      id: 27,
      neighbors: [14, 15, 28]
    },
    {
      q: -1,
      r: -2,
      s: 0,
      fill: "forest",
      number: 9,
      id: 28,
      neighbors: [15, 16, 27, 29]
    },
    {
      q: 0,
      r: -3,
      s: 0,
      fill: "ocean",
      number: null,
      id: 29,
      neighbors: [16, 28, 30, 40]
    },
    {
      q: 1,
      r: -3,
      s: 0,
      fill: "ocean",
      number: null,
      id: 30,
      neighbors: [16, 17, 29, 31, 40, 41]
    },
    {
      q: 2,
      r: -3,
      s: 0,
      fill: "sheep",
      number: 12,
      id: 31,
      neighbors: [17, 18, 30, 32, 41, 42]
    },
    {
      q: 3,
      r: -3,
      s: 0,
      fill: "ore",
      number: 10,
      id: 32,
      neighbors: [18, 19, 31, 33, 42, 43]
    },
    {
      q: 4,
      r: -3,
      s: 0,
      fill: "ore",
      number: 4,
      id: 33,
      neighbors: [19, 32, 34, 43]
    },
    {
      q: 4,
      r: -2,
      s: 0,
      fill: "ocean",
      number: null,
      id: 34,
      neighbors: [19, 20, 33, 35]
    },
    {
      q: 4,
      r: -1,
      s: 0,
      fill: "ore",
      number: 5,
      id: 35,
      neighbors: [20, 21, 34, 36]
    },
    {
      q: 4,
      r: 0,
      s: 0,
      fill: "sheep",
      number: 6,
      id: 36,
      neighbors: [21, 35, 37]
    },
    {
      q: 3,
      r: 1,
      s: 0,
      fill: "brick",
      number: 10,
      id: 37,
      neighbors: [21, 22, 36, 38]
    },
    {
      q: 2,
      r: 2,
      s: 0,
      fill: "ocean",
      number: null,
      id: 38,
      neighbors: [22, 23, 37, 39]
    },
    {
      q: 1,
      r: 3,
      s: 0,
      fill: "ocean",
      number: null,
      id: 39,
      neighbors: [23, 24, 38]
    },
    {
      q: 1,
      r: -4,
      s: 0,
      fill: "ocean",
      number: null,
      id: 40,
      neighbors: [29, 30, 41]
    },
    {
      q: 2,
      r: -4,
      s: 0,
      fill: "forest",
      number: 12,
      id: 41,
      neighbors: [30, 31, 40, 42]
    },
    {
      q: 3,
      r: -4,
      s: 0,
      fill: "forest",
      number: 6,
      id: 42,
      neighbors: [31, 32, 41, 43]
    },
    {
      q: 4,
      r: -4,
      s: 0,
      fill: "sheep",
      number: 3,
      id: 43,
      neighbors: [32, 33, 42]
    },
  ];
  
  export const Bridges = [
    {
      q: -1,
      r: 1,
      s: 0,
      fill: "bridges-bottom-left",
      id: 0,
    },
    {
      q: 1,
      r: -2,
      s: 0,
      fill: "bridges-bottom-right",
      id: 1,
    },
    {
      q: 3,
      r: -1,
      s: 0,
      fill: "bridges-bottom-left",
      id: 2,
    },
    {
      q: -3,
      r: 0,
      s: 0,
      fill: "bridges-bottom-left",
      id: 3,
    },
    {
      q: -3,
      r: 4,
      s: 0,
      fill: "bridges-bottom-right",
      id: 4,
    },
    {
      q: -1,
      r: 4,
      s: 0,
      fill: "bridges-right",
      id: 5,
    },
    {
      q: 3,
      r: -5,
      s: 0,
      fill: "bridges-left",
      id: 6,
    },
    {
      q: 5,
      r: -5,
      s: 0,
      fill: "bridges-top-left",
      id: 7,
    },
    {
      q: 5,
      r: -3,
      s: 0,
      fill: "bridges-top-right",
      id: 8,
    },
    {
      q: 5,
      r: -1,
      s: 0,
      fill: "bridges-top-left",
      id: 8,
    },
  ];
  
  export const Ports = [
    {
      q: -1,
      r: 1,
      s: 0,
      fill: "wood-port",
      id: 0,
    },
    {
      q: 1,
      r: -2,
      s: 0,
      fill: "brick-port",
      id: 1,
    },
    {
      q: 3,
      r: -1,
      s: 0,
      fill: "wheat-port",
      id: 2,
    },
    {
      q: -3,
      r: 0,
      s: 0,
      fill: "sheep-port",
      id: 3,
    },
    {
      q: -3,
      r: 4,
      s: 0,
      fill: "ore-port",
      id: 4,
    },
    {
      q: -1,
      r: 4,
      s: 0,
      fill: "any",
      id: 5,
    },
    {
      q: 3,
      r: -5,
      s: 0,
      fill: "any",
      id: 6,
    },
    {
      q: 5,
      r: -5,
      s: 0,
      fill: "any",
      id: 7,
    },
    {
      q: 5,
      r: -3,
      s: 0,
      fill: "any",
      id: 8,
    },
    {
      q: 5,
      r: -1,
      s: 0,
      fill: "any",
      id: 8,
    },
  ];