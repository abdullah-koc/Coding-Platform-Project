import React from "react";
import { makeStyles } from "@mui/styles";
import Colors from "../../utils/Colors";
import { Button, Grid } from "@mui/material";

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

const ContestInfoDonation = ({
  contest_id,
  contest_name,
  contest_photo,
  start_date,
  end_date,
  prize,
  creation_date,
  donated_amount,
}) => {
  const classes = useStyles();
  const handleDonateContest = () => {
    if (donated_amount === 0) {
      window.location.href = `/contest/${contest_id}/donate`;
    } else {
      alert("You have already donated to this contest");
    }
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
        <Grid item xs={2} style={{ display: "flex", alignItems: "center" }}>
          <Button
            onClick={() => handleDonateContest(contest_id)}
            disabled={donated_amount !== 0}
          >
            {donated_amount === 0 && (
              <div>
                <span>Donate</span>
              </div>
            )}
            {donated_amount !== 0 && (
              <div>
                <span style={{ color: "green" }}>Donated</span>
              </div>
            )}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ContestInfoDonation;
