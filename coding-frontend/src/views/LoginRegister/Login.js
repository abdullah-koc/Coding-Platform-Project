import React, { useState } from "react";
import { TextField, InputAdornment, Grid, Button } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import Colors from "../../utils/Colors";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        >
          Login
        </Button>
      </Grid>
    </Grid>
  );
};

export default Login;
