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

  React.useEffect(() => {
    axios.get(process.env.REACT_APP_URL + "api/editor/all").then((res) => {
      let allEditors = res.data;
      var filtered = allEditors.filter(
        (editor) => editor.admin_id === null && editor.is_approved === false
      );
      setCandidateEditorList(filtered);
    });
  }, []);
  React.useEffect(() => {
    axios.get(process.env.REACT_APP_URL + "api/company/all").then((res) => {
      console.log(res.data);
      let allCompanies = res.data;
      var filtered = allCompanies.filter(
        (company) => company.admin_id === null && company.is_approved === false
      );
      setCandidateCompanyList(filtered);
    });
  }, []);
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
            {candidateEditorList.map((editor, index) => (
              <div style={{ marginBottom: "10px" }} key={index}>
                <CandidateEditor
                  editorId={editor.person_id}
                  editorName={editor.full_name}
                  editorNickname={editor.nickname}
                  editorCV={editor.cv}
                />
              </div>
            ))}
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
            {candidateCompanyList.map((company, index) => (
              <div style={{ marginBottom: "10px" }} key={index}>
                <CandidateCompany
                  companyId={company.company_id}
                  companyName={company.company_name}
                  companyEmail={company.company_email}
                  companyAddress={company.company_address}
                  companyPhone={company.company_phone}
                />
              </div>
            ))}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminScreen;
