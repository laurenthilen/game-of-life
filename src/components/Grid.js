import React, { useState, useCallback, useRef } from "react";
import produce from 'immer';

const numRows = 25;
const numColumns = 25;

const emptyGrid = () => {
    let cellGrid = [];
    for (let y = 0; y < numRows; y++) {
      cellGrid[y] = []; // create an array of all of x axis of the board
      for (let x = 0; x < numColumns; x++) {
        cellGrid[y][x] = 0; // add to the cellGrid array - creating an array of y's in each array
      }
    }
    return cellGrid;
};

const pickColor = () => {           
    const colors = ['#ff184c', '#ff577d', '#ffccdc','#0a9cf5', '#003062']; 
      
    // selecting random color 
    const randomColor = colors[Math.floor( 
            Math.random() * colors.length)]; 
      
    return randomColor;
}  

const randomizeGrid = () => {
    let cellGrid = [];
    for (let y = 0; y < numRows; y++) {
      cellGrid[y] = []; // create an array of all of x axis of the board
      for (let x = 0; x < numColumns; x++) {
        cellGrid[y][x] = Math.round(Math.random()); // add to the cellGrid array - creating an array of random y's in each array
      }
    }
    return cellGrid;

}

const stripedConfig = () => {
    let cellGrid = [];
    for (let y = 0; y < numRows; y++) {
      cellGrid[y] = []; // create an array of all of x axis of the board
      let check = 0
      for (let x = 0; x < numColumns; x++) {
        cellGrid[y][x] = check; // add to the cellGrid array - every other is alive
        if (check === 0) {
            check = 1;
        } else {
            check = 0;
        }
      }
    }
    return cellGrid;

}

const heartGrid = () => {
    let cellGrid = [];
    for (let x = 0; x < numColumns; x++) {
      cellGrid[x] = []; // create an array of all of x axis of the board
      for (let y = 0; y < numRows; y++) {
        cellGrid[x][y] = 0; // add to the cellGrid array - creating an array of y's in each array
      }
    }
    cellGrid[1][2] = 1;
    cellGrid[1][3] = 1;
    cellGrid[1][7] = 1;
    cellGrid[1][8] = 1;
    cellGrid[2][1] = 1;
    cellGrid[2][4] = 1;
    cellGrid[2][6] = 1;
    cellGrid[2][9] = 1;
    cellGrid[3][1] = 1;
    cellGrid[3][5] = 1;
    cellGrid[3][9] = 1;
    cellGrid[4][1] = 1;
    cellGrid[4][9] = 1;
    cellGrid[5][2] = 1;
    cellGrid[5][8] = 1;
    cellGrid[6][3] = 1;
    cellGrid[6][7] = 1;
    cellGrid[7][4] = 1;
    cellGrid[7][6] = 1;
    cellGrid[8][5] = 1;
    return cellGrid;
};

const Grid = () => {
    const [grid, setGrid] = useState(() => {
        return emptyGrid();
    });

    const [running, setRunning] = useState(false);

    const [generation, setGeneration] = useState(0);

    const runningRef = useRef(running); // adding reference to keep fn up to date (we're accessing running state which changes but function does not change)
    runningRef.current = running // current value of ref is whatever the value of running is

    // return a memoized version of the callback that only changes if one of the dependencies has changed
    const runSimulation = useCallback(() => {
        // if we're not running, kill the fn
        if (!runningRef.current) {
            return;
        }
        // mutate values in grid
        setGrid((currentGridValue) => {
            let valid = false;
            // produce fn generates a new grid and updates the setGrid
            return produce(currentGridValue, gridCopy => {
                for (let i = 0; i < numRows; i++) {
                    for (let j = 0; j < numColumns; j++) {
                        let neighbors = 0;
                        const directions = [
                            [0, 1],
                            [0, -1],
                            [1, 0],
                            [1, 1],
                            [1, -1],
                            [-1, 0],
                            [-1, 1],
                            [-1, -1]
                        ]
                        // compute how many neighbors a given cell has
                        directions.forEach(([x,y]) => {
                            const newI = i + x;
                            const newJ = j + y;
                            // check bounds to make sure we don't go around it
                            // if we have a live cell, it's = 1, so it's going to add 1 to the neighbors
                            if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numColumns) {
                                neighbors += currentGridValue[newI][newJ] 
                            }
                        })
                        // if neighbors is less than or greater than 3, grid position dies
                        if (currentGridValue[i][j] === 1 && (neighbors < 2 || neighbors > 3)) {
                            valid = true;
                            gridCopy[i][j] = 0;
                        // if current grid is dead and has 3 neighbors, it's alive
                        } else if (currentGridValue[i][j] === 0 && neighbors === 3) {
                            valid = true;
                            gridCopy[i][j] = 1;
                        }
                    }
                }
                // add to generation if state changed
                if (valid) {
                    setGeneration(prevState => (prevState += 1));
                    valid = false;
                } 
            });
        });
        setTimeout(runSimulation, 100); // call again in 1/10 sec
    }, []);

    return (
        // added fragment bc you can't return more than one child on same level
        <div style={{display: "flex"}}>  
            <section style={{display: "flex", alignContent: "space-evenly", flexDirection: "column", width: "30%"}}>
                <h3>Generations: {generation}</h3>
                <button 
                    onClick={() => {
                        setRunning(!running); // runSimulation's first if statement could be false if state update doesn't happen in time so set runningRef to true
                        // only run if we're currently in a starting state if we're not running
                        if (!running) {
                            runningRef.current = true;
                            runSimulation();
                        }
                    }}
                >
                    {running ? "Stop" : "Start"} 
                </button>
                <button
                    onClick={() => {
                        setGrid(randomizeGrid());
                        setGeneration(0);
                    }}
                >
                    Randomize
                </button>
                <button
                    onClick={() => {
                        setGrid(stripedConfig());
                        setGeneration(0);
                    }}
                >
                    Striped Configuration
                </button>
                <button
                    onClick={() => {
                        setGrid(heartGrid());
                        setGeneration(0);
                    }}
                >
                    Heart Configuration
                </button>
                <button 
                    onClick={() => {
                        setGrid(emptyGrid());
                        setGeneration(0);
                    }}
                >Clear
                </button>
            </section>

            <section style={{display: "flex", width: "70%", justifyContent: "flex-end", marginLeft: "2%"}}>
                <div style={{display: 'grid', gridTemplateColumns: `repeat(${numColumns}, 25px)`}}>
                    {grid.map((rows, i) => 
                        rows.map((col, j) => (
                            <div 
                                key={`${i}-${j}`}
                                onClick={() => {
                                    const newGrid = produce(grid, gridCopy => {
                                        gridCopy[i][j] = gridCopy[i][j] ? 0 : 1; // toggle - if it's alive, we'll make it dead
                                    });
                                    setGrid(newGrid);
                                }}
                                style={{ 
                                    width: 25, 
                                    height: 25, 
                                    backgroundColor: grid[i][j] ? pickColor() : undefined, // if alive, color is red
                                    border: 'solid 1px black'
                                }} 
                            />
                        )) 
                    )}
                </div>
            </section>
        </div>
    );
}
export default Grid;