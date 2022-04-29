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
import NonCodingQuestionText from "./NonCodingQuestionText";
import CommunitySubmission from "./CommunitySubmission";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NonCodingQuestionInfo = ({ isContest }) => {
  let navigate = useNavigate();
  React.useEffect(() => {
    if (
      localStorage.getItem("session") === null ||
      JSON.parse(localStorage.getItem("session")).person_id.charAt(0) !== "U"
    ) {
      navigate("/");
    }
  }, []);

  const [question, setQuestion] = React.useState({});
  const [mode, setMode] = React.useState(0);
  const [previousAttempts, setPreviousAttempts] = React.useState([
    { id: 1, attemptCount: 1, passedTests: 12, totalTestCaseCount: 20 },
    { id: 2, attemptCount: 2, passedTests: 18, totalTestCaseCount: 20 },
    { id: 3, attemptCount: 3, passedTests: 20, totalTestCaseCount: 20 },
  ]);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);
  const [isDisliked, setIsDisliked] = React.useState(false);

  const handleAttemptClick = (attempt) => {
    console.log(attempt);
  };

  const handleSubmitCallback = (childData) => {
    setIsSubmitted(childData);
  };

  //get the id from the link
  const getID = () => {
    let url = window.location.href;
    let id = url.split("/")[url.split("/").length - 1];
    return id;
  };

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
                  <Grid item xs={8}>
                    <Button
                      style={{
                        width: "100%",
                        backgroundColor: !isSubmitted
                          ? "white"
                          : Colors.secondary_color,
                        color: !isSubmitted ? Colors.dark_color : "white",
                      }}
                      onClick={() => setMode(1)}
                      variant="contained"
                      disabled={!isSubmitted}
                    >
                      {!isSubmitted ? "🔒 " : ""} Community Submissions
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
                          style={{
                            fontSize: "200%",
                            cursor: "pointer",
                            color: "#FF0000",
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
                <div style={{ overflowY: "scroll", height: "84vh" }}>
                  <CommunitySubmission submission="dsadsadadads" />
                  <CommunitySubmission submission="dsadsadadads" />
                  <CommunitySubmission submission="dsadsadadads" />
                  <CommunitySubmission submission="dsadsadadads" />
                  <CommunitySubmission submission="dsadsadadads" />
                </div>
              )}
            </Grid>
          </Grid>
        </Box>
        <NonCodingQuestionText parentSubmitCallback={handleSubmitCallback} />
      </div>
    </div>
  );
};

export default NonCodingQuestionInfo;
