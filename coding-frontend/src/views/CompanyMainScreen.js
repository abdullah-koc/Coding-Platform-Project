import React, { useState, useEffect } from "react";
import { Grid, Pagination } from "@mui/material";
import ContestInfoDonation from "../components/CompanyComponents/ContestInfoDonation";
import NavbarCompany from "../components/Navbars/NavbarCompany";
import { useNavigate } from "react-router-dom";
import InterviewCard from "../components/CompanyComponents/InterviewCard";
import axios from "axios";

export const CompanyMainScreen = () => {
  let navigate = useNavigate();
  React.useEffect(() => {
    if (
      localStorage.getItem("session") === null ||
      JSON.parse(localStorage.getItem("session")).company_id.charAt(0) !== "C"
    ) {
      navigate("/");
    }
  }, []);
  const [upcomingPage, setUpcomingPage] = useState(1);
  const [totalPagesUpcoming, setTotalPagesUpcoming] = useState(1);
  const [curUpcomingContests, setUpcomingCurContests] = useState([]);
  const [upcomingContests, setUpcomingContests] = useState([]);

  const [upcomingInterviewPage, setUpcomingInterviewPage] = useState(1);
  const [totalPagesInterviewUpcoming, setTotalPagesInterviewUpcoming] =
    useState(1);
  const [curUpcomingInterviews, setUpcomingCurInterviews] = useState([]);
  const [interviews, setInterviews] = useState([
    {
      interview_id: "I1",
      interview_name: "Interview 1",
      interview_date: "12/06/2022",
      interview_duration: 2,
    },
    {
      interview_id: "I2",
      interview_name: "Interview 2",
      interview_date: "14/06/2022",
      interview_duration: 2,
    },
    {
      interview_id: "I3",
      interview_name: "Interview 3",
      interview_date: "25/07/2022",
      interview_duration: 2,
    },
    {
      interview_id: "I4",
      interview_name: "Interview 4",
      interview_date: "12/02/2022",
      interview_duration: 2,
    },
    {
      interview_id: "I5",
      interview_name: "Interview 5",
      interview_date: "31/07/2022",
      interview_duration: 2,
    },
    {
      interview_id: "I6",
      interview_name: "Interview 6",
      interview_date: "31/07/2022",
      interview_duration: 2,
    },
    {
      interview_id: "I7",
      interview_name: "Interview 7",
      interview_date: "31/07/2022",
      interview_duration: 2,
    },
    {
      interview_id: "I8",
      interview_name: "Interview 8",
      interview_date: "31/07/2022",
      interview_duration: 2,
    },
    {
      interview_id: "I9",
      interview_name: "Interview 9",
      interview_date: "31/10/2022",
      interview_duration: 3,
    },
  ]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_URL + "api/contest/all").then((res) => {
      setUpcomingContests(res.data);
      setUpcomingCurContests(res.data.slice(0, 5));
      setTotalPagesUpcoming(Math.ceil(res.data.length / 5));
    });
  }, []);

  useEffect(() => {
    setTotalPagesUpcoming(Math.ceil(upcomingContests.length / 5));
    setUpcomingCurContests(upcomingContests.slice(0, 5));
  }, [upcomingContests]);

  useEffect(() => {
    setUpcomingCurContests(
      upcomingContests.slice((upcomingPage - 1) * 5, 5 * upcomingPage)
    );
  }, [upcomingPage]);

  function sortContets() {
    const sortedData = [...upcomingContests].sort((a) => {
      return a.donated_amount === 0 ? 1 : -1;
    });
    setUpcomingContests(sortedData);
    setUpcomingCurContests(
      sortedData.slice((upcomingPage - 1) * 5, 5 * upcomingPage)
    );
  }

  useEffect(() => {
    sortContets();
  }, []);

  useEffect(() => {
    setTotalPagesInterviewUpcoming(Math.ceil(interviews.length / 7));
    setUpcomingCurInterviews(interviews.slice(0, 7));
  }, []);

  useEffect(() => {
    setUpcomingCurInterviews(
      interviews.slice(
        (upcomingInterviewPage - 1) * 7,
        7 * upcomingInterviewPage
      )
    );
  }, [upcomingInterviewPage]);

  function sortInterviews() {
    const sortedData = [...interviews].sort((a, b) => {
      return new Date(a.interview_date) < new Date(b.interview_date) ? 1 : -1;
    });
    setInterviews(sortedData);
    setUpcomingCurInterviews(
      sortedData.slice(
        (upcomingInterviewPage - 1) * 7,
        7 * upcomingInterviewPage
      )
    );
  }

  useEffect(() => {
    sortInterviews();
  }, []);

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
          <Grid item xs={6}>
            <h1>Upcoming Contests</h1>
            {curUpcomingContests.map((contest, index) => (
              <div
                key={index}
                style={{ paddingRight: "40px", marginBottom: "10px" }}
              >
                <ContestInfoDonation
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
            <h1>Your Interviews</h1>
            {curUpcomingInterviews.map((interview, index) => (
              <div
                key={index}
                style={{ paddingRight: "40px", marginBottom: "20px" }}
              >
                <InterviewCard
                  interview_id={interview.interview_id}
                  interview_name={interview.interview_name}
                  interview_date={interview.interview_date}
                  interview_duration={interview.interview_duration}
                  style={{ marginTop: "20px" }}
                />
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Pagination
                count={totalPagesInterviewUpcoming}
                page={upcomingInterviewPage}
                onChange={(e, page) => setUpcomingInterviewPage(page)}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default CompanyMainScreen;
