import React, { useState } from "react";
import { TextField, Grid, MenuItem, Select, Button } from "@mui/material";
import NavbarUser from "../components/Navbars/NavbarUser";
import Colors from "../utils/Colors";
import QuestionCard from "../components/UserMainScreenComponents/QuestionCard";
import { style } from "@mui/system";

const ProblemsScreen = () => {
  const [questionType, setQuestionType] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [questions, setQuestions] = useState([
    {
      isCoding: "C",
      question: "What is the output of the following code?",
      difficulty: "Easy",
      likeRate: 87,
      isSolved: true,
      questionPoint: 12,
    },
    {
      isCoding: "C",
      question: "What is the output of the following code?",
      difficulty: "Easy",
      likeRate: 87,
      isSolved: true,
      questionPoint: 12,
    },
    {
      isCoding: "C",
      question: "What is the output of the following code?",
      difficulty: "Easy",
      likeRate: 87,
      isSolved: true,
      questionPoint: 12,
    },
  ]);
  return (
    <div>
      <NavbarUser />
      <div style={{ padding: "60px", paddingTop: "30px" }}>
        <Grid container spacing={4}>
          <Grid item xs={9}>
            <h1 style={{}}>Problems</h1>
            <Grid container>
              <Grid item xs={3}>
                <Select
                  value={questionType}
                  style={{
                    marginBottom: "10px",
                    width: "200px",
                    backgroundColor: Colors.dark_color,
                    color: Colors.light_grey_color,
                  }}
                  label=""
                  onChange={(e) => setQuestionType(e.target.value)}
                >
                  <MenuItem value={"All"}>All</MenuItem>
                  <MenuItem value={"Coding Question"}>Coding Question</MenuItem>
                  <MenuItem value={"Noncoding Question"}>
                    Noncoding Question
                  </MenuItem>
                </Select>
              </Grid>
              <Grid item xs={3}>
                <Select
                  value={difficulty}
                  style={{
                    marginBottom: "10px",
                    width: "200px",
                    backgroundColor: Colors.dark_color,
                    color: Colors.light_grey_color,
                  }}
                  label=""
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  <MenuItem value={"All"}>All</MenuItem>
                  <MenuItem value={"Easy"}>Easy</MenuItem>
                  <MenuItem value={"Medium"}>Medium</MenuItem>
                  <MenuItem value={"Hard"}>Hard</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={3}>
                <Select
                  value={category}
                  style={{
                    marginBottom: "10px",
                    width: "200px",
                    backgroundColor: Colors.dark_color,
                    color: Colors.light_grey_color,
                  }}
                  label=""
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <MenuItem value={"All"}>All</MenuItem>
                  <MenuItem value={"Binary Tree"}>Binary Tree</MenuItem>
                  <MenuItem value={"Heap"}>Heap</MenuItem>
                  <MenuItem value={"Dynamic Programming"}>
                    Dynamic Programming
                  </MenuItem>
                </Select>
              </Grid>
              <Grid item xs={3}>
                <Select
                  value={status}
                  fullWidth
                  style={{
                    marginBottom: "10px",
                    width: "200px",
                    backgroundColor: Colors.dark_color,
                    color: Colors.light_grey_color,
                  }}
                  label=""
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value={"All"}>All</MenuItem>
                  <MenuItem value={"Solved"}>Solved</MenuItem>
                  <MenuItem value={"Not Solved"}>Not Solved</MenuItem>
                </Select>
              </Grid>
            </Grid>

            {questions.map((question, index) => (
              <div
                key={index}
                style={{ paddingRight: "40px", marginBottom: "10px" }}
              >
                <QuestionCard
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
          <Grid item xs={3}></Grid>
        </Grid>
        <div></div>
      </div>
    </div>
  );
};

export default ProblemsScreen;
