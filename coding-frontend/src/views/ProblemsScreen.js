import React, { useState, useEffect } from "react";
import { Grid, MenuItem, Select, Pagination, Button } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import NavbarEditor from "../components/Navbars/NavbarEditor";
import Colors from "../utils/Colors";
import QuestionCard from "../components/UserMainScreenComponents/QuestionCard";
import UserStatus from "../components/UserStatus";
import { useNavigate } from "react-router-dom";

const ProblemsScreen = () => {
  let navigate = useNavigate();

  const [questionType, setQuestionType] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [questions, setQuestions] = useState([
    {
      id: "CQ1",
      isCoding: "C",
      question: "What is the output of the following code?",
      difficulty: "Easy",
      likeRate: 87,
      isSolved: true,
      questionPoint: 12,
    },
    {
      id: "CQ2",
      isCoding: "C",
      question: "What is the output of the following code?",
      difficulty: "Easy",
      likeRate: 59,
      isSolved: true,
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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [curQuestions, setCurQuestions] = useState([]);

  useEffect(() => {
    setTotalPages(Math.ceil(questions.length / 7));
    setCurQuestions(questions.slice(0, 7));
  }, []);

  useEffect(() => {
    setCurQuestions(questions.slice((page - 1) * 7, 7 * page));
  }, [page]);

  const handleGoToQuestion = (id) => {
    if (id.startsWith("CQ")) {
      navigate("/cquestion/" + id);
    } else {
      navigate("/ncquestion/" + id);
    }
  };

  function ascLikeSort() {
    const sortedData = [...questions].sort((a, b) => {
      return a.likeRate > b.likeRate ? 1 : -1;
    });
    setQuestions(sortedData);
    setCurQuestions(sortedData.slice((page - 1) * 7, 7 * page));
  }

  function descLikeSort() {
    const sortedData = [...questions].sort((a, b) => {
      return a.likeRate < b.likeRate ? 1 : -1;
    });
    setQuestions(sortedData);
    setCurQuestions(sortedData.slice((page - 1) * 7, 7 * page));
  }

  function ascPointSort() {
    const sortedData = [...questions].sort((a, b) => {
      return a.questionPoint > b.questionPoint ? 1 : -1;
    });
    setQuestions(sortedData);
    setCurQuestions(sortedData.slice((page - 1) * 7, 7 * page));
  }

  function descPointSort() {
    const sortedData = [...questions].sort((a, b) => {
      return a.questionPoint < b.questionPoint ? 1 : -1;
    });
    setQuestions(sortedData);
    setCurQuestions(sortedData.slice((page - 1) * 7, 7 * page));
  }

  return (
    <div>
      <NavbarEditor />
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
                style={{
                  display: "flex",
                  alignItems: "center",
                  zIndex: 0,
                  paddingLeft: "5%",
                }}
              >
                Like Rate
                <div style={{ zIndex: 1 }}>
                  <ArrowDropUpIcon
                    style={{ cursor: "pointer", marginBottom: "-10px" }}
                    onClick={ascLikeSort}
                  />
                  <ArrowDropDownIcon
                    style={{ cursor: "pointer", marginTop: "-10px" }}
                    onClick={descLikeSort}
                  />
                </div>
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
                Status
              </Grid>
              <Grid
                item
                xs={1}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: "2%",
                }}
              >
                Point
                <div style={{ zIndex: 1 }}>
                  <ArrowDropUpIcon
                    style={{ cursor: "pointer", marginBottom: "-10px" }}
                    onClick={ascPointSort}
                  />
                  <ArrowDropDownIcon
                    style={{ cursor: "pointer", marginTop: "-10px" }}
                    onClick={descPointSort}
                  />
                </div>
              </Grid>
            </Grid>

            {curQuestions.map((question, index) => (
              <div
                key={index}
                style={{ paddingRight: "40px", marginBottom: "10px" }}
                onClick={() => handleGoToQuestion(question.id)}
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
