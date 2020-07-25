import * as Grid from './Grid';

const data = [
  {
    grid: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    filled: 0,
    islands: 0,
  },
  {
    grid: [
      [0, 0, 0],
      [0, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    filled: 3,
    islands: 1,
  },
  {
    grid: [
      [1, 0, 1],
      [0, 1, 0],
      [0, 1, 1],
      [1, 0, 0],
    ],
    filled: 6,
    islands: 4,
  },
  {
    grid: [
      [1, 1, 1],
      [0, 1, 0],
      [1, 0, 1],
      [1, 1, 1],
    ],
    filled: 9,
    islands: 2,
  },
  {
    grid: [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ],
    filled: 12,
    islands: 1,
  },
];

describe('Grid', function () {
  test('countFilledCells', () => {
    data.forEach((t) => {
      expect(Grid.countFilledCells(t.grid)).toEqual(t.filled);
    });
  });

  test('countIslands', () => {
    data.forEach((t) => {
      expect(Grid.countIslands(t.grid)).toEqual(t.islands);
    });
  });

  test('toggle', () => {
    const grid = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    const toggledGrid = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    expect(Grid.toggle(grid, { x: 1, y: 1 })).toEqual(toggledGrid);
    expect(Grid.toggle(toggledGrid, { x: 1, y: 1 })).toEqual(grid);
  });
});
