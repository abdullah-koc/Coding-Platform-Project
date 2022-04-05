import React from "react";
import { makeStyles } from "@mui/styles";
import Colors from "../../utils/Colors";
import { Grid } from "@mui/material";

const useStyles = makeStyles({
  root: {
    height: "60px",
    width: "100vw",
    background: Colors.dark_color,
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    color: "white",
    cursor: "pointer",
  },
});

const QuestionCard = () => {
  const classes = useStyles();
  const handleJoinContest = () => {};
  const [isCoding, setIsCoding] = React.useState(1);
  const [question, setQuestion] = React.useState(
    "1. What is the best way to learn React?"
  );
  const [difficulty, setDifficulty] = React.useState("Easy");
  const [likeRate, setLikeRate] = React.useState(80);
  const [isSolved, setIsSolved] = React.useState(0);
  const [solveFrequency, setSolveFrequency] = React.useState(42);
  return (
    <div className={classes.root} onClick={() => console.log("sdfsdf")}>
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
          {solveFrequency}%
        </Grid>
      </Grid>
    </div>
  );
};

export default QuestionCard;
