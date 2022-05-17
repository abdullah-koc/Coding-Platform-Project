import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  TextField,
  DialogTitle,
  Radio,
  Checkbox,
  Grid,
  DialogActions,
  DialogContent,
  RadioGroup,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@mui/material";
import axios from "axios";

const AddQuestionDialog = ({ open, handleParentOpen, interviewID }) => {
  const [questionType, setQuestionType] = useState("CQ");
  const [questionTitle, setQuestionTitle] = useState("");
  const [explanation, setExplanation] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [advisedDuration, setAdvisedDuration] = useState(0);
  const [questionPoint, setQuestionPoint] = useState(0);
  const [solution, setSolution] = useState("");
  const [maxTry, setMaxTry] = useState(interviewID !== null ? 1 : 3);
  const [typeDescription, setTypeDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [noOfTestCases, setNoOfTestCases] = useState(0);
  const [inputs, setInputs] = useState([]);
  const [outputs, setOutputs] = useState([]);
  const [lockedStatus, setLockedStatus] = useState([]);
  const [isContest, setIsContest] = useState(false);

  useEffect(() => {
    if (isContest) {
      setMaxTry(1000);
    } else {
      setMaxTry(3);
    }
  }, [isContest]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_URL + "api/category/all").then((res) => {
      setCategories(res.data);
    });
  }, []);

  useEffect(() => {
    if (noOfTestCases > inputs.length) {
      setInputs([...inputs, ""]);
    }
    if (noOfTestCases > outputs.length) {
      setOutputs([...outputs, ""]);
    }
    if (noOfTestCases > lockedStatus.length) {
      setLockedStatus([...lockedStatus, false]);
    }
    if (noOfTestCases < inputs.length) {
      setInputs(inputs.slice(0, noOfTestCases));
    }
    if (noOfTestCases < outputs.length) {
      setOutputs(outputs.slice(0, noOfTestCases));
    }
    if (noOfTestCases < lockedStatus.length) {
      setLockedStatus(lockedStatus.slice(0, noOfTestCases));
    }
  }, [noOfTestCases]);

  const handleClose = () => {
    //set all fields to empty
    setQuestionType("CQ");
    setQuestionTitle("");
    setExplanation("");
    setDifficulty("Easy");
    setAdvisedDuration(0);
    setQuestionPoint(0);
    setSolution("");
    setMaxTry(3);
    setTypeDescription("");
    handleParentOpen(false);
  };

  const handleIsContest = (e) => {
    if (e.target.checked) {
      setIsContest(true);
    } else {
      setIsContest(false);
    }
    console.log(isContest);
  };

  const addTestCaseHelper = (curQuestionId, ins, outs, locks, index) => {
    if (index === noOfTestCases) {
      return;
    }
    axios
      .post(process.env.REACT_APP_URL + "api/testcase/add", {
        example_input: inputs[index],
        example_output: outputs[index],
        is_locked: lockedStatus[index],
        coding_question_id: curQuestionId,
      })
      .then((res) => {
        addTestCaseHelper(curQuestionId, ins, outs, locks, index + 1);
      });
  };
  const handleAddQuestion = () => {
    //check if all fields are filled
    if (
      questionTitle === "" ||
      explanation === "" ||
      questionPoint === 0 ||
      maxTry === 0
    ) {
      alert("Please fill all fields");
      return;
    }
    if (noOfTestCases === 0 && questionType === "CQ") {
      alert("Please add at least one test case");
      return;
    }

    axios
      .post(process.env.REACT_APP_URL + "api/question/insert", {
        title: questionTitle,
        explanation: explanation,
        question_duration: advisedDuration,
        difficulty: difficulty,
        question_point: questionPoint,
        solution: solution,
        max_try: maxTry,
        question_type: questionType,
        creation_date:
          new Date().getFullYear() +
          "-" +
          ("0" + (new Date().getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + new Date().getDate()).slice(-2),
        editor_id: JSON.parse(localStorage.getItem("session")).person_id,
        company_id: JSON.parse(localStorage.getItem("session")).company_id,
        is_contest: isContest,
      })
      .then((res) => {
        var curQuestion;
        axios
          .get(process.env.REACT_APP_URL + "api/question/all")
          .then((res) => {
            curQuestion = res.data.filter(
              (question) => question.title === questionTitle
            )[0];
            console.log(interviewID);
            if (interviewID) {
              axios.post(
                process.env.REACT_APP_URL +
                  "api/interview/add_question/" +
                  JSON.parse(localStorage.getItem("session")).company_id +
                  "/" +
                  interviewID +
                  "/" +
                  curQuestion.question_id
              );
            }
            selectedCategories.map((category) => {
              axios.post(
                process.env.REACT_APP_URL +
                  "api/question/add_category/" +
                  curQuestion.question_id +
                  "/" +
                  category.category_name
              );
            });
            if (questionType === "CQ") {
              addTestCaseHelper(
                curQuestion.question_id,
                inputs,
                outputs,
                lockedStatus,
                0
              );
            }
          });
        alert("Question added successfully");
        //window.location.reload();
        handleClose();
      })
      .catch((err) => {
        alert("Error adding question");
      });
    //close dialog
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
                        onChange={(e) => {
                          setQuestionType(e.target.value);
                          if (e.target.value === "NCQ") {
                            setNoOfTestCases(0);
                            setInputs([]);
                            setOutputs([]);
                            setLockedStatus([]);
                          }
                        }}
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
                      rows="14"
                      style={{ width: "400px" }}
                      value={explanation}
                      onChange={(e) => setExplanation(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={6}>
                <Grid container>
                  {!interviewID && (
                    <Grid
                      item
                      xs={12}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "10px",
                      }}
                    >
                      <div>Contest Question:</div>
                      <div style={{ marginLeft: "80px" }} />
                      <div>
                        {" "}
                        <FormControlLabel
                          control={<Switch />}
                          label="Contest Question"
                          onClick={(e) => handleIsContest(e)}
                        />
                      </div>
                    </Grid>
                  )}
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
                      type="number"
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
                      type="number"
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
                        disabled={isContest || interviewID}
                        type="number"
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

              <Grid item xs={12} style={{ marginTop: "10px" }}>
                <div>Category Selection:</div>
                {categories.map((category, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        onChange={() => {
                          if (selectedCategories.includes(category)) {
                            setSelectedCategories(
                              selectedCategories.filter((c) => c !== category)
                            );
                          } else {
                            setSelectedCategories([
                              ...selectedCategories,
                              category,
                            ]);
                          }
                        }}
                      />
                    }
                    label={category.category_name}
                  />
                ))}
              </Grid>
              {questionType === "CQ" && (
                <Grid item xs={12} style={{ marginTop: "10px" }}>
                  <div>Test Cases:</div>
                  <div>
                    Number of Test Cases:{" "}
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        if (noOfTestCases > 0) {
                          setNoOfTestCases(noOfTestCases - 1);
                        }
                      }}
                    >
                      ➖
                    </span>{" "}
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setNoOfTestCases(noOfTestCases + 1);
                      }}
                    >
                      ➕
                    </span>
                  </div>
                </Grid>
              )}
              {[...Array(noOfTestCases).fill(0)].map((val, index) => (
                <Grid
                  item
                  xs={12}
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                  key={index}
                >
                  <TextField
                    label="Input"
                    size="small"
                    onChange={(e) => {
                      inputs[index] = e.target.value;
                    }}
                  />
                  <TextField
                    label="Expected Output"
                    size="small"
                    onChange={(e) => {
                      outputs[index] = e.target.value;
                    }}
                  />
                  <div>
                    <Checkbox
                      onChange={(e) => {
                        lockedStatus[index] = e.target.checked;
                      }}
                    />{" "}
                    Locked
                  </div>
                </Grid>
              ))}
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
