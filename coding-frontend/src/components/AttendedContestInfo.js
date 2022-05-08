import React from "react";
import { makeStyles } from "@mui/styles";
import Colors from "../utils/Colors";
import { Button, Grid } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useNavigate } from "react-router-dom";
import ExampleImage from "../images/loginregisterimage.jpg";
import axios from "axios";

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
    if (new Date(start_date) <= new Date()) {
      navigate("/contests/" + contest_id);
    }
  };

  const handleCancelContest = () => {
    var userID = JSON.parse(localStorage.getItem("session")).person_id;
    var contestID = contest_id;
    axios
      .post(
        process.env.REACT_APP_URL +
          "api/contest/delete_contestant" +
          `/${contestID}/${userID}`
      )
      .then((res) => {
        alert("You have successfully withdrawn from the contest");
        window.location.reload();
      });
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid
          item
          xs={5}
          style={{ display: "flex", alignItems: "center", paddingLeft: "20px" }}
        >
          <img
            src={contest_photo === null ? ExampleImage : contest_photo}
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
        {new Date(start_date) > new Date() ? (
          <Grid
            item
            xs={1}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <RemoveCircleIcon
              onClick={() => handleCancelContest()}
              style={{
                color: "red",
                cursor: "pointer",
              }}
            />
          </Grid>
        ) : (
          <Grid item xs={1}></Grid>
        )}
        <Grid item xs={2} style={{ display: "flex", alignItems: "center" }}>
          <Button
            onClick={() => handleStartContest()}
            style={{
              backgroundColor:
                new Date(start_date) > new Date()
                  ? Colors.dark_color
                  : Colors.primary_color,
              cursor: "pointer",
              color: "white",
              width: "100px",
            }}
            disabled={new Date(start_date) > new Date()}
          >
            {new Date(start_date) <= new Date() &&
            new Date(end_date) >= new Date()
              ? "Start"
              : new Date(end_date) < new Date()
              ? "Results"
              : "Not Started"}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default AttendedContestInfo;
