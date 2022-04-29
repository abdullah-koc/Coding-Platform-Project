import React from "react";
import { makeStyles } from "@mui/styles";
import Colors from "../../utils/Colors";
import { Grid } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

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

const NavbarEditor = () => {
  let navigate = useNavigate();
  const classes = useStyles();
  const goToMainPage = () => {
    navigate("/editor");
  };
  const goToAccountPage = () => {
    navigate("/editor-profile");
  };
  const goToCreateQuestionPage = () => {
    navigate("/editor");
  };
  const goToCreateContestPage = () => {
    navigate("/editor/contests");
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
            Editor
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
            onClick={() => goToCreateQuestionPage()}
          >
            Questions
          </div>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => goToCreateContestPage()}
          >
            Contests
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
            <AccountCircle />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default NavbarEditor;
