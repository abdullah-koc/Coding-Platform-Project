import React, { useState } from "react";
import { TextField, Grid, MenuItem, Select, Button } from "@mui/material";
import Colors from "../utils/Colors";
import TestCases from "./TestCases";

const CodingQuestionText = () => {
  const [questionText, setQuestionText] = useState("");
  const [programmingLanguage, setProgrammingLanguage] = useState("Java 8");
  const [remainingAttempts, setRemainingAttempts] = useState(3);
  const [isTestCasesShown, setIsTestCasesShown] = useState(false);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);

  const handleSubmitButtonPress = () => {
    setIsTestCasesShown(true);
    if (remainingAttempts === 1) {
      setIsSubmitButtonDisabled(true);
    }
    setRemainingAttempts(remainingAttempts - 1);
  };

  const handleVideoRequestButtonPress = () => {
    console.log("video request button pressed");
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
          <Button
            variant="contained"
            style={{ backgroundColor: Colors.dark_color }}
            onClick={handleVideoRequestButtonPress}
          >
            Request Video
          </Button>
          <div style={{ display: "flex" }}>
            <div style={{ fontSize: "140%", marginRight: "20px" }}>
              Remaining attempts: {remainingAttempts}
            </div>
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
