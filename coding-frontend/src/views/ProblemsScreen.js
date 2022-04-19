import React, { useState, useEffect } from "react";
import { Grid, MenuItem, Select, Pagination } from "@mui/material";
import NavbarUser from "../components/Navbars/NavbarUser";
import Colors from "../utils/Colors";
import QuestionCard from "../components/UserMainScreenComponents/QuestionCard";
import UserStatus from "../components/UserStatus";

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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [curQuestions, setCurQuestions] = useState([]);

  useEffect(() => {
    setTotalPages(Math.ceil(questions.length / 7));
    setCurQuestions(questions.slice(0, 7));
  }, [] );

  useEffect(() => {
    setCurQuestions(questions.slice((page - 1) * 7, 7 * page));
  }, [page]);

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
        <Grid container spacing={4}>
          <Grid item xs={9}>
            <h1>Problems</h1>
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
            <Grid
              container
              style={{ paddingBottom: "10px", paddingTop: "10px" }}
            >
              <Grid
                item
                xs={1}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Type
              </Grid>
              <Grid
                item
                xs={4}
                style={{ display: "flex", alignItems: "center" }}
              >
                Title
              </Grid>
              <Grid
                item
                xs={2}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Difficulty
              </Grid>
              <Grid
                item
                xs={1}
                style={{ display: "flex", alignItems: "center",  paddingLeft: "5%" }}
              >
                Like Rate
              </Grid>
              <Grid
                item
                xs={2}
                style={{ display: "flex", alignItems: "center",justifyContent: "center",  }}
              >
                Status
              </Grid>
              <Grid
                item
                xs={1}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingLeft: "2%" }}
              >
                Point
              </Grid>
            </Grid>

            {curQuestions.map((question, index) => (
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
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, page) => setPage(page)}
              />
            </div>
          </Grid>
          <Grid item xs={3}>
            <Grid container>
              <Grid item xs={12} style={{ paddingTop: "60px" }}>
                <UserStatus />
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
          </Grid>
        </Grid>
        <div></div>
      </div>
    </div>
  );
};

export default ProblemsScreen;
