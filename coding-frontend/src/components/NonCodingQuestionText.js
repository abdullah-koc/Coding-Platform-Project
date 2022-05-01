import React, { useState } from "react";
import { TextField, Grid, MenuItem, Select, Button } from "@mui/material";
import Colors from "../utils/Colors";
import axios from "axios";

const NonCodingQuestionText = ({ parentSubmitCallback }) => {
  const [question, setQuestion] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);

  //get the id from the link
  const getID = () => {
    let url = window.location.href;
    let id = url.split("/")[url.split("/").length - 1];
    return id;
  };

  React.useEffect(() => {
    axios
      .get(process.env.REACT_APP_URL + "api/question/" + getID())
      .then((res) => {
        setQuestion(res.data);
        setQuestionText(res.data.question_text);
      });
  }, []);

  React.useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_URL +
          `api/attempt/${
            JSON.parse(localStorage.getItem("session")).person_id
          }/${getID()}`
      )
      .then((res) => {
        if (res.data.length > 0) {
          setIsSubmitButtonDisabled(true);
          parentSubmitCallback(true);
        }
      });
  }, [question]);

  const handleSubmitButtonPress = () => {
    axios
      .post(process.env.REACT_APP_URL + "api/attempt/make/attempt", {
        user_id: JSON.parse(localStorage.getItem("session")).person_id,
        question_id: question.question_id,
        user_answer: questionText,
      })
      .then((res) => {
        setIsSubmitButtonDisabled(true);
        parentSubmitCallback(true);
      })
      .catch((err) => {
        alert("Answer cannot be empty.");
      });
  };

  return (
    <div style={{ width: "55vw", margin: "20px" }}>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            id="outlined-multiline-static"
            label=""
            color="success"
            multiline
            rows={"20"}
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            variant="outlined"
            fullWidth
            style={{ height: "100%" }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <Button
            disabled={isSubmitButtonDisabled}
            variant="contained"
            style={{
              backgroundColor: isSubmitButtonDisabled
                ? Colors.light_grey_color
                : Colors.dark_color,
            }}
            onClick={handleSubmitButtonPress}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default NonCodingQuestionText;
