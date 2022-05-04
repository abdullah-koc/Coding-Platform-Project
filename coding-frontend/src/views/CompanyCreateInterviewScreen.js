import React, { useState, useEffect } from "react";
import { Button, Grid, Pagination, TextField } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddQuestionDialog from "../components/AddQuestionDialog";
import { useNavigate } from "react-router-dom";
import QuestionCard from "../components/UserMainScreenComponents/QuestionCard";
import InterviewQuestionCard from "../components/CompanyComponents/InterviewQuestionCard";
import NavbarCompany from "../components/Navbars/NavbarCompany";

export const CompanyCreateInterview = () => {
  let navigate = useNavigate();
  React.useEffect(() => {
    if (
      localStorage.getItem("session") === null ||
      JSON.parse(localStorage.getItem("session")).company_id.charAt(0) !== "C"
    ) {
      navigate("/");
    }
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
  const [interviewDuration, setInterviewDuration] = useState("");
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

  const handleCreateInterview = () => {
    if (questions.length === 0) {
      alert("Please add questions to the interview!");
    } else {
      // ...
    }
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
            <h1>Set Interview Information</h1>
            <div style={{ paddingTop: "10px" }}>
              Interview Name:
              <TextField
                variant="outlined"
                color="success"
                size="small"
                value={interviewName}
                onChange={(e) => setInterviewName(e.target.value)}
                style={{ width: "200px", marginLeft: "10px" }}
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
              ></TextField>
            </div>

            <br />
            <Button onClick={() => handleCreateInterview()}>
              Create Interview
            </Button>
          </Grid>
          <Grid item xs={7} style={{ paddingTop: "20px" }}>
            <h1>Questions</h1>
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

export default CompanyCreateInterview;
