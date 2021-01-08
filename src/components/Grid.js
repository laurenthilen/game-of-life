import React, { useState, useCallback, useRef } from "react";
import produce from "immer";

import Rules from "./Rules";
import { emptyGrid, pickColor, randomizeGrid, stripedConfig, heartGrid } from "../presets";

const numRows = 25;
const numColumns = 25;

const Grid = () => {
    const [grid, setGrid] = useState(() => {
        return emptyGrid();
    });

    const [running, setRunning] = useState(false); // toggle start and stop

    const [generation, setGeneration] = useState(0);

    const runningRef = useRef(running); // adding reference to keep fn up to date (we're accessing running state which changes but function does not change)
    runningRef.current = running // current value of ref is whatever the value of running is

    // return a memoized version of the callback that only changes if one of the dependencies has changed
    // won't be recreated every render
    const runSimulation = useCallback(() => {
        // if we're not running, kill the fn
        if (!runningRef.current) {
            return;
        }
        // simulation:
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

    /* Rules */
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        // added fragment bc you can't return more than one child on same level
        <div>  
            <section className="controls-container">
                <div className="main-controls">
                    <button className="control-btn" onClick={handleOpen}>
                        Rules
                    </button>
                    <Rules open={open} setOpen={setOpen} />
             
                    <button 
                        className="control-btn"
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
                        className="control-btn"
                        onClick={() => {
                            setGrid(emptyGrid());
                            setGeneration(0);
                        }}
                        >Clear
                    </button>
                    <h3 className="control">Generations: {generation}</h3>
                </div>
                <div className="configurations">
                    <button 
                        className="control-btn"
                        onClick={() => {
                            setGrid(randomizeGrid());
                            setGeneration(0);
                        }}
                    >
                        Randomize
                    </button>
                    <button
                        className="control-btn"
                        onClick={() => {
                            setGrid(stripedConfig());
                            setGeneration(0);
                        }}
                    >
                        Stripe
                    </button>
                    <button
                        className="control-btn"
                        onClick={() => {
                            setGrid(heartGrid());
                            setGeneration(0);
                        }}
                    >
                        Heart
                    </button>
                </div>
            </section>

            <section className="grid-container">
                <div className="grid">
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
                                    backgroundColor: grid[i][j] ? pickColor() : undefined, // if alive, color is red
                                    border: "solid 1px black"
                                }} 
                                className="grid-size"
                            />
                        )) 
                    )}
                </div>
            </section>
        </div>
    );
}
export default Grid;