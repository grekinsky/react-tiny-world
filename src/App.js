import React from 'react';
import { toggle, resize } from './lib/Grid';
import { initialWidth, initialHeight } from './constants';
import './App.css';
import Grid from './components/Grid';
import Resize from './components/Resize';
import Dashboard from './components/Dashboard';

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
        <Dashboard
          grid={grid}
          showResizeModal={() => setResizeModalVisible(true)}
        />
        <Resize
          onResize={resizeGrid}
          hide={() => setResizeModalVisible(false)}
          isVisible={resizeModalVisible}
          initialWidth={grid[0].length}
          initialHeight={grid.length}
        />
      </section>
    </div>
  );
}

export default App;
