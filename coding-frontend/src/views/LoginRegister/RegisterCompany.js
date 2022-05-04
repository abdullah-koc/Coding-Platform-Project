import React, { useState } from "react";
import { TextField, InputAdornment, Grid, Button } from "@mui/material";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import BadgeIcon from "@mui/icons-material/Badge";
import Colors from "../../utils/Colors";
import PhoneIcon from "@mui/icons-material/Phone";
import BusinessIcon from "@mui/icons-material/Business";
import AlternateEmail from "@mui/icons-material/AlternateEmail";
import axios from "axios";

const RegisterCompany = () => {
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyPassword, setCompanyPassword] = useState("");

  const isPasswordValid = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(password);
  };

  const handleRegisterCompany = () => {
    if (!isPasswordValid(companyPassword)) {
      alert(
        "Password must contain at least 8 characters, one uppercase letter and one number"
      );
      return;
    }
    axios
      .post(process.env.REACT_APP_URL + "api/auth/signUp", {
        full_name: companyName,
        email: companyEmail,
        password: companyPassword,
        company_address: companyAddress,
        company_phone: companyPhone,
        type: "Company",
      })
      .then((res) => {
        alert(
          "Successfully registered. You need to wait admin approval to login"
        );
      })
      .catch((err) => {
        alert("A user with this email/nickname already exists");
      });
  };

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
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
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
          value={companyEmail}
          onChange={(e) => setCompanyEmail(e.target.value)}
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
          value={companyPassword}
          onChange={(e) => setCompanyPassword(e.target.value)}
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
          value={companyPhone}
          onChange={(e) => setCompanyPhone(e.target.value)}
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
          value={companyAddress}
          onChange={(e) => setCompanyAddress(e.target.value)}
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
          onClick={() => handleRegisterCompany()}
        >
          Register
        </Button>
      </Grid>
    </Grid>
  );
};

export default RegisterCompany;
