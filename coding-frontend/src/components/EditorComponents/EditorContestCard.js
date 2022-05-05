import React from "react";
import { makeStyles } from "@mui/styles";
import Colors from "../../utils/Colors";
import { Button, Grid } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ExampleImage from "../../images/loginregisterimage.jpg";

const useStyles = makeStyles({
  root: {
    height: "100px",
    width: "100%",
    background: Colors.light_grey_color,
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    marginBottom: "10px",
  },
});

const EditorContestCard = ({ contestName, startDate, endDate, contestPhoto, onClick }) => {
  const classes = useStyles();
  return (
    <div className={classes.root} onClick={onClick}>
      <Grid container>
        <Grid
          item
          xs={6}
          style={{ display: "flex", alignItems: "center", paddingLeft: "20px" }}
        >
          <img
            src={contestPhoto === null ? ExampleImage : contestPhoto}
            alt="logo"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              marginRight: "20px",
            }}
          />
          {contestName}
        </Grid>
        <Grid item xs={5} style={{ display: "flex", alignItems: "center" }}>
          {startDate} - {endDate}
        </Grid>
      </Grid>
    </div>
  );
};

export default EditorContestCard;
