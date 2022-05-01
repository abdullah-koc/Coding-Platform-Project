import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import Colors from "../utils/Colors";
import { Grid, Button } from "@mui/material";
import CandidateEditor from "../components/AdminComponents/CandidateEditor";
import { useNavigate } from "react-router-dom";
import CandidateCompany from "../components/AdminComponents/CandidateCompany";
import axios from "axios";

const useStyles = makeStyles({
  navbar: {
    backgroundColor: Colors.dark_color,
    height: "68px",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    color: "white",
    fontSize: "2rem",
    fontWeight: "bold",
  },
});

const AdminScreen = () => {
  const classes = useStyles();
  let navigate = useNavigate();

  React.useEffect(() => {
    if (
      localStorage.getItem("session") === null ||
      JSON.parse(localStorage.getItem("session")).admin_id.charAt(0) !== "A"
    ) {
      navigate("/");
    }
  }, []);

  const [candidateEditorList, setCandidateEditorList] = React.useState([]);
  const [candidateCompanyList, setCandidateCompanyList] = React.useState([]);

  const handleLogOutAdmin = () => {
    localStorage.removeItem("session");
    navigate("/");
  };
  return (
    <div>
      <div className={classes.navbar}>
        <Grid container>
          <Grid
            item
            xs={3}
            style={{ display: "flex", justifyContent: "center" }}
          >
            Syncoder Admin Panel{" "}
          </Grid>
          <Grid item xs={7}></Grid>
          <Grid
            item
            xs={2}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              variant="contained"
              style={{
                width: "160px",
                fontSize: "50%",
                background: "white",
                color: Colors.dark_color,
              }}
              onClick={() => handleLogOutAdmin()}
            >
              Log out
            </Button>
          </Grid>
        </Grid>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={5}>
          <h2 style={{ display: "flex", justifyContent: "center" }}>
            Candidate Editor List
          </h2>
          <Grid
            container
            style={{
              fontSize: "120%",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            <Grid
              item
              xs={4}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Editor Name
            </Grid>
            <Grid
              item
              xs={3}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Editor Nickname
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
              CV Link
            </Grid>
            <Grid
              item
              xs={3}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Operations
            </Grid>
          </Grid>
          <div style={{ overflowY: "scroll", height: "80vh" }}>
            <div style={{ marginBottom: "10px" }}>
              <CandidateEditor
                editorName={"ahmet"}
                editorNickname={"testnickname"}
                editorCV={"https://www.google.com"}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <CandidateEditor
                editorName={"ahmet"}
                editorNickname={"testnickname"}
                editorCV={"https://www.google.com"}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <CandidateEditor
                editorName={"ahmet"}
                editorNickname={"testnickname"}
                editorCV={"https://www.google.com"}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <CandidateEditor
                editorName={"ahmet"}
                editorNickname={"testnickname"}
                editorCV={"https://www.google.com"}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <CandidateEditor
                editorName={"ahmet"}
                editorNickname={"testnickname"}
                editorCV={"https://www.google.com"}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <CandidateEditor
                editorName={"ahmet"}
                editorNickname={"testnickname"}
                editorCV={"https://www.google.com"}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <CandidateEditor
                editorName={"ahmet"}
                editorNickname={"testnickname"}
                editorCV={"https://www.google.com"}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <CandidateEditor
                editorName={"ahmet"}
                editorNickname={"testnickname"}
                editorCV={"https://www.google.com"}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <CandidateEditor
                editorName={"ahmet"}
                editorNickname={"testnickname"}
                editorCV={"https://www.google.com"}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <CandidateEditor
                editorName={"ahmet"}
                editorNickname={"testnickname"}
                editorCV={"https://www.google.com"}
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={7}>
          <h2 style={{ display: "flex", justifyContent: "center" }}>
            Candidate Company List
          </h2>
          <Grid
            container
            style={{
              fontSize: "120%",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            <Grid
              item
              xs={2}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Company Name
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
              Company Email
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
              Company Phone
            </Grid>
            <Grid
              item
              xs={4}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Company Address
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
              Operations
            </Grid>
          </Grid>
          <div style={{ overflowY: "scroll", height: "80vh" }}>
            <div style={{ marginBottom: "10px" }}>
              <CandidateCompany
                companyName={"Google"}
                companyEmail={"google@google.com"}
                companyAddress={
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione nulla sequi, debitis atque eveniet minima reprehenderit natus sunt eligendi aspernatur."
                }
                companyPhone={"+90 554 554 55 55"}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <CandidateCompany
                companyName={"Google"}
                companyEmail={"google@google.com"}
                companyAddress={
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione nulla sequi, debitis atque eveniet minima reprehenderit natus sunt eligendi aspernatur."
                }
                companyPhone={"+90 554 554 55 55"}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <CandidateCompany
                companyName={"Google"}
                companyEmail={"google@google.com"}
                companyAddress={
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione nulla sequi, debitis atque eveniet minima reprehenderit natus sunt eligendi aspernatur."
                }
                companyPhone={"+90 554 554 55 55"}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <CandidateCompany
                companyName={"Google"}
                companyEmail={"google@google.com"}
                companyAddress={
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione nulla sequi, debitis atque eveniet minima reprehenderit natus sunt eligendi aspernatur."
                }
                companyPhone={"+90 554 554 55 55"}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <CandidateCompany
                companyName={"Google"}
                companyEmail={"google@google.com"}
                companyAddress={
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione nulla sequi, debitis atque eveniet minima reprehenderit natus sunt eligendi aspernatur."
                }
                companyPhone={"+90 554 554 55 55"}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <CandidateCompany
                companyName={"Google"}
                companyEmail={"google@google.com"}
                companyAddress={
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione nulla sequi, debitis atque eveniet minima reprehenderit natus sunt eligendi aspernatur."
                }
                companyPhone={"+90 554 554 55 55"}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <CandidateCompany
                companyName={"Google"}
                companyEmail={"google@google.com"}
                companyAddress={
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione nulla sequi, debitis atque eveniet minima reprehenderit natus sunt eligendi aspernatur."
                }
                companyPhone={"+90 554 554 55 55"}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <CandidateCompany
                companyName={"Google"}
                companyEmail={"google@google.com"}
                companyAddress={
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione nulla sequi, debitis atque eveniet minima reprehenderit natus sunt eligendi aspernatur."
                }
                companyPhone={"+90 554 554 55 55"}
              />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminScreen;
