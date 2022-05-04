import React from "react";
import { makeStyles } from "@mui/styles";
import Colors from "../../utils/Colors";
import { Button, Grid } from "@mui/material";
import axios from "axios";
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

const ContestInfoDonation = ({
  contest_id,
  contest_name,
  contest_photo,
  start_date,
  end_date,
  prize,
  creation_date,
}) => {
  let navigate = useNavigate();
  const classes = useStyles();
  const [donationAmount, setDonationAmount] = React.useState(0);

  React.useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_URL +
          "api/company/get/donation/" +
          JSON.parse(localStorage.getItem("session")).company_id +
          "/" +
          contest_id
      )
      .then((res) => {
        setDonationAmount(res.data);
      });
  }, [contest_id]);

  const handleDonateContest = () => {
    if (donationAmount === 0) {
      navigate(`/contest/${contest_id}/donate`);
    } else {
      alert("You have already donated to this contest");
    }
  };
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid
          item
          xs={3}
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
            disabled={donationAmount !== 0}
          >
            {donationAmount === 0 && (
              <div>
                <span>Support</span>
              </div>
            )}
            {donationAmount !== 0 && (
              <div>
                <span style={{ color: "green" }}>Supported</span>
              </div>
            )}
          </Button>
        </Grid>
        {donationAmount !== 0 && (
          <Grid item xs={2} style={{ display: "flex", alignItems: "center" }}>
            {donationAmount} TL
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default ContestInfoDonation;
