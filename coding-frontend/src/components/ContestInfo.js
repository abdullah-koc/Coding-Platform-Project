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

const ContestInfo = () => {
  const classes = useStyles();
  const handleJoinContest = () => {};
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid
          item
          xs={4}
          style={{ display: "flex", alignItems: "center", paddingLeft: "20px" }}
        >
          <img
            src={ExampleImage}
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
          12.12.2022 - 12.12.2023
        </Grid>
        <Grid item xs={3} style={{ display: "flex", alignItems: "center" }}>
          Ariel, Meta, Google
        </Grid>
        <Grid item xs={2} style={{ display: "flex", alignItems: "center" }}>
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
