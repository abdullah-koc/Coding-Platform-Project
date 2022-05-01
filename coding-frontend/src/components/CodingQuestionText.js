import React, { useState } from "react";
import { TextField, Grid, MenuItem, Select, Button } from "@mui/material";
import Colors from "../utils/Colors";
import TestCases from "./TestCases";
import axios from "axios";

const CodingQuestionText = ({ parentSubmitCallback, isContest }) => {
  const [question, setQuestion] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [programmingLanguage, setProgrammingLanguage] = useState("Java 8");
  const [remainingAttempts, setRemainingAttempts] = useState(0);
  const [isTestCasesShown, setIsTestCasesShown] = useState(false);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);
  const [isVideoRequestButtonDisabled, setIsVideoRequestButtonDisabled] =
    useState(false);

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
        setRemainingAttempts(res.data.remaining_attempts);
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
        if (!isContest) {
          setRemainingAttempts(question.max_try - res.data.length);
        } else {
          setRemainingAttempts(100);
        }
      });
  }, [question]);

  React.useEffect(() => {
    if (remainingAttempts <= 0) {
      setIsSubmitButtonDisabled(true);
      parentSubmitCallback(true);
    }
    if (remainingAttempts >= 1) {
      setIsSubmitButtonDisabled(false);
      parentSubmitCallback(false);
    }
  }, [remainingAttempts]);

  const handleSubmitButtonPress = () => {
    axios
      .post(process.env.REACT_APP_URL + "api/attempt/make/attempt", {
        user_id: JSON.parse(localStorage.getItem("session")).person_id,
        question_id: question.question_id,
        user_answer: questionText,
        programming_language: programmingLanguage,
      })
      .then((res) => {
        setIsTestCasesShown(true);
        if (remainingAttempts === 1) {
          if (!isContest) {
            setIsSubmitButtonDisabled(true);
          }
          parentSubmitCallback(true);
        }
        if (!isContest) {
          setRemainingAttempts(remainingAttempts - 1);
        }
      })
      .catch((err) => {
        alert("Answer cannot be empty.");
      });
  };

  const handleVideoRequestButtonPress = () => {
    //check if the user has already requested a video

    //then update the database
    axios
      .post(
        process.env.REACT_APP_URL +
          "api/question/user_request/" +
          question.question_id +
          "/" +
          JSON.parse(localStorage.getItem("session")).person_id
      )
      .then((res) => {
        alert("Video request sent");
        setIsVideoRequestButtonDisabled(true);
      });
  };
  return (
    <div style={{ width: "55vw", margin: "20px" }}>
      <Grid container>
        <Grid item xs={12}>
          <Select
            value={programmingLanguage}
            fullWidth
            style={{ marginBottom: "10px" }}
            label=""
            onChange={(e) => setProgrammingLanguage(e.target.value)}
          >
            <MenuItem value={"Java 8"}>Java 8</MenuItem>
            <MenuItem value={"Java 14"}>Java 14</MenuItem>
            <MenuItem value={"Python 3"}>Python 3</MenuItem>
            <MenuItem value={"JavaScript"}>JavaScript</MenuItem>
            <MenuItem value={"C#"}>C#</MenuItem>
            <MenuItem value={"C"}>C</MenuItem>
            <MenuItem value={"C++ 98"}>C++ 98</MenuItem>
            <MenuItem value={"C++ 11"}>C++ 11</MenuItem>
            <MenuItem value={"C++ 20"}>C++ 20</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-multiline-static"
            label=""
            color="success"
            multiline
            rows={isTestCasesShown ? "12" : "20"}
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            variant="outlined"
            fullWidth
            style={{ height: isTestCasesShown ? "40vh" : "100%" }}
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
          {!isContest && (
            <Button
              variant="contained"
              style={{ backgroundColor: Colors.dark_color }}
              onClick={handleVideoRequestButtonPress}
              disabled={isVideoRequestButtonDisabled}
            >
              Request Video
            </Button>
          )}
          <div style={{ display: "flex" }}>
            {!isContest && (
              <div style={{ fontSize: "140%", marginRight: "20px" }}>
                Remaining attempts: {remainingAttempts}
              </div>
            )}
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
          </div>
        </Grid>
        {isTestCasesShown && (
          <Grid item xs={12}>
            <TestCases />
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default CodingQuestionText;
