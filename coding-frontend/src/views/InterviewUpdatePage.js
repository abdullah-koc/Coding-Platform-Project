import React, { useState, useEffect } from "react";
import { Button, Grid, Pagination, TextField } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddQuestionDialog from "../components/AddQuestionDialog";
import { useNavigate } from "react-router-dom";
import InterviewQuestionCard from "../components/CompanyComponents/InterviewQuestionCard";
import NavbarCompany from "../components/Navbars/NavbarCompany";
import axios from "axios";

export const InterviewUpdatePage = () => {
  let navigate = useNavigate();

  const getID = () => {
    let url = window.location.href;
    return url.split("/")[url.split("/").length - 1];
  };

  useEffect(() => {
    if (
      localStorage.getItem("session") === null ||
      JSON.parse(localStorage.getItem("session")).company_id.charAt(0) !== "C"
    ) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_URL +
          "api/interview/" +
          JSON.parse(localStorage.getItem("session")).company_id +
          "/" +
          getID()
      )
      .then((res) => {
        setInterviewName(res.data.interview_name);
        setInterviewDateTime(
          res.data.interview_date + "T" + res.data.interview_time
        );
        setInterviewDuration(res.data.interview_duration);
      });
  }, []);

  const [questions, setQuestions] = useState([
    {
      question_id: "CQ1",
      isCoding: "C",
      question: "Question 1",
      difficulty: "Easy",
      likeRate: 87,
      isSolved: true,
      questionPoint: 12,
    },
    {
      question_id: "CQ2",
      isCoding: "C",
      question: "Question 2",
      difficulty: "Hard",
      likeRate: 87,
      isSolved: true,
      questionPoint: 12,
    },
    {
      question_id: "NCQ3",
      isCoding: "C",
      question: "Question 3",
      difficulty: "Medium",
      likeRate: 87,
      isSolved: true,
      questionPoint: 12,
    },
  ]);
  const [interviewName, setInterviewName] = useState("");
  const [interviewDateTime, setInterviewDateTime] = useState("");
  const [interviewDuration, setInterviewDuration] = useState(3);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [curQuestions, setCurQuestions] = useState([]);

  useEffect(() => {
    setTotalPages(Math.ceil(questions.length / 7));
    setCurQuestions(questions.slice(0, 7));
  }, [questions]);

  useEffect(() => {
    setCurQuestions(questions.slice((page - 1) * 7, 7 * page));
  }, [page]);

  const handleDialogCallback = (childData) => {
    setIsDialogOpen(childData);
  };
  const handleAddQuestion = () => {
    setIsDialogOpen(true);
    <AddQuestionDialog
      open={isDialogOpen}
      handleParentOpen={handleDialogCallback}
    ></AddQuestionDialog>;
  };

  const handleSaveUpdates = () => {
    alert("Saved updates");
  };

  return (
    <div>
      <NavbarCompany />
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
          <Grid item xs={5} style={{ paddingLeft: "20px", paddingTop: "20px" }}>
            <h1>Update Interview Information</h1>
            <div style={{ paddingTop: "10px" }}>
              Interview Name:
              <TextField
                variant="outlined"
                color="success"
                size="small"
                value={interviewName}
                onChange={(e) => setInterviewName(e.target.value)}
                style={{ width: "200px", marginLeft: "10px" }}
                placeholder={interviewName}
              ></TextField>
            </div>

            <br />
            <div>
              Date & Time:
              <TextField
                variant="outlined"
                color="success"
                size="small"
                value={interviewDateTime}
                onChange={(e) => setInterviewDateTime(e.target.value)}
                type="datetime-local"
                style={{ width: "200px", marginLeft: "32px" }}
                placeholder={new Date(interviewDateTime).toLocaleTimeString}
              ></TextField>
            </div>

            <br />
            <div>
              Duration:
              <TextField
                variant="outlined"
                color="success"
                size="small"
                value={interviewDuration}
                onChange={(e) => setInterviewDuration(e.target.value)}
                type="number"
                style={{ width: "200px", marginLeft: "58px" }}
                placeholder={interviewDuration}
              ></TextField>
            </div>

            <br />
            <Button onClick={() => handleSaveUpdates()}>Save</Button>
          </Grid>
          <Grid item xs={7} style={{ paddingTop: "20px" }}>
            <h1>Update Questions</h1>
            <AddCircleIcon
              fontSize="large"
              style={{ color: "#4DB6AC" }}
              onClick={() => handleAddQuestion()}
              cursor="pointer"
            ></AddCircleIcon>
            <AddQuestionDialog
              open={isDialogOpen}
              handleParentOpen={handleDialogCallback}
            />
            {questions.map((question, index) => (
              <div style={{ marginBottom: "10px" }} key={index}>
                <InterviewQuestionCard
                  question_id={question.question_id}
                  isCoding={question.isCoding}
                  title={question.question}
                  difficulty={question.difficulty}
                  questionPoint={question.questionPoint}
                />
              </div>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "10px",
              }}
            >
              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, page) => setPage(page)}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default InterviewUpdatePage;
