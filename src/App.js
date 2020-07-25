import React from 'react';
import './App.css';
import Grid from './components/Grid';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Tiny World</p>
      </header>
      <section className="App-body">
        <Grid width={3} height={3} />
      </section>
    </div>
  );
}

export default App;
