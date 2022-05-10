import React from "react";
import { makeStyles } from "@mui/styles";
import Colors from "../utils/Colors";
import { Button, Grid } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
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

const ContestInfo = ({
  contest_id,
  contest_name,
  contest_photo,
  start_date,
  end_date,
  prize,
  creation_date,
}) => {
  const classes = useStyles();
  const handleJoinContest = () => {
    var userID = JSON.parse(localStorage.getItem("session")).person_id;
    var contestID = contest_id;
    axios
      .post(
        process.env.REACT_APP_URL +
          "api/contest/insert_contestant" +
          `/${contestID}/${userID}`
      )
      .then((res) => {
        alert("You have successfully joined the contest");
        window.location.reload();
      });
  };
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid
          item
          xs={6}
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
        <Grid item xs={5} style={{ display: "flex", alignItems: "center" }}>
          {start_date} - {end_date}
        </Grid>
        <Grid item xs={1} style={{ display: "flex", alignItems: "center" }}>
          <AddCircleIcon
            onClick={() => handleJoinContest()}
            style={{
              color: Colors.primary_color,
              cursor: "pointer",
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ContestInfo;
