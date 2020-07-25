import React from 'react';
import { countFilledCells, countIslands } from '../lib/Grid';
import './Grid.css';
import Cell from './Cell';

function Grid({ width, height }) {
  const [grid, setGrid] = React.useState(
    new Array(height).fill(new Array(width).fill(0)),
  );

  function toggleGridItem(_x, _y) {
    const g = grid.map((row, x) => {
      if (_x !== x) {
        return row;
      }
      return row.map((cell, y) => {
        if (_x === x && _y === y) {
          return cell === 0 ? 1 : 0;
        }
        return cell;
      });
    });
    setGrid(g);
  }

  return (
    <div className="grid">
      <div>
        Width: {width}
        &nbsp; Height: {height}
        &nbsp; Filled: {countFilledCells(grid)}
        &nbsp; Islands: {countIslands(grid)}
      </div>
      {grid.map((row, x) => (
        <div key={`r${x}`} className="grid-row">
          {row.map((filled, y) => (
            <Cell
              key={`${x},${y}`}
              filled={filled}
              onClick={() => toggleGridItem(x, y)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Grid;
