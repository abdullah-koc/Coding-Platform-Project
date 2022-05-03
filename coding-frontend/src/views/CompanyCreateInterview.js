import React, { useState, useEffect } from "react";
import { Button, Grid, TextField } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddQuestionDialog from "../components/AddQuestionDialog";
import { useNavigate } from "react-router-dom";
import QuestionCard from "../components/UserMainScreenComponents/QuestionCard";
import InterviewQuestionCard from "../components/CompanyComponents/InterviewQuestionCard";

export const CompanyCreateInterview = () => {
  let navigate = useNavigate();

  const [questions, setQuestions] = useState([
    {
      isCoding: "C",
      question: "Question 1",
      difficulty: "Easy",
      likeRate: 87,
      isSolved: true,
      questionPoint: 12,
    },
    {
      isCoding: "C",
      question: "Question 2",
      difficulty: "Hard",
      likeRate: 87,
      isSolved: true,
      questionPoint: 12,
    },
    {
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
  const handleGoToQuestion = (id) => {
    if (id.startsWith("CQ")) {
      navigate("/company/:cid/c/" + id);
    } else {
      navigate("/company/:cid/nc/" + id);
    }
  };
  const handleCreateInterview = () => {
    if (questions.length === 0) {
      alert("Please add questions to the interview!");
    }
    else {
      // ...
    }
  }

  return (
    <div style={{ padding: "20px" }}>
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
          <Button onClick={() => handleCreateInterview()}>Create Interview</Button>
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
          <Grid
            container
            style={{
              height: "600px",
              overflowX: "auto",
              overflowY: "auto",
              paddingTop: "10px",
            }}
          >
            {questions.map((question, index) => (
              <div style={{ marginBottom: "10px" }} key={index}>
                <InterviewQuestionCard
                  isCoding={question.isCoding}
                  title={question.question}
                  difficulty={question.difficulty}
                  questionPoint={question.questionPoint}
                />
              </div>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default CompanyCreateInterview;
