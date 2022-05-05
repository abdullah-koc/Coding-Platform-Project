import React from "react";
import { makeStyles } from "@mui/styles";
import Colors from "../../utils/Colors";
import { Grid } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useNavigate } from "react-router-dom";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    height: "60px",
    width: "100%",
    background: Colors.dark_color,
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    color: "white",
  },
});

const CustomWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500,
  },
});

const InterviewQuestionCard = ({
  questionText,
  question_id,
  isCoding,
  title,
  difficulty,
  questionPoint,
}) => {
  let navigate = useNavigate();
  const classes = useStyles();
  const handleRemoveQuestion = () => {
    axios
      .post(process.env.REACT_APP_URL + "api/question/delete/" + question_id)
      .then((result) => {
        alert("Question deleted successfully");
        window.location.reload();
      })
      .catch((err) => {
        alert("An error occurred.");
      });
  };
  return (
    <CustomWidthTooltip title={questionText}>
      <div className={classes.root}>
        <Grid container>
          <Grid
            item
            xs={2}
            style={{
              display: "flex",
              alignItems: "center",
              paddingLeft: "20px",
            }}
          >
            {isCoding ? "C" : "N"}
          </Grid>
          <Grid item xs={3} style={{ display: "flex", alignItems: "center" }}>
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
          <Grid
            item
            xs={1}
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <RemoveCircleIcon
              fontSize="large"
              style={{ color: "#F44336" }}
              onClick={() => handleRemoveQuestion()}
            ></RemoveCircleIcon>
          </Grid>
        </Grid>
      </div>
    </CustomWidthTooltip>
  );
};

export default InterviewQuestionCard;
