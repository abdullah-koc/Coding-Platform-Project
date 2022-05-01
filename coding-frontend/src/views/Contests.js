import React, { useState, useEffect } from "react";
import { Grid, Pagination } from "@mui/material";
import NavbarUser from "../components/Navbars/NavbarUser";
import ContestInfo from "../components/ContestInfo";
import AttendedContestInfo from "../components/AttendedContestInfo";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Contests = () => {
  let navigate = useNavigate();

  useEffect(() => {
    if (
      localStorage.getItem("session") === null ||
      JSON.parse(localStorage.getItem("session")).person_id.charAt(0) !== "U"
    ) {
      navigate("/");
    }
  }, []);

  const [upcomingPage, setUpcomingPage] = useState(1);
  const [attendedPage, setAttendedPage] = useState(1);
  const [totalPagesUpcoming, setTotalPagesUpcoming] = useState(1);
  const [curUpcomingContests, setUpcomingCurContests] = useState([]);
  const [totalPagesAttended, setTotalPagesAttended] = useState(1);
  const [curAttendedContests, setAttendedCurContests] = useState([]);
  const [upcomingContests, setUpcomingContests] = useState([]);
  const [attendedContests, setAttendedContests] = useState([]);

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_URL +
          "api/contest/get/all/" +
          JSON.parse(localStorage.getItem("session")).person_id
      )
      .then((res) => {
        setAttendedContests(res.data);
      });
  }, []);

  useEffect(() => {
    axios.get(process.env.REACT_APP_URL + "api/contest/all").then((res) => {
      let allContests = res.data;
      //get upcoming contests (not attended)
      let upcomingContests = allContests.filter(
        (contest) =>
          new Date(contest.start_date) > new Date() &&
          new Date(contest.end_date) > new Date()
      );
      setUpcomingContests(upcomingContests);
    });
  }, [attendedContests]);

  const handleStartContest = (contest_id) => {
    //navigate("/contests/" + contest_id);
  };

  useEffect(() => {
    setTotalPagesUpcoming(Math.ceil(upcomingContests.length / 5));
    setUpcomingCurContests(upcomingContests.slice(0, 5));
  }, []);

  useEffect(() => {
    setUpcomingCurContests(
      upcomingContests.slice((upcomingPage - 1) * 5, 5 * upcomingPage)
    );
  }, [upcomingContests, upcomingPage]);

  useEffect(() => {
    setTotalPagesAttended(Math.ceil(attendedContests.length / 5));
    setAttendedCurContests(attendedContests.slice(0, 5));
  }, [attendedContests]);

  useEffect(() => {
    setAttendedCurContests(
      attendedContests.slice((attendedPage - 1) * 5, 5 * attendedPage)
    );
  }, [attendedPage]);

  function sortAttendedContets() {
    const sortedData = [...attendedContests].sort((a, b) => {
      return new Date(b.end_date) - new Date(a.end_date) < 0 ? 1 : -1;
    });
    setAttendedContests(sortedData);
    setAttendedCurContests(
      sortedData.slice((attendedPage - 1) * 5, 5 * attendedPage)
    );
  }

  useEffect(() => {
    sortAttendedContets();
  }, []);

  return (
    <div>
      <NavbarUser />
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
          <Grid item xs={6}>
            <h1>Upcoming Contests</h1>
            {curUpcomingContests.map((contest, index) => (
              <div
                key={index}
                style={{ paddingRight: "40px", marginBottom: "10px" }}
              >
                <ContestInfo
                  contest_id={contest.contest_id}
                  contest_name={contest.contest_name}
                  contest_photo={contest.contest_photo}
                  start_date={contest.start_date}
                  end_date={contest.end_date}
                  prize={contest.prize}
                  creation_date={contest.creation_date}
                  style={{ marginTop: "20px" }}
                />
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Pagination
                count={totalPagesUpcoming}
                page={upcomingPage}
                onChange={(e, page) => setUpcomingPage(page)}
              />
            </div>
          </Grid>

          <Grid item xs={6}>
            <h1>Attended Contests</h1>
            {curAttendedContests.map((contest, index) => (
              <div
                key={index}
                style={{ paddingRight: "40px", marginBottom: "10px" }}
                onClick={() => handleStartContest(contest.contest_id)}
              >
                <AttendedContestInfo
                  contest_id={contest.contest_id}
                  contest_name={contest.contest_name}
                  contest_photo={contest.contest_photo}
                  start_date={contest.start_date}
                  end_date={contest.end_date}
                  prize={contest.prize}
                  style={{ marginTop: "20px" }}
                />
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Pagination
                count={totalPagesAttended}
                page={attendedPage}
                onChange={(e, page) => setAttendedPage(page)}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Contests;
