import React from "react";
import { Grid } from "@mui/material";
import axios from "axios";

const TestCases = ({ isExisting, attemptID, tests }) => {
  const [testCases, setTestCases] = React.useState([]);
  const [isPassedArr, setIsPassedArr] = React.useState(
    Array(10).fill({ is_passed: false })
  );
  const [curIsLocked, setCurIsLocked] = React.useState(false);
  const [curExampleInput, setCurExampleInput] = React.useState("");
  const [curExampleOutput, setCurExampleOutput] = React.useState("");
  const [curIsPassed, setCurIsPassed] = React.useState(false);

  //generate random string with given length
  const generateRandomString = (length) => {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  //get the id from the link
  const getID = () => {
    let url = window.location.href;
    let id = url.split("/")[url.split("/").length - 1];
    return id;
  };

  React.useEffect(() => {
    if (isExisting) {
      var curTests = [];
      for (let i = 0; i < tests.length; i++) {
        for (let j = 0; j < tests[i].length; j++) {
          if (tests[i][j].attempt_id === attemptID) {
            curTests.push(tests[i][j]);
          }
        }
      }
      setIsPassedArr(curTests);
      setCurIsPassed(curTests[0].is_passed);
    } else {
      axios
        .get(
          process.env.REACT_APP_URL +
            "api/attempt/" +
            JSON.parse(localStorage.getItem("session")).person_id +
            "/" +
            getID()
        )
        .then((res) => {
          axios
            .get(
              process.env.REACT_APP_URL +
                "api/testcase/get/matches/" +
                res.data[res.data.length - 1].attempt_id
            )
            .then((res) => {
              setIsPassedArr(res.data);
              setCurIsPassed(res.data[0].is_passed);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  React.useEffect(() => {
    axios
      .get(process.env.REACT_APP_URL + "api/testcase/" + getID() + "/testCases")
      .then((res) => {
        setTestCases(res.data);
        setCurIsLocked(res.data[0].is_locked);
        setCurExampleInput(res.data[0].example_input);
        setCurExampleOutput(res.data[0].example_output);
      });
  }, []);

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
                var isPs = false;
                try {
                  isPs = isPassedArr[index].is_passed;
                } catch (error) {
                  isPs = false;
                }
                setCurIsPassed(isPs);
              }}
            >
              {"Test Case " + (index + 1).toString()}{" "}
              {isPassedArr[index].is_passed ? "✅" : "❌"}{" "}
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
            {"Test Case "} {curIsPassed ? "✅" : "❌"}{" "}
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
          <div style={{ marginBottom: "20px" }}>
            Your output:{" "}
            {curIsPassed ? curExampleOutput : generateRandomString(6)}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default TestCases;
