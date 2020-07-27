import React from 'react';
import { countFilledCells, countIslands } from '../lib/Grid';
import './Dashboard.css';

function Dashboard({ grid, showResizeModal }) {
  return (
    <aside className="Dashboard">
      <div className="Dashboard-size">
        <section>
          <strong id="section-width-header">Width: </strong>
          <span aria-labelledby="section-width-header">{grid[0].length}</span>
        </section>
        <section>
          <strong id="section-height-header">Height: </strong>
          <span aria-labelledby="section-height-header">{grid.length}</span>
        </section>
        <button className="App-button" onClick={showResizeModal}>
          Resize
        </button>
      </div>
      <div className="Dashboard-data">
        <div>
          <strong id="section-filled-header">Filled: </strong>
          <span aria-labelledby="section-filled-header">
            {countFilledCells(grid)}
          </span>
        </div>
        <div>
          <strong id="section-islands-header">Islands: </strong>
          <span aria-labelledby="section-islands-header">
            {countIslands(grid)}
          </span>
        </div>
      </div>
    </aside>
  );
}

export default Dashboard;
