import React, { useState, useEffect } from "react";
import { Grid, Pagination } from "@mui/material";
import NavbarUser from "../components/Navbars/NavbarUser";
import AttendedInterviewInfo from "../components/AttendedInterviewInfo";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InterviewInfo from "../components/InterviewInfo";
import Datetime from 'react-datetime';

export const Interviews = () => {
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
  const [curUpcomingInterviews, setUpcomingCurInterviews] = useState([]);
  const [totalPagesAttended, setTotalPagesAttended] = useState(1);
  const [curAttendedInterviews, setAttendedCurInterviews] = useState([]);
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);
  const [attendedInterviews, setAttendedInterviews] = useState([]);

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_URL +
          "api/interview/get_interviews_by_user/" +
          JSON.parse(localStorage.getItem("session")).person_id
      )
      .then((res) => {
        setAttendedInterviews(res.data);
      });
  }, []);

  useEffect(() => {
    axios.get(process.env.REACT_APP_URL + "api/interview/all").then((res) => {
      let allInterviews = res.data;
      
      //remove attended contests from upc
      var upc = allInterviews.filter(
        (interview) =>
          !attendedInterviews.some(
            (attended) => attended.interview_id === interview.interview_id
          )
      );
      setUpcomingInterviews(upc);
      setTotalPagesUpcoming(Math.ceil(upc.length / 8));
      setUpcomingCurInterviews(upc.slice(0, 8));
    });
  }, [attendedInterviews]);

  useEffect(() => {
    setTotalPagesUpcoming(Math.ceil(upcomingInterviews.length / 8));
    setUpcomingCurInterviews(upcomingInterviews.slice(0, 8));
  }, []);

  useEffect(() => {
    setUpcomingCurInterviews(
      upcomingInterviews.slice((upcomingPage - 1) * 8, 8 * upcomingPage)
    );
  }, [upcomingInterviews, upcomingPage]);

  useEffect(() => {
    setTotalPagesAttended(Math.ceil(attendedInterviews.length / 8));
    setAttendedCurInterviews(attendedInterviews.slice(0, 8));
  }, [attendedInterviews]);

  function sortAttendedContets() {
    const sortedData = [...attendedInterviews].sort((a, b) => {
      // return sort by date
      if (a.interview_date < b.interview_date) {
        return -1;
      } else if (a.interview_date > b.interview_date) {
        return 1;
      } else {
        return 0;
      }
    });
    setAttendedInterviews(sortedData);
    setAttendedCurInterviews(
      sortedData.slice((attendedPage - 1) * 8, 8 * attendedPage)
    );
    console.log(sortedData);
  }

  useEffect(() => {
    sortAttendedContets();
  }, []);

  useEffect(() => {
    setAttendedCurInterviews(
      attendedInterviews.slice((attendedPage - 1) * 8, 8 * attendedPage)
    );
  }, [attendedPage]);

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
            <h1>Upcoming Interviews</h1>
            {upcomingInterviews.length === 0 && (
              <h3 style={{ textAlign: "center" }}>
                No upcoming interviews. Check back later!
              </h3>
            )}
            {curUpcomingInterviews.map((interview, index) => (
              <div
                key={index}
                style={{ paddingRight: "40px", marginBottom: "10px" }}
              >
                <InterviewInfo
                  interview_id={interview.interview_id}
                  interview_name={interview.interview_name}
                  interview_date={interview.interview_date}
                  interview_duration={interview.interview_duration}
                  user_id={JSON.parse(localStorage.getItem("session")).person_id}
                  company_id={interview.company_id}
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
            <h1>Current and Past Interviews</h1>
            {attendedInterviews.length === 0 && (
              <h3 style={{ textAlign: "center" }}>No attended interviews.</h3>
            )}
            {curAttendedInterviews.map((interview, index) => (
              <div
                key={index}
                style={{ paddingRight: "40px", marginBottom: "10px" }}
              >
                <AttendedInterviewInfo
                    interview_id={interview.interview_id}
                    interview_name={interview.interview_name}
                    interview_date={interview.interview_date}
                    interview_duration={interview.interview_duration}
                    user_id={JSON.parse(localStorage.getItem("session")).person_id}
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

export default Interviews;
