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

const CodingQuestionInfo = ({ isContest }) => {
  let navigate = useNavigate();
  React.useEffect(() => {
    if (
      localStorage.getItem("session") === null ||
      JSON.parse(localStorage.getItem("session")).person_id.charAt(0) !== "U"
    ) {
      navigate("/");
    }
  }, []);
  const [mode, setMode] = React.useState(0);
  const [question, setQuestion] = React.useState({});
  const [previousAttempts, setPreviousAttempts] = React.useState([
    { id: 1, attemptCount: 1, passedTests: 12, totalTestCaseCount: 20 },
    { id: 2, attemptCount: 2, passedTests: 18, totalTestCaseCount: 20 },
    { id: 3, attemptCount: 3, passedTests: 20, totalTestCaseCount: 20 },
  ]);
  const [isSolutionDisabled, setIsSolutionDisabled] = React.useState(true);
  const [isLiked, setIsLiked] = React.useState(false);
  const [isDisliked, setIsDisliked] = React.useState(false);

  const handleAttemptClick = (attempt) => {
    console.log(attempt);
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
      window.open(question.video_link);
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
                      justifyContent: "center",
                      paddingTop: "4%",
                    }}
                  >
                    {previousAttempts.map((attempt) => (
                      <Grid
                        item
                        xs={12}
                        key={attempt.id}
                        onClick={() => handleAttemptClick(attempt)}
                        sx={{
                          width: "80%",
                          height: "100px",
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
                        {attempt.passedTests !== attempt.totalTestCaseCount && (
                          <div>
                            Attempt {attempt.attemptCount}
                            {" ❌"}
                            <br></br>
                            <br></br>
                            Failed {attempt.passedTests}/
                            {attempt.totalTestCaseCount} of test cases
                          </div>
                        )}
                        {attempt.passedTests === attempt.totalTestCaseCount && (
                          <div>
                            Attempt {attempt.attemptCount}
                            {" ✅"}
                            <br></br>
                            <br></br>
                            Passed {attempt.passedTests}/
                            {attempt.totalTestCaseCount} of test cases
                          </div>
                        )}
                      </Grid>
                    ))}
                  </Grid>
                </div>
              )}
            </Grid>
          </Grid>
        </Box>
        <CodingQuestionText
          isContest={isContest}
          parentSubmitCallback={handleSubmitCallback}
        />
      </div>
    </div>
  );
};

export default CodingQuestionInfo;
