import React, { useState, useEffect } from "react";
import {
  Grid,
  MenuItem,
  Select,
  Pagination,
  Button,
  TextField,
} from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import NavbarUser from "../components/Navbars/NavbarUser";
import Colors from "../utils/Colors";
import QuestionCard from "../components/UserMainScreenComponents/QuestionCard";
import UserStatus from "../components/UserStatus";
import { useNavigate } from "react-router-dom";
import Slider from "@mui/material/Slider";
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

  const [questionType, setQuestionType] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [curQuestions, setCurQuestions] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [temp, setTemp] = useState([]);
  const [value, setValue] = useState([0, 100]);
  const [searchText, setSearchText] = useState("all");

  useEffect(() => {
    let arr = [];
    questions.map((q) => {
      arr.push(
        axios.get(
          process.env.REACT_APP_URL +
            `api/question/get_if_user_solved/${q.question_id}/${
              JSON.parse(localStorage.getItem("session")).person_id
            }`
        )
      );
    });
    axios.all(arr).then(
      axios.spread((...res) => {
        setCurQuestions(
          res
            .map((r, i) => {
              return {
                ...questions[i],
                is_solved: r.data,
              };
            })
            .slice((page - 1) * 7, 7 * page)
        );
      })
    );
  }, [questions]);

  const [marks, setMarks] = useState([
    {
      value: 0,
      label: "0 Points",
    },
    {
      value: 100,
      label: "100 Points",
    },
  ]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSearchText(searchText === "" ? "all" : searchText);
    let val = searchText === "" ? "all" : searchText;
    axios
      .get(
        process.env.REACT_APP_URL +
          "api/question/get_filtered_questions/" +
          JSON.parse(localStorage.getItem("session")).person_id +
          "/" +
          category +
          "/" +
          difficulty +
          "/" +
          questionType +
          "/" +
          status +
          "/" +
          value[0] +
          "/" +
          value[1] +
          "/" +
          val
      )
      .then((res) => {
        let userQuestions = res.data.filter(
          (question) =>
            question.editor_id !== null && question.is_contest === false
        );
        setQuestions(userQuestions);
      })
      .catch((err) => {
        alert("Problem occured!");
      });
  };

  const searchBarHandler = (e) => {
    setSearchText(e.target.value === "" ? "all" : e.target.value);
    let val = e.target.value === "" ? "all" : e.target.value;
    axios
      .get(
        process.env.REACT_APP_URL +
          "api/question/get_filtered_questions/" +
          JSON.parse(localStorage.getItem("session")).person_id +
          "/" +
          category +
          "/" +
          difficulty +
          "/" +
          questionType +
          "/" +
          status +
          "/" +
          value[0] +
          "/" +
          value[1] +
          "/" +
          val
      )
      .then((res) => {
        let userQuestions = res.data.filter(
          (question) =>
            question.editor_id !== null && question.is_contest === false
        );
        setQuestions(userQuestions);
      })
      .catch((err) => {
        alert("Problem occured!");
      });
  };

  useEffect(() => {
    setSearchText(searchText === "" ? "all" : searchText);
    let val = searchText === "" ? "all" : searchText;
    axios
      .get(
        process.env.REACT_APP_URL +
          "api/question/get_filtered_questions/" +
          JSON.parse(localStorage.getItem("session")).person_id +
          "/" +
          category +
          "/" +
          difficulty +
          "/" +
          questionType +
          "/" +
          status +
          "/" +
          value[0] +
          "/" +
          value[1] +
          "/" +
          val
      )
      .then((res) => {
        let userQuestions = res.data.filter(
          (question) =>
            question.editor_id !== null && question.is_contest === false
        );
        setQuestions(userQuestions);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [questionType, difficulty, category, status]);

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

  function valuetext(value) {
    return `${value} Points`;
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
                  <MenuItem value={"all"}>All</MenuItem>
                  <MenuItem value={"CQ"}>Coding Question</MenuItem>
                  <MenuItem value={"NCQ"}>Noncoding Question</MenuItem>
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
                  <MenuItem value={"all"}>All</MenuItem>
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
                  <MenuItem value={"all"}>All</MenuItem>
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
                  <MenuItem value={"all"}>All</MenuItem>
                  <MenuItem value={"1"}>Solved</MenuItem>
                  <MenuItem value={"0"}>Not Solved</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  color="success"
                  size="small"
                  placeholder="🔎 Search Questions"
                  style={{ marginBottom: "10px" }}
                  onChange={searchBarHandler}
                />
              </Grid>
              <Grid item xs={6} style={{ paddingRight: "50px" }}>
                <Slider
                  getAriaLabel={() => "Point range"}
                  value={value}
                  onChange={handleChange}
                  marks={marks}
                  style={{ color: Colors.dark_color }}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                />
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
                  isSolved={question.is_solved}
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
