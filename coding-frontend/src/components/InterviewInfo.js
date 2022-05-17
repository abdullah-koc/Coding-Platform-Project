import React from "react";
import { makeStyles } from "@mui/styles";
import Colors from "../utils/Colors";
import { Grid } from "@mui/material";
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
  company_id,
}) => {
  let navigate = useNavigate();
  const classes = useStyles();

  var date = new Date(interview_date);
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid
          item
          xs={4}
          style={{
            display: "flex",
            alignItems: "center",
            paddingLeft: "20px",
            fontWeight: "bold",
          }}
        >
          {interview_name}
        </Grid>
        <Grid item xs={5} style={{ display: "flex", alignItems: "center" }}>
          Date: {date.toLocaleString()}
        </Grid>
        <Grid item xs={3} style={{ display: "flex", alignItems: "center" }}>
          Duration: {interview_duration} hours
        </Grid>
      </Grid>
    </div>
  );
};

export default InterviewInfo;
