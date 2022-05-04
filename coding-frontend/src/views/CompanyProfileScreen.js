import React, { useState, useEffect } from "react";
import { Grid, TextField, Button } from "@mui/material";
import sampleProfile from "../images/sampleProfile.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarCompany from "../components/Navbars/NavbarCompany";

const CompanyProfileScreen = () => {
  let navigate = useNavigate();
  useEffect(() => {
    if (
      localStorage.getItem("session") === null ||
      JSON.parse(localStorage.getItem("session")).company_id.charAt(0) !== "C"
    ) {
      navigate("/");
    }
  }, []);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("https://picsum.photos/200");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newAddress, setNewAddress] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [company, setCompany] = useState({});

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_URL +
          "api/company/" +
          JSON.parse(localStorage.getItem("session")).company_email
      )
      .then((res) => {
        setCompany(res.data);
        setName(res.data.company_name);
        setAddress(res.data.company_address);
        setPhone(res.data.company_phone);
        setEmail(res.data.company_email);
        setPhoto(res.data.company_photo);
      });
  }, []);
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const handlePhoneChange = () => {
    axios
      .post(
        process.env.REACT_APP_URL +
          "api/company/change/phone/" +
          company.company_id +
          "/" +
          newPhone
      )
      .then((res) => {
        alert("Phone number changed successfully");
        localStorage.setItem(
          "session",
          JSON.stringify({ ...company, company_phone: newPhone })
        );
        setPhone(newPhone);
      })
      .catch((err) => {
        alert("Phone number change failed");
      });
  };
  const handleEmailChange = () => {};
  const handleAddressChange = () => {
    axios
      .post(
        process.env.REACT_APP_URL +
          "api/company/change/address/" +
          company.company_id +
          "/" +
          newAddress
      )
      .then((res) => {
        alert("Address changed successfully");
        localStorage.setItem(
          "session",
          JSON.stringify({ ...company, company_address: newAddress })
        );
        setAddress(newAddress);
      })
      .catch((err) => {
        alert("Address change failed");
      });
  };

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
    axios
      .post(
        process.env.REACT_APP_URL +
          "api/company/change/password/" +
          company.company_id +
          "/" +
          newPassword
      )
      .then((res) => {
        alert("Password changed successfully");
        window.location.reload();
      })
      .catch((err) => {
        alert("Password change failed");
      });
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
                  <span style={{ fontWeight: "bold" }}>Email:&nbsp;</span>
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
