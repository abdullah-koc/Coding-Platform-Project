import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, Input } from "@mui/material";
import sampleProfile from "../images/sampleProfile.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarEditor from "../components/Navbars/NavbarEditor";

const EditorProfileScreen = () => {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [photo, setPhoto] = useState("");
  const [phone, setPhone] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [newExperienceLevel, setNewExperienceLevel] = useState("");
  const [salary, setSalary] = useState("");
  const [newSalary, setNewSalary] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [newPhoto, setNewPhoto] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState({});
  const [progress, setProgress] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("session"));
    setUser(user);
    try {
      if (user.person_id.charAt(0) !== "E") {
        navigate("/");
      }
      setName(user.full_name);
      setNickname(user.nickname);
      setEmail(user.email);
      setBirthDate(user.birth_date);
      setPhoto(user.photo === undefined ? sampleProfile : user.photo);
      setPhone(user.phone === undefined ? "" : user.phone);
      setExperienceLevel(
        user.experience_level === undefined ? "" : user.experience_level
      );
      setSalary(user.salary === undefined ? "" : user.salary);
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

  const handlePhotoChange = (event) => {
    console.log(event.target.files[0]);
    setNewPhoto(event.target.files[0]);
  };

  const handlePhotoUpload = () => {
    if (newPhoto === null) {
      alert("Please select a photo");
      return;
    }
    const formData = new FormData();
    formData.append("multipartFile", newPhoto, newPhoto.name);
    setProgress(true);
    // send a POST request with the form data to upload photo
    axios({
      method: "post",
      url: process.env.REACT_APP_URL + "api/editor/change/photo/" + nickname,
      data: formData,
      headers: {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
      },
    })
      .then(function (response) {
        setProgress(false);
        setPhoto(response.data.url);
        setNewPhoto(null);
      })
      .catch(function (response) {
        alert("File size is too large");
        setProgress(false);
      });
  };

  const handleExperienceLevelChange = () => {
    axios
      .post(
        process.env.REACT_APP_URL +
          "api/editor/set/experience/" +
          user.email +
          "/" +
          newExperienceLevel
      )
      .then((res) => {
        alert("Experience Level changed successfully");
        localStorage.setItem(
          "session",
          JSON.stringify({ ...user, experience_level: newExperienceLevel })
        );
        setExperienceLevel(newExperienceLevel);
      })
      .catch((err) => {
        console.log(err);
        alert("ExperienceLevel change failed");
      });
  };
  const handleSalaryChange = () => {
    axios
      .post(
        process.env.REACT_APP_URL +
          "api/editor/set/salary/" +
          user.email +
          "/" +
          newSalary
      )
      .then((res) => {
        alert("Salary changed successfully");
        localStorage.setItem(
          "session",
          JSON.stringify({ ...user, salary: newSalary })
        );
        setSalary(newSalary);
      })
      .catch((err) => {
        alert("Salary change failed");
      });
  };

  const isPasswordValid = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
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
      <NavbarEditor />
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
                {progress && <div>Please wait</div>}
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  paddingBottom: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <label htmlFor="btn-upload">
                  <input
                    id="btn-upload"
                    name="btn-upload"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handlePhotoChange}
                  />
                  <Button
                    className="btn-choose"
                    variant="outlined"
                    component="span"
                  >
                    Choose Photo
                  </Button>
                </label>
                <Button disabled={progress} onClick={() => handlePhotoUpload()}>
                  Upload
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
                  <span style={{ fontWeight: "bold" }}>Experience Level: </span>
                  {"  "}{" "}
                  {experienceLevel === null
                    ? "Not set"
                    : experienceLevel === undefined
                    ? "Not set"
                    : experienceLevel}
                </div>
                <TextField
                  size="small"
                  placeholder="New experienceLevel"
                  value={
                    newExperienceLevel === undefined
                      ? ""
                      : newExperienceLevel === null
                      ? ""
                      : newExperienceLevel
                  }
                  color="success"
                  onChange={(e) => setNewExperienceLevel(e.target.value)}
                />
                <Button
                  color="success"
                  onClick={handleExperienceLevelChange}
                  disabled={
                    newExperienceLevel === "" ||
                    newExperienceLevel === undefined ||
                    newExperienceLevel === null
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
                  <span style={{ fontWeight: "bold" }}>Salary: </span>
                  {"  "}{" "}
                  {salary === null
                    ? "Not set"
                    : salary === undefined
                    ? "Not set"
                    : salary}
                </div>
                <TextField
                  size="small"
                  placeholder="New salary"
                  value={
                    newSalary === undefined
                      ? ""
                      : newSalary === null
                      ? ""
                      : newSalary
                  }
                  color="success"
                  onChange={(e) => setNewSalary(e.target.value)}
                />
                <Button
                  color="success"
                  onClick={handleSalaryChange}
                  disabled={
                    newSalary === "" ||
                    newSalary === undefined ||
                    newSalary === null
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

export default EditorProfileScreen;
