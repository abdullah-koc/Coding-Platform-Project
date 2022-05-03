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

const InterviewQuestionCard = ({
  isCoding,
  title,
  difficulty,
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
        <Grid item xs={4} style={{ display: "flex", alignItems: "center" }}>
          Title: {title}
        </Grid>
        <Grid item xs={3} style={{ display: "flex", alignItems: "center" }}>
          Difficulty:&nbsp;
          <div
            style={{
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
          </div>
        </Grid>
        <Grid item xs={3} style={{ display: "flex", alignItems: "center" }}>
          Question Point: {questionPoint}
        </Grid>
      </Grid>
    </div>
  );
};

export default InterviewQuestionCard;
