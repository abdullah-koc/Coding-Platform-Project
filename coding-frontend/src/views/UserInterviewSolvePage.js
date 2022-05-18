import React, { useState, useEffect } from "react";
import NavbarUser from "../components/Navbars/NavbarUser";
import { Grid, Button } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ContestQuestionCard from "../components/UserMainScreenComponents/ContestQuestionCard";
import { useNavigate } from "react-router-dom";
import RanksTable from "../components/RanksTable";
import axios from "axios";

export const UserInterviewSolvePage = () => {
  let navigate = useNavigate();
  useEffect(() => {
    if (
      localStorage.getItem("session") === null ||
      JSON.parse(localStorage.getItem("session")).person_id.charAt(0) !== "U"
    ) {
      navigate("/");
    }
  }, []);

  const [questions, setQuestions] = useState([]);
  const [interview, setInterview] = useState({});

  const getID = () => {
    let url = window.location.href;
    let id = url.split("/")[url.split("/").length - 1];
    return id;
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_URL + `api/interview/c/${getID()}`)
      .then((res) => {
        console.log(res.data);
        setInterview(res.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_URL +
          `api/interview/get_questions/${10}/${getID()}`
      )
      .then((res) => {
        setQuestions(res.data);
      });
  }, [interview]);

  const handleGoToQuestion = (id) => {
    if (id.startsWith("CQ")) {
      navigate("/contests/c/" + getID() + "/" + id);
    } else {
      navigate("/contests/nc/" + getID() + "/" + id);
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
            <div>
              <h1>{interview.interview_name}</h1>
            </div>
            <Grid container>
              <Grid item xs={8} style={{ paddingTop: "10px" }}>
                <p style={{ fontWeight: "bold", display: "inline" }}>
                  Start Date:
                </p>
                &nbsp;
                {new Date(interview.interview_date).toLocaleDateString() +
                  " " +
                  new Date(interview.interview_date).toLocaleTimeString()}
                <br />
                <br />
                <p style={{ fontWeight: "bold", display: "inline" }}>
                  Duration:
                </p>
                &nbsp;{interview.interview_duration} hours
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={7}
            style={{
              paddingLeft: "40px",
              paddingTop: "10px",
            }}
          >
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
                    onClick={() => handleGoToQuestion(question.question_id)}
                  >
                    <ContestQuestionCard
                      isContest={false}
                      isCoding={question.question_id.startsWith("CQ")}
                      question={question.title}
                      difficulty={question.difficulty}
                      likeRate={
                        (100 * question.like_count) /
                        (question.like_count + question.dislike_count).toFixed(
                          2
                        )
                      }
                      questionPoint={question.question_point}
                      style={{ marginTop: "20px" }}
                    />
                  </div>
                ))}
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default UserInterviewSolvePage;
