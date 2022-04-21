import React from "react";
import { makeStyles } from "@mui/styles";
import Colors from "../../utils/Colors";
import { Grid } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";

const useStyles = makeStyles({
  root: {
    height: "140px",
    width: "100%",
    background: Colors.dark_color,
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    color: "white",
    textAlign: "justify",
    fontSize: "90%",
  },
});

const handleApproveClick = () => {};
const handleRejectClick = () => {};

const CandidateCompany = ({
  companyName,
  companyEmail,
  companyPhone,
  companyAddress,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid
          item
          xs={2}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {companyName}
        </Grid>
        <Grid
          item
          xs={2}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {companyEmail}
        </Grid>
        <Grid
          item
          xs={2}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {companyPhone}
        </Grid>
        <Grid
          item
          xs={4}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {companyAddress}
        </Grid>
        <Grid
          item
          xs={2}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <div
            onClick={() => handleApproveClick()}
            style={{ cursor: "pointer", fontSize: "28px" }}
          >
            ✅
          </div>
          <div
            onClick={() => handleRejectClick()}
            style={{ cursor: "pointer", fontSize: "28px" }}
          >
            ❌
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default CandidateCompany;
