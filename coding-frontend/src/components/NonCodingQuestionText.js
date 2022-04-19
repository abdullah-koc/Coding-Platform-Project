import React, { useState } from "react";
import { TextField, Grid, MenuItem, Select, Button } from "@mui/material";
import Colors from "../utils/Colors";
import TestCases from "./TestCases";

const NonCodingQuestionText = ({ parentSubmitCallback }) => {
  const [questionText, setQuestionText] = useState("");
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);

  const handleSubmitButtonPress = () => {
    setIsSubmitButtonDisabled(true);
    parentSubmitCallback(true);
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
