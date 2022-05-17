import React, { useState, useEffect } from "react";
import { Grid, Pagination } from "@mui/material";
import ContestInfoDonation from "../components/CompanyComponents/ContestInfoDonation";
import NavbarCompany from "../components/Navbars/NavbarCompany";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Colors from "../utils/Colors";

export const InterviewResultsScreen = () => {
  let navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const getID = () => {
    let url = window.location.href;
    let id = url.split("/")[url.split("/").length - 1];
    return id;
  };
  React.useEffect(() => {
    if (
      localStorage.getItem("session") === null ||
      JSON.parse(localStorage.getItem("session")).company_id.charAt(0) !== "C"
    ) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_URL + `api/interview/see_results/${getID()}`)
      .then((res) => {
        setResults(res.data);
        console.log(res.data);
      });
  }, []);

  const handleApproveClick = (id) => {
    axios
      .post(
        process.env.REACT_APP_URL +
        `api/interview/add_result/${getID()}/${id}/${true}`
      )
      .then((res) => {
        setDisabled(true);
      });
  };

  const handleRejectClick = (id) => {
    axios
      .post(
        process.env.REACT_APP_URL +
        `api/interview/add_result/${getID()}/${id}/${false}`
      )
      .then((res) => {
        setDisabled(true);
      });
  };

  return (
    <div>
      <NavbarCompany />
      <div
        style={{
          paddingLeft: "40px",
          paddingRight: "40px",
          paddingBottom: "20px",
          marginTop: "10px",
          height: "90vh",
        }}
      >
        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2>Interview Results</h2>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid
              container
              style={{
                width: "500px",
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid
                item
                xs={5}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Nickname
              </Grid>
              <Grid
                item
                xs={3}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Total Point
              </Grid>
              <Grid
                item
                xs={4}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Operations
              </Grid>
            </Grid>
          </Grid>
          {results.map((result, index) => (
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              key={index}
            >
              <Grid
                container
                style={{
                  width: "500px",
                  marginTop: "20px",
                  display: "flex",
                  height: "90px ",
                  borderRadius: "10px",
                  color: "white",
                  justifyContent: "center",
                  alignItems: "center",
                  background: Colors.dark_color,
                }}
              >
                <Grid
                  item
                  xs={5}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {result.nickname}
                </Grid>
                <Grid
                  item
                  xs={3}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {result.user_point}
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    disabled={disabled}
                    onClick={() => handleApproveClick(result.person_id)}
                    style={{
                      cursor: disabled ? "default" : "pointer",
                      fontSize: "28px",
                    }}
                  >
                    ✅
                  </div>
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    disabled={disabled}
                    onClick={() => handleRejectClick(result.person_id)}
                    style={{
                      cursor: disabled ? "default" : "pointer",
                      fontSize: "28px",
                    }}
                  >
                    ❌
                  </div>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default InterviewResultsScreen;
