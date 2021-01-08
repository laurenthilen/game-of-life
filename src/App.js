import React from 'react';
import './App.css';
import Grid from "./components/Grid";
import Rules from "./components/Rules";

function App() {
  return (
    <div className="App">
      <h1>Welcome to Conway's Game of Life!</h1>
      <Grid />
    </div>
  );
}

export default App;
