import React from "react";
import { makeStyles } from "@mui/styles";
import Colors from "../utils/Colors";
import { Grid } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ExampleImage from "../images/loginregisterimage.jpg";

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
            src={contest_photo}
            alt="logo"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              marginRight: "20px",
            }}
          />
          Example Contest Name
        </Grid>
        <Grid item xs={3} style={{ display: "flex", alignItems: "center" }}>
          {start_date} - {end_date}
        </Grid>
        <Grid item xs={3} style={{ display: "flex", alignItems: "center" }}>
          {contest_name}
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
