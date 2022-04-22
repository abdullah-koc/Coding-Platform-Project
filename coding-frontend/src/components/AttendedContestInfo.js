import React from "react";
import { makeStyles } from "@mui/styles";
import Colors from "../utils/Colors";
import { Button, Grid } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    height: "100px",
    width: "100%",
    background: Colors.light_grey_color,
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
  },
});

const AttendedContestInfo = ({
  contest_id,
  contest_name,
  contest_photo,
  start_date,
  end_date,
  prize,
  creation_date,
}) => {
  const classes = useStyles();

  let navigate = useNavigate();
  const handleStartContest = () => {
    navigate("/contests/" + contest_id);
  };

  const handleCancelContest = () => {};

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid
          item
          xs={5}
          style={{ display: "flex", alignItems: "center", paddingLeft: "20px" }}
        >
          <img
            src={contest_photo}
            alt="logo"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              marginRight: "20px",
            }}
          />
          {contest_name}
        </Grid>
        <Grid item xs={4} style={{ display: "flex", alignItems: "center" }}>
          {start_date} - {end_date}
        </Grid>
        <Grid item xs={1} style={{ display: "flex", alignItems: "center" }}>
          <RemoveCircleIcon
            onClick={() => handleCancelContest()}
            style={{
              color: "red",
              cursor: "pointer",
            }}
          />
        </Grid>
        <Grid item xs={2} style={{ display: "flex", alignItems: "center" }}>
          <Button
            onClick={() => handleStartContest()}
            style={{
              backgroundColor: Colors.primary_color,
              cursor: "pointer",
              color: "white",
            }}
          >
            Start
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default AttendedContestInfo;
