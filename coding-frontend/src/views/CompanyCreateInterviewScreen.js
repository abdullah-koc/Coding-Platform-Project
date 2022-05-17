import React, { useState, useEffect } from "react";
import { Button, Grid, TextField } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddQuestionDialog from "../components/AddQuestionDialog";
import { useNavigate } from "react-router-dom";
import QuestionCard from "../components/UserMainScreenComponents/QuestionCard";
import InterviewQuestionCard from "../components/CompanyComponents/InterviewQuestionCard";
import NavbarCompany from "../components/Navbars/NavbarCompany";
import axios from "axios";
import Colors from "../utils/Colors";

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

  const [interviewName, setInterviewName] = useState("");
  const [interviewDateTime, setInterviewDateTime] = useState("");
  const [interviewDuration, setInterviewDuration] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [curQuestions, setCurQuestions] = useState([]);

  const handleCreateInterview = () => {
    if (
      interviewName === "" ||
      interviewDateTime === "" ||
      interviewDuration === 0
    ) {
      alert("Please fill all the fields!");
    } else {
      if (new Date(interviewDateTime) < new Date()) {
        alert("Please enter a valid date!");
        return;
      }
      axios
        .post(process.env.REACT_APP_URL + "api/interview/create", {
          company_id: JSON.parse(localStorage.getItem("session")).company_id,
          interview_name: interviewName,
          interview_date: new Date(interviewDateTime),
          interview_duration: interviewDuration,
        })
        .then((res) => {
          alert(
            "Interview created successfully! Please add questions from the update interview page."
          );
          navigate("/company");
        })
        .catch((err) => {
          alert("Something went wrong!");
        });
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
          <Grid
            item
            xs={12}
            style={{
              paddingLeft: "20px",
              paddingTop: "20px",
            }}
          >
            <h1
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Set Interview Information
            </h1>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button onClick={() => handleCreateInterview()}>
                Create Interview
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default CompanyCreateInterview;
