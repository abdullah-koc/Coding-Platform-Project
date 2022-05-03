import React from 'react'
import { makeStyles } from "@mui/styles";
import Colors from "../../utils/Colors";
import { Grid } from "@mui/material";

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
    interview_duration
}) => {
    const classes = useStyles();
    return (
      <div className={classes.root}>
        <Grid container>
          <Grid
            item
            xs={4}
            style={{ display: "flex", alignItems: "center", paddingLeft: "20px" }}
          >
            Title: {interview_name}
          </Grid>
          <Grid item xs={4} style={{ display: "flex", alignItems: "center" }}>
            Date: {interview_date}
          </Grid>
          <Grid item xs={4} style={{ display: "flex", alignItems: "center" }}>
            Duration: {interview_duration} hours
          </Grid>
        </Grid>
      </div>
    );
}

export default InterviewCard;