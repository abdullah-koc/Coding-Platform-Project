import React, { useState, useEffect } from "react";
import { Grid, MenuItem, Select, Pagination, Button } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import NavbarUser from "../components/Navbars/NavbarUser";
import Colors from "../utils/Colors";
import QuestionCard from "../components/UserMainScreenComponents/QuestionCard";
import UserStatus from "../components/UserStatus";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProblemsScreen = () => {
  let navigate = useNavigate();

  useEffect(() => {
    if (
      localStorage.getItem("session") === null ||
      JSON.parse(localStorage.getItem("session")).person_id.charAt(0) !== "U"
    ) {
      navigate("/");
    }
  }, []);

  const [questionType, setQuestionType] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [curQuestions, setCurQuestions] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [solvedQuestionIDs, setSolvedQuestionIDs] = useState([]);
  useEffect(() => {
    axios.get(process.env.REACT_APP_URL + "api/question/all").then((res) => {
      let userQuestions = res.data.filter(
        (question) => question.editor_id !== null
      );
      setQuestions(userQuestions);
    });
  }, []);

  useEffect(() => {
    axios.get(process.env.REACT_APP_URL + "api/category/all").then((res) => {
      setAllCategories(res.data);
    });
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(questions.length / 7));
    setCurQuestions(questions.slice(0, 7));
  }, [questions]);

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
                  {allCategories.map((category, index) => (
                    <MenuItem key={index} value={category.category_name}>
                      {category.category_name}
                    </MenuItem>
                  ))}
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
                onClick={() => handleGoToQuestion(question.question_id)}
              >
                <QuestionCard
                  isCoding={
                    question.question_id.charAt(0) === "C" ? true : false
                  }
                  question={question.title}
                  difficulty={question.difficulty}
                  likeRate={
                    question.dislike_count === 0 && question.like_count === 0
                      ? 0
                      : (
                          100 *
                          (question.like_count /
                            (question.like_count + question.dislike_count))
                        ).toFixed(1)
                  }
                  isSolved={question.isSolved}
                  questionPoint={question.question_point}
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
