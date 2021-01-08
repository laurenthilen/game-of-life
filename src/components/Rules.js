import React from "react";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "center",
    borderRadius: "6px",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: "4% 6%",
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      margin: "8% 2%",
    }
  },
}));

const Rules = props => {
  const classes = useStyles();

  const handleClose = () => {
    props.setOpen(!props.open);
  };

  return (
      <Modal
          open={props.open}
          onClose={handleClose}
      >
        <div className={classes.paper}>
          <div className="rules">
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
                  <li>Any dead cell with exactly three live neighbors becomes a live cell</li>
                </ul>
              </ul>
            </div>
          </div>
        </div>
      </Modal>
  );
};
export default Rules;