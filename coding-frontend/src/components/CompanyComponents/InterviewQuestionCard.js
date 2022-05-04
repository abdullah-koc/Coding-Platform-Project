import React from "react";
import { makeStyles } from "@mui/styles";
import Colors from "../../utils/Colors";
import { Grid } from "@mui/material";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useNavigate } from "react-router-dom";

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
  question_id,
  isCoding,
  title,
  difficulty,
  questionPoint,
}) => {
  let navigate = useNavigate();
  const classes = useStyles();
  const handleGoToQuestion = (id) => {
    if (id.startsWith("CQ")) {
      navigate("/cquestion/" + id);
    } else {
      navigate("/ncquestion/" + id);
    }
  };
  const handleRemoveQuestion = () => {
    alert("remove question");
    // todo: remove question from database
  }
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid
          item
          xs={2}
          style={{ display: "flex", alignItems: "center", paddingLeft: "20px" }}
          onClick={() => handleGoToQuestion(question_id)}
        >
          {isCoding ? "C" : "N"}
        </Grid>
        <Grid item xs={3} style={{ display: "flex", alignItems: "center" }} onClick={() => handleGoToQuestion(question_id)}>
          Title: {title}
        </Grid>
        <Grid item xs={3} style={{ display: "flex", alignItems: "center" }} onClick={() => handleGoToQuestion(question_id)}>
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
        <Grid item xs={3} style={{ display: "flex", alignItems: "center" }} onClick={() => handleGoToQuestion(question_id)}>
          Question Point: {questionPoint}
        </Grid>
        <Grid item xs={1} style={{ display: "flex", alignItems: "center" }}>
          <RemoveCircleIcon fontSize="large" style={{color: "#F44336"}} onClick={() => handleRemoveQuestion()}></RemoveCircleIcon>
        </Grid>
      </Grid>
    </div>
  );
};

export default InterviewQuestionCard;
