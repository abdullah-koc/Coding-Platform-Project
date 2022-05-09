import React from "react";
import { Grid, Button } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import NavbarUser from "./Navbars/NavbarUser";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import Colors from "../utils/Colors";
import Box from "@mui/material/Box";
import CodingQuestionText from "./CodingQuestionText";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TestCases from "./TestCases";

const CodingQuestionInfo = ({ isContest }) => {
  let navigate = useNavigate();

  const getContestID = () => {
    let url = window.location.href;
    let id = url.split("/")[url.split("/").length - 2];
    return id;
  };

  React.useEffect(() => {
    if (
      localStorage.getItem("session") === null ||
      JSON.parse(localStorage.getItem("session")).person_id.charAt(0) !== "U"
    ) {
      navigate("/");
    }
  }, []);

  React.useEffect(() => {
    if (isContest) {
      axios
        .get(
          process.env.REACT_APP_URL +
            "api/contest/get/all/" +
            JSON.parse(localStorage.getItem("session")).person_id
        )
        .then((res) => {
          let count = 0;
          let contestID = getContestID();
          let userID = JSON.parse(localStorage.getItem("session")).person_id;
          res.data.map((contest) => {
            if (contest.contest_id === contestID) {
              count++;
            }
          });
          if (count === 0) {
            navigate("/");
          }
        });
    }
  }, []);

  const [mode, setMode] = React.useState(0);
  const [question, setQuestion] = React.useState({});
  const [isSolutionDisabled, setIsSolutionDisabled] = React.useState(true);
  const [isLiked, setIsLiked] = React.useState(false);
  const [isDisliked, setIsDisliked] = React.useState(false);
  const [previousAttempts, setPreviousAttempts] = React.useState([]);
  const [previousTestCases, setPreviousTestCases] = React.useState([]);
  const [previousSubmission, setPreviousSubmission] = React.useState({});

  const handleAttemptClick = (attempt) => {
    setPreviousSubmission(attempt);
  };

  const handleSubmitCallback = (childData) => {
    setIsSolutionDisabled(!childData);
  };

  //get the id from the link
  const getID = () => {
    let url = window.location.href;
    let id = url.split("/")[url.split("/").length - 1];
    return id;
  };

  React.useEffect(() => {
    axios
      .get(process.env.REACT_APP_URL + `api/question/${getID()}`)
      .then((res) => {
        setQuestion(res.data);
      })
      .catch((err) => {
        alert("An error occured");
        navigate("/");
      });
  }, []);

  React.useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_URL +
          "api/attempt/" +
          JSON.parse(localStorage.getItem("session")).person_id +
          "/" +
          getID()
      )
      .then((res) => {
        setPreviousAttempts(res.data);
      })
      .catch((err) => {
        alert("An error occured");
        navigate("/");
      });
  }, []);

  React.useEffect(() => {
    var reqArr = [];
    previousAttempts.map((attempt) => {
      reqArr.push(
        axios.get(
          process.env.REACT_APP_URL +
            `api/testcase/get/matches/${attempt.attempt_id}`
        )
      );
    });
    axios.all(reqArr).then(
      axios.spread((...responses) => {
        let testCases = [];
        responses.map((response) => {
          testCases.push(response.data);
        });
        setPreviousTestCases(testCases);
      })
    );
  }, [previousAttempts]);

  React.useEffect(() => {
    console.log(previousTestCases);
  }, [previousTestCases]);

  const handleLikeButtonClick = () => {
    if (isLiked) {
      setIsLiked(false);
      axios.get(process.env.REACT_APP_URL + "api/question/unlike/" + getID());
    } else if (isDisliked) {
      setIsDisliked(false);
      setIsLiked(true);
      axios.get(
        process.env.REACT_APP_URL + "api/question/undislike/" + getID()
      );
      axios.get(process.env.REACT_APP_URL + "api/question/like/" + getID());
    } else if (!isLiked && !isDisliked) {
      setIsLiked(true);
      axios.get(process.env.REACT_APP_URL + "api/question/like/" + getID());
    }
  };

  const handleDislikeButtonClick = () => {
    if (isDisliked) {
      setIsDisliked(false);
      axios.get(
        process.env.REACT_APP_URL + "api/question/undislike/" + getID()
      );
    } else if (isLiked) {
      setIsLiked(false);
      setIsDisliked(true);
      axios.get(process.env.REACT_APP_URL + "api/question/unlike/" + getID());
      axios.get(process.env.REACT_APP_URL + "api/question/dislike/" + getID());
    } else if (!isLiked && !isDisliked) {
      setIsDisliked(true);
      axios.get(process.env.REACT_APP_URL + "api/question/dislike/" + getID());
    }
  };

  const handleYoutubeClick = () => {
    if (question.video_link) {
      window.open(JSON.parse(question.video_link).video_link, "_blank");
    }
  };

  return (
    <div>
      <NavbarUser />
      <div style={{ display: "flex" }}>
        <Box
          sx={{
            paddingRight: "20px",
            width: "45vw",
            height: "calc(100vh - 100px)",
            marginTop: "1px",
          }}
        >
          <Grid container>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={isContest ? 12 : 4}>
                  <Button
                    style={{
                      width: "100%",
                      backgroundColor: Colors.secondary_color,
                    }}
                    onClick={() => setMode(0)}
                    variant="contained"
                  >
                    Description
                  </Button>
                </Grid>
                {!isContest && (
                  <Grid item xs={3}>
                    <Button
                      style={{
                        width: "100%",
                        backgroundColor: isSolutionDisabled
                          ? "white"
                          : Colors.secondary_color,
                        color: isSolutionDisabled ? Colors.dark_color : "white",
                      }}
                      variant="contained"
                      onClick={() => setMode(1)}
                      disabled={isSolutionDisabled}
                    >
                      Solution
                    </Button>
                  </Grid>
                )}
                {!isContest && (
                  <Grid item xs={5}>
                    <Button
                      style={{
                        width: "100%",
                        backgroundColor: Colors.secondary_color,
                      }}
                      onClick={() => setMode(2)}
                      variant="contained"
                    >
                      Last Submissions
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {mode === 0 && (
                <div>
                  <Grid container style={{ paddingTop: "4%" }}>
                    <Grid
                      item
                      xs={7}
                      style={{
                        paddingLeft: "8%",
                        fontWeight: "bolder",
                        fontSize: "20px",
                      }}
                    >
                      {question.title}
                    </Grid>
                    {!isContest && (
                      <Grid item xs={1}>
                        <YouTubeIcon
                          onClick={() => handleYoutubeClick()}
                          style={{
                            fontSize: "200%",
                            cursor: question.video_link ? "pointer" : "default",
                            color: question.video_link ? "#FF0000" : "white",
                          }}
                        />
                      </Grid>
                    )}
                    {!isContest && (
                      <Grid
                        item
                        xs={2}
                        style={{
                          paddingTop: "0.7%",
                          paddingLeft: "0.001%",
                          display: "flex",
                          justifyContent: "center",
                          fontWeight: "bolder",
                        }}
                      >
                        {question.difficulty}
                      </Grid>
                    )}
                    {!isContest && (
                      <Grid
                        item
                        xs={1}
                        onClick={handleLikeButtonClick}
                        style={{ cursor: "pointer" }}
                      >
                        <ThumbUpIcon
                          style={{
                            paddingTop: "5%",
                            color: isLiked ? "#00FF00" : "black",
                          }}
                        ></ThumbUpIcon>
                      </Grid>
                    )}
                    {!isContest && (
                      <Grid
                        item
                        xs={1}
                        onClick={handleDislikeButtonClick}
                        style={{ cursor: "pointer" }}
                      >
                        <ThumbDownAltIcon
                          style={{
                            paddingTop: "5%",
                            color: isDisliked ? "#FF0000" : "black",
                          }}
                        ></ThumbDownAltIcon>
                      </Grid>
                    )}
                  </Grid>
                  <Grid
                    style={{
                      paddingLeft: "8%",
                      paddingRight: "8%",
                      paddingTop: "10%",
                      lineHeight: 2,
                      overflowY: "scroll",
                      textAlign: "justify",
                      height: "76vh",
                    }}
                  >
                    {question.explanation}
                  </Grid>
                </div>
              )}
              {mode === 1 && (
                <div
                  style={{
                    paddingLeft: "8%",
                    paddingRight: "8%",
                    paddingTop: "4%",
                    lineHeight: 2,
                    overflowY: "scroll",
                    fontSize: "16px",
                    textAlign: "justify",
                    height: "76vh",
                  }}
                >
                  {question.solution}
                </div>
              )}
              {mode === 2 && (
                <div>
                  <Grid
                    container
                    style={{
                      display: "flex",
                      paddingTop: "10px",
                      maxHeight: "40vh",
                      overflowY: "scroll",
                    }}
                  >
                    {previousAttempts.map((attempt, index) => (
                      <Grid
                        item
                        xs={12}
                        key={index}
                        onClick={() => handleAttemptClick(attempt)}
                        sx={{
                          width: "80%",
                          height: "40px",
                          cursor: "pointer",
                          backgroundColor: Colors.dark_color,
                          borderRadius: "5px",
                          color: "white",
                          fontWeight: "bolder",
                          alignItems: "center",
                          margin: "2%",
                          marginLeft: "4%",
                          marginRight: "4%",
                          paddingLeft: "2%",
                          paddingTop: "10px",
                        }}
                      >
                        <div>Attempt {index + 1}</div>
                      </Grid>
                    ))}
                  </Grid>
                  {previousSubmission.user_answer !== undefined && (
                    <Grid container style={{ padding: "20px" }}>
                      <Grid item xs={12}>
                        Your submission: {previousSubmission.user_answer}
                      </Grid>
                      <Grid item xs={12}>
                        Test case results:
                      </Grid>
                      <TestCases
                        isExisting
                        attemptID={previousSubmission.attempt_id}
                        tests={previousTestCases}
                      />
                    </Grid>
                  )}
                </div>
              )}
            </Grid>
          </Grid>
        </Box>
        {previousSubmission && (
          <CodingQuestionText
            isContest={isContest}
            parentSubmitCallback={handleSubmitCallback}
            previousSubmission={previousSubmission}
          />
        )}

        {!previousSubmission && (
          <CodingQuestionText
            isContest={isContest}
            parentSubmitCallback={handleSubmitCallback}
          />
        )}
      </div>
    </div>
  );
};

export default CodingQuestionInfo;
