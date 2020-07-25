import React from 'react';
import { countFilledCells, countIslands, toggle } from '../lib/Grid';
import './Grid.css';
import Cell from './Cell';

function Grid({ width, height }) {
  const [grid, setGrid] = React.useState(
    new Array(height).fill(0).map(() => new Array(width).fill(0)),
  );

  function clickItem(pos) {
    setGrid(toggle(grid, pos));
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
              onClick={() => clickItem({ x, y })}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Grid;
