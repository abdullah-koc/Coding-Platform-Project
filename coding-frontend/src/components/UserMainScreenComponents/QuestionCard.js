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

const QuestionCard = ({
  isCoding,
  question,
  difficulty,
  likeRate,
  isSolved,
  questionPoint,
}) => {
  const classes = useStyles();
  const handleJoinContest = () => {};
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid
          item
          xs={1}
          style={{ display: "flex", alignItems: "center", paddingLeft: "10px" }}
        >
          {isCoding ? "C" : "N"}
        </Grid>
        <Grid item xs={5} style={{ display: "flex", alignItems: "center" }}>
          {question}
        </Grid>
        <Grid
          item
          xs={2}
          style={{
            display: "flex",
            alignItems: "center",
            color:
              difficulty === "Easy"
                ? Colors.easy_green_color
                : difficulty === "Medium"
                ? Colors.medium_yellow_color
                : difficulty === "Hard"
                ? Colors.hard_red_color
                : "white",
          }}
        >
          {difficulty}
        </Grid>
        <Grid item xs={1} style={{ display: "flex", alignItems: "center" }}>
          {likeRate}%
        </Grid>
        <Grid item xs={2} style={{ display: "flex", alignItems: "center" }}>
          {isSolved ? "Solved" : "Not Solved"}
        </Grid>
        <Grid item xs={1} style={{ display: "flex", alignItems: "center" }}>
          {questionPoint}
        </Grid>
      </Grid>
    </div>
  );
};

export default QuestionCard;
