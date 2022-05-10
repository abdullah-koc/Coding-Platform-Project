import React, { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Pagination,
  Select,
  TextField,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddQuestionDialog from "../components/AddQuestionDialog";
import { useNavigate } from "react-router-dom";
import InterviewQuestionCard from "../components/CompanyComponents/InterviewQuestionCard";
import NavbarCompany from "../components/Navbars/NavbarCompany";
import axios from "axios";
import Colors from "../utils/Colors";

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

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_URL +
          `api/interview/get_questions/${
            JSON.parse(localStorage.getItem("session")).company_id
          }/${getID()}`
      )
      .then((res) => {
        setQuestions(res.data);
      });
  }, []);

  const [questions, setQuestions] = useState([]);
  const [interviewName, setInterviewName] = useState("");
  const [interviewDateTime, setInterviewDateTime] = useState("");
  const [interviewDuration, setInterviewDuration] = useState(3);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [curQuestions, setCurQuestions] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [usersToShow, setUsersToShow] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const searchBarHandler = (e) => {
    let searchText = e.target.value;
    let filteredData = allUsers.filter((item) => {
      return item.nickname.toLowerCase().includes(searchText.toLowerCase());
    });
    setUsersToShow(filteredData);
  };

  useEffect(() => {
    axios.get(process.env.REACT_APP_URL + "api/user/all").then((res) => {
      //add checked attribute to all users
      let users = res.data.map((user) => {
        user.checked = false;
        return user;
      });
      axios
        .get(
          process.env.REACT_APP_URL +
            "api/interview/get_interviewees/" +
            JSON.parse(localStorage.getItem("session")).company_id +
            "/" +
            getID()
        )
        .then((response) => {
          console.log(response.data);
          users.forEach((user) => {
            response.data.forEach((interviewee) => {
              if (user.nickname === interviewee.nickname) {
                user.checked = true;
              }
            });
          });
          setAllUsers(users);
          setUsersToShow(users);
        });
    });
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(questions.length / 7));
    setCurQuestions(questions.slice(0, 7));
  }, [questions]);

  useEffect(() => {
    setCurQuestions(questions.slice((page - 1) * 7, 7 * page));
  }, [page]);

  const handleDialogCallback = (childData) => {
    setIsDialogOpen(childData);
    if (!childData) {
      window.location.reload();
    }
  };
  const handleAddQuestion = () => {
    setIsDialogOpen(true);
  };

  const handleAddUsers = () => {
    let newUsers = [];
    selectedUsers.forEach((user) => {
      newUsers.push(
        axios.post(
          process.env.REACT_APP_URL +
            "api/interview/add_interviewee/" +
            JSON.parse(localStorage.getItem("session")).company_id +
            "/" +
            getID() +
            "/" +
            user.nickname
        )
      );
    });
    axios.all(newUsers);
  };

  const handleSaveUpdates = () => {
    handleAddUsers();
    alert("Interview updated successfully");
    navigate("/company");
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
                placeholder={interviewDateTime}
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
            <div style={{ height: "40vh", overflowY: "scroll" }}>
              <h2>Set Attendees</h2>
              <TextField
                variant="outlined"
                color="success"
                size="small"
                placeholder="🔎 Search Users"
                style={{ marginBottom: "10px" }}
                onChange={searchBarHandler}
              />
              <br />
              {usersToShow.map((user, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={user.checked}
                      onChange={(e) => {
                        user.checked = e.target.checked;

                        if (e.target.checked) {
                          setSelectedUsers([...selectedUsers, user]);
                        } else {
                          setSelectedUsers(
                            selectedUsers.filter(
                              (u) => u.nickname !== user.nickname
                            )
                          );
                        }
                      }}
                      name={user.nickname}
                      color="primary"
                    />
                  }
                  label={user.nickname}
                />
              ))}
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
              interviewID={getID()}
            />
            {questions.map((question, index) => (
              <div style={{ marginBottom: "10px" }} key={index}>
                <InterviewQuestionCard
                  question_id={question.question_id}
                  isCoding={question.question_id.startsWith("C")}
                  title={question.title}
                  difficulty={question.difficulty}
                  questionPoint={question.question_point}
                  questionText={question.explanation}
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
