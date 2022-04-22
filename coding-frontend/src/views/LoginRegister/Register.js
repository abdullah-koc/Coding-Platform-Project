import React, { useState, useEffect } from "react";
import { TextField, InputAdornment, Grid, Button } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import BadgeIcon from "@mui/icons-material/Badge";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Colors from "../../utils/Colors";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  let navigate = useNavigate();
  const [isEditor, setIsEditor] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [testData, setTestData] = useState();

  //password should be at least 8 characters long and contain at least one number and one capital letter
  const isPasswordValid = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(password);
  };

  const handleRegisterButtonClick = () => {
    if (
      fullName === "" ||
      email === "" ||
      nickName === "" ||
      password === "" ||
      birthday === ""
    ) {
      alert("Please fill all the fields");
    } else if (!isPasswordValid(password)) {
      alert(
        "Password should be at least 8 characters long and contain at least one number and one capital letter"
      );
    } else {
      if (isEditor) {
      } else {
        axios
          .post(process.env.REACT_APP_URL + "api/auth/signUp", {
            full_name: fullName,
            email: email,
            nickname: nickName,
            password: password,
            company_phone: "",
            birth_date: birthday,
            company_address: "",
            type: "User",
            cv_url: "",
          })
          .then((response) => {
            console.log(response);
            alert("Successfully registered");
            //get user details from axios
            var details;
            axios
              .get(process.env.REACT_APP_URL + "api/user/" + email)
              .then((response) => {
                details = response.data;
                console.log(details);
                localStorage.setItem("session", JSON.stringify(details));
                navigate("/problems");
              });
          })
          .catch((error) => {
            alert("A user with this email/nickname already exists");
          });
      }
    }
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
        Register
      </Grid>
      <Grid item xs={12} style={{ marginTop: "3%" }}>
        <TextField
          style={{ width: "400px" }}
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
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
          placeholder="Email"
          color="warning"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
      <Grid item xs={12} style={{ marginTop: "3%" }}>
        <TextField
          style={{ width: "400px" }}
          placeholder="Nickname"
          color="warning"
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <TagFacesIcon />
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          placeholder="Birthday"
          type={"datetime-local"}
          color="warning"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarTodayIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
      </Grid>
      {isEditor && (
        <Grid item xs={12} style={{ marginTop: "3%" }}>
          Click here to upload your CV
          <input
            id="file-upload"
            type={"file"}
            style={{ paddingLeft: "10px" }}
          />
        </Grid>
      )}
      <Grid item xs={4} style={{ marginTop: "3%" }}>
        <Button
          variant="contained"
          size="large"
          style={{ backgroundColor: Colors.primary_color }}
          onClick={() => handleRegisterButtonClick()}
        >
          Register
        </Button>
      </Grid>
      <Grid item xs={8} style={{ marginTop: "3%" }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={isEditor}
              onChange={() => setIsEditor(!isEditor)}
            />
          }
          label="I want to be an editor"
        />
      </Grid>
    </Grid>
  );
};

export default Register;
