import React from 'react';
import { countFilledCells, countIslands, toggle, resize } from './lib/Grid';
import { initialWidth, initialHeight } from './constants';
import './App.css';
import Grid from './components/Grid';
import Resize from './components/Resize';

function App() {
  const [grid, setGrid] = React.useState(
    new Array(initialHeight).fill(0).map(() => new Array(initialWidth).fill(0)),
  );
  const [resizeModalVisible, setResizeModalVisible] = React.useState(false);

  function onClickItem(pos) {
    setGrid(toggle(grid, pos));
  }

  function resizeGrid(w, h) {
    setGrid(resize(grid, w, h));
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Tiny World</p>
      </header>
      <section className="App-body">
        <Grid grid={grid} onClickItem={onClickItem} />
        <aside className="App-panel">
          <div className="App-panel-size">
            <section>
              <strong id="section-width-header">Width: </strong>
              <span aria-labelledby="section-width-header">
                {grid[0].length}
              </span>
            </section>
            <section>
              <strong id="section-height-header">Height: </strong>
              <span aria-labelledby="section-height-header">{grid.length}</span>
            </section>
            <button
              className="App-button"
              onClick={() => setResizeModalVisible(true)}
            >
              Resize
            </button>
          </div>
          <div className="App-panel-data">
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
          <Resize
            onResize={resizeGrid}
            hide={() => setResizeModalVisible(false)}
            isVisible={resizeModalVisible}
            initialWidth={grid[0].length}
            initialHeight={grid.length}
          />
        </aside>
      </section>
    </div>
  );
}

export default App;
