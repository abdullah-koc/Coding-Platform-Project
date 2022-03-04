import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Grid, Button } from "@mui/material";
import LogRegImage from "../../images/loginregisterimage.jpg";
import Colors from "../../utils/Colors";
import Login from "./Login";
import Register from "./Register";
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

  return (
    <div className={classes.root}>
      <div className={classes.welcomeText}>Welcome to Syncoder</div>
      <Grid container>
        <Grid item xs={6}>
          {isLogin ? <Login /> : <Register />}
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
