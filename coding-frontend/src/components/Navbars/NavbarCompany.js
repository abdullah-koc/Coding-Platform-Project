import React from "react";
import { makeStyles } from "@mui/styles";
import Colors from "../../utils/Colors";
import { Grid } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";

const useStyles = makeStyles({
  navbar: {
    backgroundColor: Colors.dark_color,
    height: "68px",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  navbarLogo: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "white",
    cursor: "pointer",
    marginLeft: "40px",
  },
  accountIcon: {
    padding: "12px 12px 8px 12px",
    borderRadius: "50%",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: Colors.secondary_dark_color,
    },
  },
});

const NavbarCompany = () => {
  const classes = useStyles();
  const goToMainPage = () => {};
  const goToAccountPage = () => {};
  const goToCreateInterviewPage = () => {
    window.location.href = "/create-interview";
  };

  return (
    <div className={classes.navbar}>
      <Grid container spacing={10}>
        <Grid item xs={3} style={{ display: "flex" }}>
          <div onClick={() => goToMainPage()} className={classes.navbarLogo}>
            Syncoder
          </div>
          <div
            style={{
              marginTop: "17px",
              marginLeft: "10px",
            }}
          >
            Company
          </div>
        </Grid>
        <Grid
          item
          xs={4}
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <div
            style={{ cursor: "pointer" }}
            onClick={() => goToCreateInterviewPage()}
          >
            Create Interview
          </div>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid
          item
          xs={2}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className={classes.accountIcon}
            onClick={() => goToAccountPage()}
          >
            <BusinessIcon />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default NavbarCompany;
