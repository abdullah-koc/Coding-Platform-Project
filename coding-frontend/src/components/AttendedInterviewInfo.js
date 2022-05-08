import React from "react";
import { makeStyles } from "@mui/styles";
import Colors from "../utils/Colors";
import { Button, Grid } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
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

export const InterviewInfo = ({
  interview_id,
  interview_name,
  interview_date,
  interview_duration,
  user_id,
}) => {
  let navigate = useNavigate();
  const classes = useStyles();

  const handleGoToInterviewPage = () => {
    navigate(`/interviews/${interview_id}`);
  };

  var date = new Date(interview_date);
  var right_now = new Date();
  // find after 2 hours from the interview date
  var end_time = new Date(date.getTime() + interview_duration * 60 * 60 * 1000);

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid
          item
          xs={3}
          style={{ display: "flex", alignItems: "center", paddingLeft: "20px", fontWeight: "bold" }}
        >
          {interview_name}
        </Grid>
        <Grid item xs={4} style={{ display: "flex", alignItems: "center" }}>
          Date: {date.toLocaleString()}
        </Grid>
        <Grid item xs={3} style={{ display: "flex", alignItems: "center" }}>
          Duration: {interview_duration} hours
        </Grid>
        <Grid item xs={2} style={{ display: "flex", alignItems: "center" }}>
          <Button
            onClick={() => handleGoToInterviewPage()}
            style={{
              backgroundColor:
                new Date(interview_date) > new Date()
                  ? Colors.dark_color
                  : Colors.primary_color,
              cursor: "pointer",
              color: "white",
              width: "100px",
            }}
            disabled={new Date(interview_date) > new Date()}
          >
            {((right_now > date) && (right_now <= end_time))
              ? "Start"
              : new Date(date) < new Date(right_now)
              ? "Results"
              : "Not Started"}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default InterviewInfo;
