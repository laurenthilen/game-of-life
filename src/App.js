import React from 'react';
import './App.css';
import Grid from "./components/Grid";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Welcome to Conway's Game of Life!</h1>
      </header>
      <Grid />
    </div>
  );
}

export default App;
