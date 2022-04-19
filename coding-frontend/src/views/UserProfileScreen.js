import React, { useState } from "react";
import NavbarUser from "../components/Navbars/NavbarUser";
import { Grid, TextField, Button } from "@mui/material";
import sampleProfile from "../images/sampleProfile.png";

const UserProfileScreen = ({
  name,
  nickname,
  email,
  phone,
  birthDate,
  photo,
  school,
  department,
  currentCompany,
}) => {
  const [newPhone, setNewPhone] = useState(phone);
  const [newSchool, setNewSchool] = useState(school);
  const [newDepartment, setNewDepartment] = useState(department);
  const [newCurrentCompany, setNewCurrentCompany] = useState(currentCompany);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const getBirthdate = () => {
    try {
      return birthDate.toLocaleDateString("en-US");
    } catch (error) {
      return "";
    }
  };

  return (
    <div>
      <NavbarUser />
      <div>
        <Grid container style={{ fontSize: "120%" }}>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <h1>User Profile</h1>
          </Grid>
          <Grid item xs={6}>
            <Grid container>
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
                  src={photo == undefined ? sampleProfile : photo}
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
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>Name: </span>
                {"  "} {name}
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
                <span style={{ fontWeight: "bold" }}>Nickname: </span>
                {"  "} {nickname}
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
                <span style={{ fontWeight: "bold" }}>Email: </span>
                {"  "} {email}
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
                <span style={{ fontWeight: "bold" }}>Birth Date: </span>
                {"  "} {getBirthdate()}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "10px",
                  }}
                >
                  <span style={{ fontWeight: "bold" }}>Phone: </span>
                  {"  "} {phone === "" ? "Not provided" : phone}
                </div>
                <TextField
                  size="small"
                  placeholder="New number"
                  value={newPhone}
                  color="success"
                  onChange={(e) => setNewPhone(e.target.value)}
                />
                <Button
                  color="success"
                  disabled={phone === newPhone || newPhone === ""}
                >
                  Save
                </Button>
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "10px",
                  }}
                >
                  <span style={{ fontWeight: "bold" }}>School: </span>
                  {"  "} {school === "" ? "Not provided" : school}
                </div>
                <TextField
                  size="small"
                  placeholder="New school"
                  value={newSchool}
                  color="success"
                  onChange={(e) => setNewSchool(e.target.value)}
                />
                <Button
                  color="success"
                  disabled={school === newSchool || newSchool === ""}
                >
                  Save
                </Button>
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "10px",
                  }}
                >
                  <span style={{ fontWeight: "bold" }}>Department: </span>
                  {"  "} {department === "" ? "Not provided" : department}
                </div>
                <TextField
                  size="small"
                  placeholder="New department"
                  value={newDepartment}
                  color="success"
                  onChange={(e) => setNewDepartment(e.target.value)}
                />
                <Button
                  color="success"
                  disabled={
                    department === newDepartment || newDepartment === ""
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
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "10px",
                  }}
                >
                  <span style={{ fontWeight: "bold" }}>Current Company: </span>
                  {"  "}
                  {currentCompany === "" ? "Not provided" : currentCompany}
                </div>
                <TextField
                  size="small"
                  placeholder="New company"
                  value={newCurrentCompany}
                  color="success"
                  onChange={(e) => setNewCurrentCompany(e.target.value)}
                />
                <Button
                  color="success"
                  disabled={
                    currentCompany === newCurrentCompany ||
                    newCurrentCompany === ""
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
                  justifyContent: "center",
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
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              >
                <TextField
                  size="small"
                  placeholder="Old password"
                  value={oldPassword}
                  type="password"
                  color="success"
                  onChange={(e) => setOldPassword(e.target.value)}
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
                  justifyContent: "center",
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
                  disabled={
                    oldPassword === "" ||
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

export default UserProfileScreen;
