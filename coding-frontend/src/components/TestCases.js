import React from "react";
import { Grid } from "@mui/material";

const TestCases = () => {
  const [testCases, setTestCases] = React.useState([
    {
      id: 1,
      name: "Test Case 1",
      exampleInput: "test input 1",
      exampleOutput: "test output 1",
      isPassed: true,
      isLocked: false,
    },
    {
      id: 2,
      name: "Test Case 2",
      exampleInput: "test input 2",
      exampleOutput: "test output 2",
      isPassed: true,
      isLocked: false,
    },
    {
      id: 3,
      name: "Test Case 3",
      exampleInput: "test input 3",
      exampleOutput: "test output 3",
      isPassed: false,
      isLocked: false,
    },
    {
      id: 4,
      name: "Test Case 4",
      exampleInput: "test input 4",
      exampleOutput: "test output 4",
      isPassed: false,
      isLocked: true,
    },
    {
      id: 5,
      name: "Test Case 5",
      exampleInput: "test input 5",
      exampleOutput: "test output 5",
      isPassed: false,
      isLocked: true,
    },
    {
      id: 6,
      name: "Test Case 6",
      exampleInput: "test input 6",
      exampleOutput: "test output 6",
      isPassed: false,
      isLocked: true,
    },
  ]);
  const [curTestCase, setCurTestCase] = React.useState(testCases[0]);
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
          {testCases.map((testCase) => (
            <div
              style={{ marginBottom: "10px", cursor: "pointer" }}
              key={testCase.id}
              onClick={() => setCurTestCase(testCase)}
            >
              {testCase.name} {testCase.isPassed ? "✅" : "❌"}{" "}
              {testCase.isLocked ? "🔒" : ""}
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
            {curTestCase.name} {curTestCase.isPassed ? "✅" : "❌"}{" "}
          </div>
          {!curTestCase.isLocked && (
            <div>
              <div style={{ marginBottom: "20px" }}>
                Input: {curTestCase.exampleInput}
              </div>
              <div style={{ marginBottom: "20px" }}>
                Expected output: {curTestCase.exampleOutput}
              </div>
            </div>
          )}
          <div style={{ marginBottom: "20px" }}>Your output: Test output</div>
        </Grid>
      </Grid>
    </div>
  );
};

export default TestCases;
