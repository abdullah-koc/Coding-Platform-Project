import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import Colors from "../../utils/Colors";
import { Grid } from "@mui/material";
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
    cursor: "pointer",
  },
});

const ContestQuestionCard = ({
  isCoding,
  question,
  difficulty,
  likeRate,
  questionPoint,
}) => {
  const classes = useStyles();
  const [isSubmitted, setIsSubmitted] = useState(true);

  const getID = () => {
    let url = window.location.href;
    let id = url.split("/")[url.split("/").length - 1];
    return id;
  };

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_URL +
          `api/interview/get_questions/${10}/${getID()}`
      )
      .then((res) => {
        var data = res.data.filter((item) => item.title === question);
        var ID = data[0].question_id;
        axios
          .get(
            process.env.REACT_APP_URL +
              `api/question/get_if_user_solved/${ID}/${
                JSON.parse(localStorage.getItem("session")).person_id
              }`
          )
          .then((res) => {
            setIsSubmitted(res.data);
          });
      });
  }, []);

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
          Submitted: {isSubmitted ? "✅" : "❌"}
        </Grid>
      </Grid>
    </div>
  );
};

export default ContestQuestionCard;
