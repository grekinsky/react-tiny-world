import React from 'react';
import './Grid.css';
import Cell from './Cell';

function Grid({ onClickItem, grid }) {
  return (
    <div className="grid" role="grid">
      {grid.map((row, x) => (
        <div key={`r${x}`} className="grid-row" role="row">
          {row.map((filled, y) => (
            <Cell
              key={`${x},${y}`}
              filled={filled}
              onClick={() => onClickItem({ x, y })}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Grid;
