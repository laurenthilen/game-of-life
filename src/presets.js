const numRows = 25;
const numColumns = 25;

export const emptyGrid = () => {
    let cellGrid = [];
    for (let y = 0; y < numRows; y++) {
      cellGrid[y] = []; // create an array of all of x axis of the board
      for (let x = 0; x < numColumns; x++) {
        cellGrid[y][x] = 0; // add to the cellGrid array - creating an array of y's in each array
      }
    }
    return cellGrid;
};

export const pickColor = () => {           
    const colors = ['#ff184c', '#ff577d', '#ffccdc','#0a9cf5', '#003062']; 
      
    // selecting random color 
    const randomColor = colors[Math.floor( 
            Math.random() * colors.length)]; 
      
    return randomColor;
}  

export const randomizeGrid = () => {
    let cellGrid = [];
    for (let y = 0; y < numRows; y++) {
      cellGrid[y] = []; // create an array of all of x axis of the board
      for (let x = 0; x < numColumns; x++) {
        cellGrid[y][x] = Math.round(Math.random()); // add to the cellGrid array - creating an array of random y's in each array
      }
    }
    return cellGrid;

}

export const stripedConfig = () => {
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

export const heartGrid = () => {
    let cellGrid = emptyGrid();
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
