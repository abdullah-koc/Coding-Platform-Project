import React from "react";
import { makeStyles } from "@mui/styles";
import Colors from "../../utils/Colors";
import { Grid } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    height: "60px",
    width: "100%",
    background: Colors.dark_color,
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    color: "white",
    cursor: "pointer",
  },
});

export const InterviewCard = ({
  interview_id,
  interview_name,
  interview_date,
  interview_duration,
}) => {
  let navigate = useNavigate();
  const classes = useStyles();
  const handleRemoveInterview = () => {
    axios
      .post(
        process.env.REACT_APP_URL +
          "api/interview/delete/" +
          interview_id +
          "/" +
          JSON.parse(localStorage.getItem("session")).company_id
      )
      .then((res) => {
        alert("Interview deleted successfully");
        window.location.reload();
      })
      .catch((err) => {
        alert("Something went wrong");
      });
  };
  const handleGoToInterviewUpdatePage = () => {
    navigate(`/interview/${interview_id}`);
  };
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid
          item
          xs={4}
          style={{ display: "flex", alignItems: "center", paddingLeft: "20px" }}
          onClick={() => handleGoToInterviewUpdatePage()}
        >
          Title: {interview_name}
        </Grid>
        <Grid
          item
          xs={4}
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => handleGoToInterviewUpdatePage()}
        >
          Date: {interview_date}
        </Grid>
        <Grid
          item
          xs={3}
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => handleGoToInterviewUpdatePage()}
        >
          Duration: {interview_duration} hours
        </Grid>
        <Grid
          item
          xs={1}
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => handleRemoveInterview()}
        >
          <RemoveCircleIcon style={{ color: "#F44336" }}></RemoveCircleIcon>
        </Grid>
      </Grid>
    </div>
  );
};

export default InterviewCard;
