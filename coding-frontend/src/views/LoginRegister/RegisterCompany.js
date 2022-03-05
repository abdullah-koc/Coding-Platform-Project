import React, { useState } from "react";
import { TextField, InputAdornment, Grid, Button } from "@mui/material";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import BadgeIcon from "@mui/icons-material/Badge";
import Colors from "../../utils/Colors";
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";
import AlternateEmail from "@mui/icons-material/AlternateEmail";

const RegisterCompany = () => {
  return (
    <Grid
      container
      style={{
        marginLeft: "13%",
      }}
    >
      <Grid
        item
        xs={12}
        style={{
          marginTop: "13%",
          fontSize: "1.4rem",
          fontWeight: "bold",
          color: Colors.primary_color,
        }}
      >
        Register Company
      </Grid>
      <Grid item xs={12} style={{ marginTop: "3%" }}>
        <TextField
          style={{ width: "400px" }}
          placeholder="Company Name"
          color="warning"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BadgeIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
      </Grid>
      <Grid item xs={12} style={{ marginTop: "3%" }}>
        <TextField
          style={{ width: "400px" }}
          placeholder="Company Email"
          color="warning"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AlternateEmail />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
      </Grid>
      <Grid item xs={12} style={{ marginTop: "3%" }}>
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
      <Grid item xs={12} style={{ marginTop: "3%" }}>
        <TextField
          style={{ width: "400px" }}
          placeholder="Company Phone"
          color="warning"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
      </Grid>

      <Grid item xs={12} style={{ marginTop: "3%" }}>
        <TextField
          style={{ width: "400px" }}
          placeholder="Company Address"
          color="warning"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BusinessIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
      </Grid>
      <Grid item xs={12} style={{ marginTop: "3%" }}>
        <Button
          variant="contained"
          size="large"
          style={{ backgroundColor: Colors.primary_color }}
        >
          Register
        </Button>
      </Grid>
    </Grid>
  );
};

export default RegisterCompany;
