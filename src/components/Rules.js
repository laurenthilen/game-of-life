import React from "react";

const Rules = () => {
  return (
    <div>
      <h3>Rules:</h3>
      <ul>
        <li>Each cell in the grid can be in one of two states: live or dead</li>
        <li>Every cell interacts with its eight neighbors, which are the cells that are horizontally, vertically, or diagonally adjacent.</li>
        <li>At each generation, the following transitions occur:</li>
        <ul>
          <li>Any live cell with fewer than two live neighbors dies</li>
          <li>Any live cell with two or three live neighbors lives on to the next generation</li>
          <li>Any live cell with more than three live neighbors dies</li>
          <li>Any dead cell with exactly three live neighbours becomes a live cell</li>
        </ul>
      </ul>
    </div>
  );
};
export default Rules;