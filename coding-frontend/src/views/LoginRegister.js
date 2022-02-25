import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { TextField, InputAdornment, Grid, Button } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LogRegImage from "../images/loginregisterimage.jpg";
import Colors from "../utils/Colors";
const useStyles = makeStyles({
  root: {
    backgroundColor: "white",
    width: "80vw",
    height: "80vh",
    borderRadius: "10px",
    boxShadow: "0px 2px 10px rgb(0, 0, 0, 0.1)",
  },
  welcomeText: {
    display: "flex",
    justifyContent: "center",
    fontSize: "2rem",
    fontWeight: "bold",
    paddingTop: "2%",
    color: Colors.secondary_dark_color,
  },
});

const LoginRegister = () => {
  const classes = useStyles();
  const [isLogin, setIsLogin] = useState(true);

  const loginCode = () => {
    return (
      <Grid
        container
        style={{
          marginLeft: "16%",
        }}
      >
        <Grid
          item
          xs={12}
          style={{
            marginTop: "16%",
            fontSize: "1.4rem",
            fontWeight: "bold",
            color: Colors.primary_color,
          }}
        >
          Login
        </Grid>
        <Grid item xs={12} style={{ marginTop: "6%" }}>
          <TextField
            style={{ width: "400px" }}
            placeholder="Email"
            color="warning"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} style={{ marginTop: "6%" }}>
          <TextField
            style={{ width: "400px" }}
            placeholder="Password"
            type="password"
            color="warning"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <VpnKeyIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} style={{ marginTop: "6%" }}>
          <Button
            variant="contained"
            size="large"
            style={{ backgroundColor: Colors.secondary_color }}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    );
  };
  return (
    <div className={classes.root}>
      <div className={classes.welcomeText}>
        Welcome to Online Coding Platform
      </div>
      <Grid container>
        <Grid item xs={6}>
          {isLogin ? loginCode() : null}
        </Grid>
        <Grid item xs={6}>
          <Grid container>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "8%",
              }}
            >
              <img
                style={{ width: "50%" }}
                src={LogRegImage}
                alt="LoginRegister"
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                marginTop: "6%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div style={{ marginTop: "5.5px" }}>
                {isLogin ? "DON'T" : "ALREADY"} HAVE AN ACCOUNT?
              </div>
              <Button
                style={{
                  color: Colors.secondary_color,
                  backgroundColor: "white",
                }}
                onClick={() => setIsLogin(!isLogin)}
                disableElevation
              >
                {isLogin ? "Register" : "Login"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginRegister;
