import React, { useState } from "react";
import {
  Button,
  Dialog,
  TextField,
  DialogTitle,
  Radio,
  Grid,
  DialogActions,
  DialogContent,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

const AddQuestionDialog = ({ open, handleParentOpen }) => {
  const [questionType, setQuestionType] = useState("CQ");
  const [questionTitle, setQuestionTitle] = useState("");
  const [explanation, setExplanation] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [advisedDuration, setAdvisedDuration] = useState(0);
  const [questionPoint, setQuestionPoint] = useState(0);
  const [solution, setSolution] = useState("");
  const [maxTry, setMaxTry] = useState(3);
  const [typeDescription, setTypeDescription] = useState("");

  const handleClose = () => {
    handleParentOpen(false);
  };
  const handleAddQuestion = () => {
    //check if all fields are filled
    if (
      questionTitle === "" ||
      explanation === "" ||
      questionPoint === 0 ||
      maxTry === 0 ||
      typeDescription === ""
    ) {
      alert("Please fill all fields");
      return;
    }
    //TODO: add question to database
    //if question is added for contest,
    if (questionType === "CQ") {
    }
    //close dialog
    handleClose();
  };
  return (
    <div>
      <div>
        <Dialog fullWidth maxWidth="xl" open={open} onClose={handleClose}>
          <DialogTitle>Add Question</DialogTitle>
          <DialogContent>
            <Grid container style={{ padding: "20px" }}>
              <Grid item xs={6}>
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div>Question Type:</div>
                    <div style={{ marginLeft: "10px" }} />
                    <div>
                      <RadioGroup
                        row
                        defaultValue="CQ"
                        value={questionType}
                        onChange={(e) => setQuestionType(e.target.value)}
                      >
                        <FormControlLabel
                          value="CQ"
                          control={<Radio />}
                          label="Coding"
                        />
                        <FormControlLabel
                          value="NCQ"
                          control={<Radio />}
                          label="Non-coding"
                        />
                      </RadioGroup>
                    </div>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div>Question Title:</div>
                    <div style={{ marginLeft: "10px" }} />
                    <TextField
                      size="small"
                      style={{ width: "400px" }}
                      value={questionTitle}
                      onChange={(e) => setQuestionTitle(e.target.value)}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    <div>Explanation:</div>
                    <div style={{ marginLeft: "25px" }} />
                    <TextField
                      multiline
                      rows="20"
                      style={{ width: "400px" }}
                      value={explanation}
                      onChange={(e) => setExplanation(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={6}>
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div>Difficulty:</div>
                    <div style={{ marginLeft: "140px" }} />
                    <div>
                      <RadioGroup
                        row
                        defaultValue="Easy"
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                      >
                        <FormControlLabel
                          value="Easy"
                          control={<Radio />}
                          label="Easy"
                        />
                        <FormControlLabel
                          value="Medium"
                          control={<Radio />}
                          label="Medium"
                        />
                        <FormControlLabel
                          value="Hard"
                          control={<Radio />}
                          label="Hard"
                        />
                      </RadioGroup>
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div>Advised Duration (minutes):</div>
                    <div style={{ marginLeft: "10px" }} />
                    <TextField
                      size="small"
                      style={{ width: "200px" }}
                      value={advisedDuration}
                      onChange={(e) => setAdvisedDuration(e.target.value)}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    <div>Question Point:</div>
                    <div style={{ marginLeft: "97px" }} />
                    <TextField
                      size="small"
                      style={{ width: "200px" }}
                      value={questionPoint}
                      onChange={(e) => setQuestionPoint(e.target.value)}
                    />
                  </Grid>
                  {questionType === "CQ" && (
                    <Grid
                      item
                      xs={12}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "10px",
                      }}
                    >
                      <div>Maximum Try:</div>
                      <div style={{ marginLeft: "105px" }} />
                      <TextField
                        size="small"
                        style={{ width: "200px" }}
                        value={maxTry}
                        onChange={(e) => setMaxTry(e.target.value)}
                      />
                    </Grid>
                  )}
                  {questionType === "NCQ" && (
                    <Grid
                      item
                      xs={12}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "10px",
                      }}
                    >
                      <div>Type Description:</div>
                      <div style={{ marginLeft: "83px" }} />
                      <TextField
                        size="small"
                        style={{ width: "200px" }}
                        value={typeDescription}
                        onChange={(e) => setTypeDescription(e.target.value)}
                      />
                    </Grid>
                  )}
                  <Grid
                    item
                    xs={12}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    <div>Solution:</div>
                    <div style={{ marginLeft: "140px" }} />
                    <TextField
                      size="small"
                      style={{ width: "400px" }}
                      multiline
                      value={solution}
                      rows="10"
                      onChange={(e) => setSolution(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleAddQuestion}>Add</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default AddQuestionDialog;
