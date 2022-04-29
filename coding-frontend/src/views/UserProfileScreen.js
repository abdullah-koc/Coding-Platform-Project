import React, { useState, useEffect } from "react";
import NavbarUser from "../components/Navbars/NavbarUser";
import { Grid, TextField, Button } from "@mui/material";
import sampleProfile from "../images/sampleProfile.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProfileScreen = () => {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [photo, setPhoto] = useState("");
  const [phone, setPhone] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [school, setSchool] = useState("");
  const [newSchool, setNewSchool] = useState("");
  const [department, setDepartment] = useState("");
  const [newDepartment, setNewDepartment] = useState("");
  const [currentCompany, setCurrentCompany] = useState("");
  const [newCompany, setNewCompany] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("session"));
    setUser(user);
    try {
      setName(user.full_name);
      setNickname(user.nickname);
      setEmail(user.email);
      setBirthDate(user.birth_date);
      setPhoto(user.photo === undefined ? sampleProfile : user.photo);
      setPhone(user.phone === undefined ? "" : user.phone);
      setSchool(user.school === undefined ? "" : user.school);
      setDepartment(user.department === undefined ? "" : user.department);
      setCurrentCompany(user.cur_company === undefined ? "" : user.cur_company);
    } catch (err) {
      navigate("/");
    }
  }, []);

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const handlePhoneChange = () => {
    axios
      .post(
        process.env.REACT_APP_URL +
          "api/person/change/phone/" +
          user.person_id +
          "/" +
          newPhone
      )
      .then((res) => {
        alert("Phone number changed successfully");
        localStorage.setItem(
          "session",
          JSON.stringify({ ...user, phone: newPhone })
        );
        setPhone(newPhone);
      })
      .catch((err) => {
        alert("Phone number change failed");
      });
  };

  const handleSchoolChange = () => {
    axios
      .post(
        process.env.REACT_APP_URL +
          "api/user/change/school/" +
          user.person_id +
          "/" +
          newSchool
      )
      .then((res) => {
        alert("School changed successfully");
        localStorage.setItem(
          "session",
          JSON.stringify({ ...user, school: newSchool })
        );
        setSchool(newSchool);
      })
      .catch((err) => {
        console.log(err);
        alert("School change failed");
      });
  };
  const handleDepartmentChange = () => {
    axios
      .post(
        process.env.REACT_APP_URL +
          "api/user/change/department/" +
          user.person_id +
          "/" +
          newDepartment
      )
      .then((res) => {
        alert("Department changed successfully");
        localStorage.setItem(
          "session",
          JSON.stringify({ ...user, department: newDepartment })
        );
        setDepartment(newDepartment);
      })
      .catch((err) => {
        alert("Department change failed");
      });
  };
  const handleCompanyChange = () => {
    axios
      .post(
        process.env.REACT_APP_URL +
          "api/user/change/current_company/" +
          user.person_id +
          "/" +
          newCompany
      )
      .then((res) => {
        alert("Company changed successfully");
        localStorage.setItem(
          "session",
          JSON.stringify({ ...user, cur_company: newCompany })
        );
        setCurrentCompany(newCompany);
      })
      .catch((err) => {
        alert("Company change failed");
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
          "api/person/change/password/" +
          user.person_id +
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
                {"  "} {new Date(birthDate).toLocaleDateString()}
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
                  {"  "}{" "}
                  {school === null
                    ? "Not set"
                    : school === undefined
                    ? "Not set"
                    : school}
                </div>
                <TextField
                  size="small"
                  placeholder="New school"
                  value={
                    newSchool === undefined
                      ? ""
                      : newSchool === null
                      ? ""
                      : newSchool
                  }
                  color="success"
                  onChange={(e) => setNewSchool(e.target.value)}
                />
                <Button
                  color="success"
                  onClick={handleSchoolChange}
                  disabled={
                    newSchool === "" ||
                    newSchool === undefined ||
                    newSchool === null
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
                  <span style={{ fontWeight: "bold" }}>Department: </span>
                  {"  "}{" "}
                  {department === null
                    ? "Not set"
                    : department === undefined
                    ? "Not set"
                    : department}
                </div>
                <TextField
                  size="small"
                  placeholder="New department"
                  value={
                    newDepartment === undefined
                      ? ""
                      : newDepartment === null
                      ? ""
                      : newDepartment
                  }
                  color="success"
                  onChange={(e) => setNewDepartment(e.target.value)}
                />
                <Button
                  color="success"
                  onClick={handleDepartmentChange}
                  disabled={
                    newDepartment === "" ||
                    newDepartment === undefined ||
                    newDepartment === null
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
                  {currentCompany === null
                    ? "Not set"
                    : currentCompany === undefined
                    ? "Not set"
                    : currentCompany}
                </div>
                <TextField
                  size="small"
                  placeholder="New company"
                  value={
                    newCompany === undefined
                      ? ""
                      : newCompany === null
                      ? ""
                      : newCompany
                  }
                  color="success"
                  onChange={(e) => setNewCompany(e.target.value)}
                />
                <Button
                  color="success"
                  onClick={handleCompanyChange}
                  disabled={
                    newCompany === undefined ||
                    newCompany === "" ||
                    newCompany === null
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

export default UserProfileScreen;
