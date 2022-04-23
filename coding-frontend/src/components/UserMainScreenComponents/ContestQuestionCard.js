import React from "react";
import { makeStyles } from "@mui/styles";
import Colors from "../../utils/Colors";
import { Grid } from "@mui/material";

const useStyles = makeStyles({
  root: {
    height: "60px",
    width: "100%",
    background: Colors.dark_color,
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    color: "white",
    cursor: "pointer",
  },
});

const ContestQuestionCard = ({
  isCoding,
  question,
  difficulty,
  likeRate,
  isSolved,
  questionPoint,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid
          item
          xs={2}
          style={{ display: "flex", alignItems: "center", paddingLeft: "20px" }}
        >
          {isCoding ? "C" : "N"}
        </Grid>
        <Grid item xs={7} style={{ display: "flex", alignItems: "center" }}>
          Title: {question}
        </Grid>
        <Grid item xs={3} style={{ display: "flex", alignItems: "center" }}>
          Submitted: {isSolved ? "✅" : "❌"}
        </Grid>
      </Grid>
    </div>
  );
};

export default ContestQuestionCard;
