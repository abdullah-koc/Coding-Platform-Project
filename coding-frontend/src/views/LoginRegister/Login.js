import React, { useState } from "react";
import { TextField, InputAdornment, Grid, Button } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import Colors from "../../utils/Colors";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email === "" || password === "") {
      alert("Please fill all the fields");
    } else {
      axios
        .put(
          process.env.REACT_APP_URL + "api/auth/login/" + email + "/" + password
        )
        .then((response) => {
          if (!response.data) {
            alert("Invalid Credentials");
            return;
          }

          var details;
          axios
            .get(process.env.REACT_APP_URL + "api/user/" + email)
            .then((response) => {
              details = response.data;
              if (!response.data == "") {
                localStorage.setItem("session", JSON.stringify(details));
                alert("Successfully logged in");

                navigate("/problems");
                return;
              }
            });
          axios
            .get(process.env.REACT_APP_URL + "api/editor/" + email)
            .then((response) => {
              details = response.data;
              if (!response.data == "") {
                if (
                  response.data.is_approved === false &&
                  response.data.admin_id != null
                ) {
                  alert("You are not approved.");
                  return;
                } else if (response.data.is_approved === false) {
                  alert("Your account is not approved yet");
                  return;
                }

                localStorage.setItem("session", JSON.stringify(details));
                alert("Successfully logged in");

                navigate("/editor");
                return;
              }
            });
          axios
            .get(process.env.REACT_APP_URL + "api/admin/" + email)
            .then((response) => {
              details = response.data;
              if (!response.data == "") {
                localStorage.setItem("session", JSON.stringify(details));
                alert("Successfully logged in");

                navigate("/admin");
                return;
              }
            });

          axios
            .get(process.env.REACT_APP_URL + "api/company/" + email)
            .then((response) => {
              details = response.data;
              if (!response.data == "") {
                if (
                  response.data.is_approved === false &&
                  response.data.admin_id != null
                ) {
                  alert("You are not approved.");
                  return;
                } else if (response.data.is_approved === false) {
                  alert("Your account is not approved yet");
                  return;
                }

                localStorage.setItem("session", JSON.stringify(details));
                alert("Successfully logged in");

                navigate("/company");
                return;
              }
            });
        });
    }
  };
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          value={password}
          onKeyPress={(e) => e.key === "Enter" && handleLogin()}
          onChange={(e) => setPassword(e.target.value)}
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
          style={{ backgroundColor: Colors.primary_color }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Grid>
    </Grid>
  );
};

export default Login;
