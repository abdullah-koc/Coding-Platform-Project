import React, { useState, useEffect } from "react";
import { Grid, TextField, Button } from "@mui/material";
import sampleProfile from "../images/sampleProfile.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarCompany from "../components/Navbars/NavbarCompany";

const CompanyProfileScreen = () => {
  let navigate = useNavigate();
  const [name, setName] = useState("Havelsan");
  const [photo, setPhoto] = useState("https://picsum.photos/200");
  const [address, setAddress] = useState(
    "Mustafa Kemal Mahallesi Şehit Öğretmen Şenay Aybüke Yalçın Cad. No:39 P.K. : 06510 Çankaya/Ankara"
  );
  const [phone, setPhone] = useState("0312 688 88 88");
  const [email, setEmail] = useState("info@havelsan.com.tr");

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newAddress, setNewAddress] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const handlePhoneChange = () => {};
  const handleNameChange = () => {};
  const handleEmailChange = () => {};
  const handleAddressChange = () => {};

  const isPasswordValid = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(password);
  };
  const handlePasswordChange = () => {
    if (!isPasswordValid(newPassword)) {
      alert(
        "Password must contain at least 8 characters, one uppercase letter and one number"
      );
      return;
    }
  };
  return (
    <div>
      <NavbarCompany />
      <div>
        <Grid container style={{ fontSize: "120%" }}>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <h1>Company Profile</h1>
          </Grid>
          <Grid item xs={6} style={{ paddingTop: "20px" }}>
            <Grid container style={{ paddingLeft: "40px" }}>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              >
                <img
                  src={photo === undefined ? sampleProfile : photo}
                  alt="profile"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    marginBottom: "20px",
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "left",
                  marginBottom: "20px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>Name:&nbsp;</span>
                {"  "} {name}
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "left",
                  marginBottom: "20px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>Email:&nbsp;</span>
                {"  "} {email}
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "left",
                  marginBottom: "20px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>Address:&nbsp;</span>
                {"  "} {address}
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "left",
                  marginBottom: "20px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>Phone:&nbsp;</span>
                {"  "} {phone}
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              >
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleLogOut}
                >
                  Log Out
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} style={{ paddingTop: "20px" }}>
            <Grid container>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "left",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "left",
                    marginRight: "10px",
                  }}
                >
                  <span style={{ fontWeight: "bold" }}>Name:&nbsp;</span>
                  {"  "}{" "}
                  {name === null
                    ? "Not set"
                    : name === undefined
                    ? "Not set"
                    : name}
                </div>
                <TextField
                  size="small"
                  placeholder="New department"
                  value={
                    newName === undefined ? "" : newName === null ? "" : newName
                  }
                  color="success"
                  onChange={(e) => setNewName(e.target.value)}
                />
                <Button
                  color="success"
                  onClick={handleNameChange}
                  disabled={
                    newName === "" || newName === undefined || newName === null
                  }
                >
                  Save
                </Button>
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "left",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "left",
                    marginRight: "10px",
                  }}
                >
                  <span style={{ fontWeight: "bold" }}>Email:&nbsp;</span>
                  {"  "}{" "}
                  {email === null
                    ? "Not set"
                    : email === undefined
                    ? "Not set"
                    : email}
                </div>
                <TextField
                  size="small"
                  placeholder="New email"
                  value={
                    newEmail === undefined
                      ? ""
                      : newEmail === null
                      ? ""
                      : newEmail
                  }
                  color="success"
                  onChange={(e) => setNewEmail(e.target.value)}
                />
                <Button
                  color="success"
                  onClick={handleEmailChange}
                  disabled={
                    newEmail === "" ||
                    newEmail === undefined ||
                    newEmail === null
                  }
                >
                  Save
                </Button>
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "left",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "left",
                    marginRight: "10px",
                  }}
                >
                  <span style={{ fontWeight: "bold" }}>Address:&nbsp;</span>
                  {"  "}{" "}
                  {address === null
                    ? "Not set"
                    : address === undefined
                    ? "Not set"
                    : address}
                </div>
                <TextField
                  size="small"
                  placeholder="New address"
                  value={
                    newAddress === undefined
                      ? ""
                      : newAddress === null
                      ? ""
                      : newAddress
                  }
                  color="success"
                  onChange={(e) => setNewAddress(e.target.value)}
                />
                <Button
                  color="success"
                  onClick={handleAddressChange}
                  disabled={
                    newAddress === "" ||
                    newAddress === undefined ||
                    newAddress === null
                  }
                >
                  Save
                </Button>
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "left",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "left",
                    marginRight: "10px",
                  }}
                >
                  <span style={{ fontWeight: "bold" }}>Phone:&nbsp;</span>
                  {"  "}{" "}
                  {phone === null
                    ? "Not set"
                    : phone === undefined
                    ? "Not set"
                    : phone}
                </div>
                <TextField
                  size="small"
                  placeholder="New number"
                  value={
                    newPhone === undefined
                      ? ""
                      : newPhone === null
                      ? ""
                      : newPhone
                  }
                  color="success"
                  onChange={(e) => setNewPhone(e.target.value)}
                />
                <Button
                  color="success"
                  disabled={
                    newPhone === "" ||
                    newPhone === undefined ||
                    newPhone === null
                  }
                  onClick={handlePhoneChange}
                >
                  Save
                </Button>
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "left",
                  marginBottom: "20px",
                }}
              ></Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "left",
                  marginBottom: "10px",
                }}
              >
                <h3>Change Password</h3>
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "left",
                  marginBottom: "20px",
                }}
              >
                <TextField
                  size="small"
                  placeholder="New password"
                  type="password"
                  value={newPassword}
                  color="success"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "left",
                  marginBottom: "20px",
                }}
              >
                <TextField
                  size="small"
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  color="success"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              >
                <Button
                  color="success"
                  onClick={handlePasswordChange}
                  disabled={
                    newPassword === "" ||
                    confirmPassword === "" ||
                    newPassword !== confirmPassword
                  }
                >
                  Save new password
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default CompanyProfileScreen;
