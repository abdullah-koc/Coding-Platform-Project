import React from "react";
import { Grid } from "@mui/material";
import axios from "axios";

const TestCases = () => {
  const [testCases, setTestCases] = React.useState([]);
  const [questionId, setQuestionId] = React.useState(0);
  const [curIsLocked, setCurIsLocked] = React.useState(false);
  const [curExampleInput, setCurExampleInput] = React.useState("");
  const [curExampleOutput, setCurExampleOutput] = React.useState("");

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
        console.log(res.data);
        setQuestionId(res.data.question_id);
      });
  }, []);

  React.useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_URL + "api/testcase/" + questionId + "/testCases"
      )
      .then((res) => {
        setTestCases(res.data);
        setCurIsLocked(res.data[0].is_locked);
        setCurExampleInput(res.data[0].example_input);
        setCurExampleOutput(res.data[0].example_output);
      });
  }, [questionId]);

  return (
    <div
      style={{
        width: "55vw",
        height: "26vh",
        marginTop: "30px",
      }}
    >
      <Grid container>
        <Grid
          item
          xs={3}
          style={{
            overflowY: "scroll",
            height: "30vh",
          }}
        >
          {testCases.map((testCase, index) => (
            <div
              style={{ marginBottom: "10px", cursor: "pointer" }}
              key={index}
              onClick={() => {
                setCurIsLocked(testCase.is_locked);
                setCurExampleInput(testCase.example_input);
                setCurExampleOutput(testCase.example_output);
              }}
            >
              {"Test Case " + index + 1} {true ? "✅" : "❌"}{" "}
              {testCase.is_locked === undefined
                ? ""
                : testCase.is_locked
                ? "🔒"
                : ""}
            </div>
          ))}
        </Grid>
        <Grid
          item
          xs={9}
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "18px",
            paddingLeft: "30px",
            paddingTop: "10px",
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            {" "}
            {"Test Case "} {true ? "✅" : "❌"}{" "}
          </div>
          {!curIsLocked && (
            <div>
              <div style={{ marginBottom: "20px" }}>
                Input: {curExampleInput}
              </div>
              <div style={{ marginBottom: "20px" }}>
                Expected output: {curExampleOutput}
              </div>
            </div>
          )}
          <div style={{ marginBottom: "20px" }}>Your output: {}</div>
        </Grid>
      </Grid>
    </div>
  );
};

export default TestCases;
