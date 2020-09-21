import React, { useState, useCallback, useRef } from "react";
import produce from 'immer';

const numRows = 25;
const numColumns = 25;

const Grid = () => {
    const [grid, setGrid] = useState(() => {
        const rows = [];
        for (let i=0; i<numRows; i++) {
            // 0 = dead, 1 = alive
            rows.push(Array.from(Array(numColumns), () => 0));
        }
        return rows;
    });

    const [running, setRunning] = useState(false);

    const runningRef = useRef(running); // adding reference to keep fn up to date (we're accessing running state which changes but function does not change)
    runningRef.current = running // current value of ref is whatever the value of running is

    const runSimulation = useCallback(() => {
        // if we're not running, kill the fn
        if (!runningRef.current) {
            return;
        }
        
        setTimeout(runSimulation, 100); // call again in 1/10 sec
    }, []);

    return (
        // added fragment bc you can't return more than one child on same level
        <> 
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

            <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${numColumns}, 25px)`
            }}>
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
                                backgroundColor: grid[i][j] ? '#C70039' : undefined, // if alive, color is pink
                                border: 'solid 1px black'
                            }} 
                        />
                    )) 
                )}
            </div>
        </>
    );
}
export default Grid;