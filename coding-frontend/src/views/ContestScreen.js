import React, { useState, useEffect } from "react";
import NavbarUser from "../components/Navbars/NavbarUser";
import { Grid, Button } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ContestQuestionCard from "../components/UserMainScreenComponents/ContestQuestionCard";
import { useNavigate } from "react-router-dom";
import RanksTable from "../components/RanksTable";

export const ContestScreen = () => {
  let navigate = useNavigate();
  useEffect(() => {
    if (
      localStorage.getItem("session") === null ||
      JSON.parse(localStorage.getItem("session")).person_id.charAt(0) !== "U"
    ) {
      navigate("/");
    }
  }, []);

  const [contestInfo, setContestInfo] = useState({
    contest_id: "C1",
    contest_name: "Havelsan Hackathon",
    contest_photo: "https://picsum.photos/200",
    start_date: "12/06/2022",
    end_date: "18/06/2022",
    prize: "10000$ to be used in Amazon web services",
    creation_date: "21/04/2022",
  });
  const [questions, setQuestions] = useState([
    {
      id: "CQ1",
      isCoding: "C",
      question: "What is the output of the following code?",
      difficulty: "Easy",
      likeRate: 87,
      isSolved: false,
      questionPoint: 12,
    },
    {
      id: "CQ2",
      isCoding: "C",
      question: "What is the output of the following code?",
      difficulty: "Easy",
      likeRate: 59,
      isSolved: false,
      questionPoint: 39,
    },
    {
      id: "CQ3",
      isCoding: "C",
      question: "What is the output of the following code?",
      difficulty: "Easy",
      likeRate: 43,
      isSolved: true,
      questionPoint: 17,
    },
    {
      id: "CQ4",
      isCoding: "C",
      question: "What is the output of the following code?",
      difficulty: "Easy",
      likeRate: 57,
      isSolved: true,
      questionPoint: 35,
    },
    {
      id: "CQ5",
      isCoding: "C",
      question: "What is the output of the following code?",
      difficulty: "Easy",
      likeRate: 61,
      isSolved: true,
      questionPoint: 23,
    },
    {
      id: "CQ6",
      isCoding: "C",
      question: "What is the output of the following code?",
      difficulty: "Easy",
      likeRate: 98,
      isSolved: true,
      questionPoint: 65,
    },
    {
      id: "CQ7",
      isCoding: "C",
      question: "What is the output of the following code?",
      difficulty: "Easy",
      likeRate: 20,
      isSolved: true,
      questionPoint: 45,
    },
    {
      id: "CQ8",
      isCoding: "C",
      question: "What is the output of the following code?",
      difficulty: "Easy",
      likeRate: 52,
      isSolved: true,
      questionPoint: 23,
    },
    {
      id: "CQ9",
      isCoding: "C",
      question: "What is the output of the following code?",
      difficulty: "Easy",
      likeRate: 67,
      isSolved: true,
      questionPoint: 8,
    },
    {
      id: "CQ10",
      isCoding: "C",
      question: "What is the output of the following code?",
      difficulty: "Easy",
      likeRate: 63,
      isSolved: true,
      questionPoint: 71,
    },
    {
      id: "CQ11",
      isCoding: "C",
      question: "What is the output of the following code?",
      difficulty: "Easy",
      likeRate: 75,
      isSolved: true,
      questionPoint: 22,
    },
  ]);

  const [isContestEnded, setIsContestEnded] = useState(
    // Date.now() > Date(contestInfo.end_date)
    false
  );
  const [isTermsAccepted, setisTermsAccepted] = useState(false);
  const handleSubmission = () => {
    if (isTermsAccepted) {
      alert("Contest Submitted");
    } else {
      alert("Please accept the terms and conditions");
    }
  };
  const handleChange = (event) => {
    setisTermsAccepted(event.target.value);
  };

  const handleGoToQuestion = (id) => {
    if (isTermsAccepted) {
      if (id.startsWith("CQ")) {
        navigate("/cquestion/" + id);
      } else {
        navigate("/ncquestion/" + id);
      }
    }
  };
  return (
    <div>
      <NavbarUser />
      <div
        style={{
          paddingLeft: "40px",
          paddingRight: "40px",
          paddingBottom: "20px",
          marginTop: "10px",
          height: "90vh",
        }}
      >
        <Grid container>
          <Grid
            item
            xs={5}
            style={{
              paddingLeft: "20px",
              fontSize: "20px",
            }}
          >
            {isContestEnded === false && (
              <div>
                <h1>{contestInfo.contest_name}</h1>
              </div>
            )}
            {isContestEnded === true && (
              <div>
                <h1>{contestInfo.contest_name} (Ended)</h1>
              </div>
            )}
            <Grid container>
              <Grid item xs={4}>
                <img
                  src={contestInfo.contest_photo}
                  alt="logo"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    marginRight: "20px",
                  }}
                />
              </Grid>
              <Grid item xs={8} style={{ paddingTop: "10px" }}>
                <p style={{ fontWeight: "bold", display: "inline" }}>
                  Start Date:
                </p>
                &nbsp;{contestInfo.start_date}
                <br />
                <br />
                <p style={{ fontWeight: "bold", display: "inline" }}>
                  End Date:
                </p>
                &nbsp;{contestInfo.end_date}
              </Grid>
            </Grid>
            <Grid container style={{ width: "600px", paddingTop: "20px" }}>
              <Grid item xs={2}>
                <EmojiEventsIcon
                  style={{
                    fontSize: "60px",
                    color: "#FFAB00",
                  }}
                />
              </Grid>
              <Grid item xs={10} style={{ paddingTop: "20px" }}>
                <p style={{ fontWeight: "bold", display: "inline" }}>Prize:</p>
                &nbsp;{contestInfo.prize}
              </Grid>
            </Grid>
            {isContestEnded === false && (
              <div>
                <h3>Contest Rules</h3>
                <Grid
                  container
                  style={{
                    height: "300px",
                    overflowX: "auto",
                    overflowY: "auto",
                    paddingTop: "10px",
                  }}
                >
                  <ul>
                    <li>
                      Morbi in sem quis dui placerat ornare. Pellentesque odio
                      nisi, euismod in, pharetra a, ultricies in, diam. Sed
                      arcu. Cras consequat.
                    </li>
                    <li>
                      Praesent dapibus, neque id cursus faucibus, tortor neque
                      egestas augue, eu vulputate magna eros eu erat. Aliquam
                      erat volutpat. Nam dui mi, tincidunt quis, accumsan
                      porttitor, facilisis luctus, metus.
                    </li>
                    <li>
                      Phasellus ultrices nulla quis nibh. Quisque a lectus.
                      Donec consectetuer ligula vulputate sem tristique cursus.
                      Nam nulla quam, gravida non, commodo a, sodales sit amet,
                      nisi.
                    </li>
                    <li>
                      Pellentesque fermentum dolor. Aliquam quam lectus,
                      facilisis auctor, ultrices ut, elementum vulputate, nunc.
                    </li>
                    <li>
                      Morbi in sem quis dui placerat ornare. Pellentesque odio
                      nisi, euismod in, pharetra a, ultricies in, diam. Sed
                      arcu. Cras consequat.
                    </li>
                    <li>
                      Praesent dapibus, neque id cursus faucibus, tortor neque
                      egestas augue, eu vulputate magna eros eu erat. Aliquam
                      erat volutpat. Nam dui mi, tincidunt quis, accumsan
                      porttitor, facilisis luctus, metus.
                    </li>
                    <li>
                      Phasellus ultrices nulla quis nibh. Quisque a lectus.
                      Donec consectetuer ligula vulputate sem tristique cursus.
                      Nam nulla quam, gravida non, commodo a, sodales sit amet,
                      nisi.
                    </li>
                    <li>
                      Pellentesque fermentum dolor. Aliquam quam lectus,
                      facilisis auctor, ultrices ut, elementum vulputate, nunc.
                    </li>
                    <li>
                      Phasellus ultrices nulla quis nibh. Quisque a lectus.
                      Donec consectetuer ligula vulputate sem tristique cursus.
                      Nam nulla quam, gravida non, commodo a, sodales sit amet,
                      nisi.
                    </li>
                    <li>
                      Pellentesque fermentum dolor. Aliquam quam lectus,
                      facilisis auctor, ultrices ut, elementum vulputate, nunc.
                    </li>
                    <li>
                      Phasellus ultrices nulla quis nibh. Quisque a lectus.
                      Donec consectetuer ligula vulputate sem tristique cursus.
                      Nam nulla quam, gravida non, commodo a, sodales sit amet,
                      nisi.
                    </li>
                    <li>
                      Pellentesque fermentum dolor. Aliquam quam lectus,
                      facilisis auctor, ultrices ut, elementum vulputate, nunc.
                    </li>
                  </ul>
                  <br />
                  <div style={{ paddingLeft: "20px" }}>
                    <input
                      type="radio"
                      value="accepted"
                      name="conditions"
                      onChange={handleChange}
                    />
                    I accept the terms and conditions
                  </div>
                </Grid>
              </div>
            )}
            {isContestEnded === true && (
              <div>
                <h3>Rankings</h3>
                <Grid
                  container
                  style={{
                    height: "300px",
                    overflowX: "auto",
                    overflowY: "auto",
                    paddingTop: "10px",
                  }}
                >
                  <RanksTable />
                </Grid>
              </div>
            )}
          </Grid>
          <Grid
            item
            xs={7}
            style={{
              paddingLeft: "40px",
              paddingTop: "10px",
            }}
          >
            {isContestEnded === true && (
              <div>
                <h1>Contest Questions</h1>
                <Grid
                  style={{
                    height: "575px",
                    overflowX: "auto",
                    overflowY: "auto",
                  }}
                >
                  {questions.map((question, index) => (
                    <div
                      key={index}
                      style={{ paddingRight: "40px", marginBottom: "10px" }}
                      onClick={() => handleGoToQuestion(question.id)}
                    >
                      <ContestQuestionCard
                        isCoding={question.isCoding}
                        question={question.question}
                        difficulty={question.difficulty}
                        likeRate={question.likeRate}
                        isSolved={question.isSolved}
                        questionPoint={question.questionPoint}
                        style={{ marginTop: "20px" }}
                      />
                    </div>
                  ))}
                </Grid>
              </div>
            )}
            {isContestEnded === false && (
              <div>
                <h1>Questions</h1>
                <Grid
                  style={{
                    height: "550px",
                    overflowX: "auto",
                    overflowY: "auto",
                  }}
                >
                  {questions.map((question, index) => (
                    <div
                      key={index}
                      style={{ paddingRight: "40px", marginBottom: "10px" }}
                      onClick={() => handleGoToQuestion(question.id)}
                    >
                      <ContestQuestionCard
                        isCoding={question.isCoding}
                        question={question.question}
                        difficulty={question.difficulty}
                        likeRate={question.likeRate}
                        isSolved={question.isSolved}
                        questionPoint={question.questionPoint}
                        style={{ marginTop: "20px" }}
                      />
                    </div>
                  ))}
                </Grid>
                <Grid
                  style={{
                    paddingTop: "20px",
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingRight: "50px",
                  }}
                >
                  <Button
                    style={{ backgroundColor: "#64DD17", color: "white" }}
                    onClick={handleSubmission}
                  >
                    Finish Contest
                  </Button>
                </Grid>
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ContestScreen;
