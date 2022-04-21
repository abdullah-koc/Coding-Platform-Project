import React, { useState, useEffect } from "react";
import { Grid, MenuItem, Select, Pagination } from "@mui/material";
import NavbarUser from "../components/Navbars/NavbarUser";
import ContestInfo from "../components/ContestInfo";
import AttendedContestInfo from "../components/AttendedContestInfo";

export const Contests = () => {
  

  const [upcomingPage, setUpcomingPage] = useState(1);
  const [attendedPage, setAttendedPage] = useState(1);
  const [totalPagesUpcoming, setTotalPagesUpcoming] = useState(1);
  const [curUpcomingContests, setUpcomingCurContests] = useState([]);
  const [totalPagesAttended, setTotalPagesAttended] = useState(1);
  const [curAttendedContests, setAttendedCurContests] = useState([]);
  const [upcomingContests, setUpcomingContests] = useState([
    {
      contest_id: "C1",
      contest_name: "Coding Contest 1",
      contest_photo: "https://picsum.photos/200",
      start_date: "12/06/2022",
      end_date: "18/06/2022",
      prize: "10000$",
      creation_date: "21/04/2022",
    },
    {
      contest_id: "C2",
      contest_name: "Coding Contest 2",
      contest_photo: "https://picsum.photos/200",
      start_date: "14/06/2022",
      end_date: "20/06/2022",
      prize: "13000$",
      creation_date: "21/04/2022",
    },
    {
      contest_id: "C3",
      contest_name: "Coding Contest 3",
      contest_photo: "https://picsum.photos/200",
      start_date: "25/07/2022",
      end_date: "18/08/2022",
      prize: "Free Space Trip",
      creation_date: "21/04/2022",
    },
    {
      contest_id: "C4",
      contest_name: "Coding Contest 4",
      contest_photo: "https://picsum.photos/200",
      start_date: "12/02/2022",
      end_date: "18/02/2022",
      prize: "Amazon web services: 5000$",
      creation_date: "21/04/2022",
    },
    {
      contest_id: "C5",
      contest_name: "Coding Contest 5",
      contest_photo: "https://picsum.photos/200",
      start_date: "31/07/2022",
      end_date: "03/08/2022",
      prize: "Mercedes A180 AMG Sport",
      creation_date: "21/04/2022",
    },
    {
      contest_id: "C6",
      contest_name: "Coding Contest 5",
      contest_photo: "https://picsum.photos/200",
      start_date: "31/07/2022",
      end_date: "03/08/2022",
      prize: "Mercedes A180 AMG Sport",
      creation_date: "21/04/2022",
    },
    {
      contest_id: "C7",
      contest_name: "Coding Contest 5",
      contest_photo: "https://picsum.photos/200",
      start_date: "31/07/2022",
      end_date: "03/08/2022",
      prize: "Mercedes A180 AMG Sport",
      creation_date: "21/04/2022",
    },
    {
      contest_id: "C8",
      contest_name: "Coding Contest 5",
      contest_photo: "https://picsum.photos/200",
      start_date: "31/07/2022",
      end_date: "03/08/2022",
      prize: "Mercedes A180 AMG Sport",
      creation_date: "21/04/2022",
    }
  ]);
  const [attendedContests, setAttendedContests] = useState([
    {
      contest_id: "C1",
      contest_name: "Coding Contest 1",
      contest_photo: "https://picsum.photos/200",
      start_date: "12/06/2022",
      end_date: "18/06/2022",
      prize: "10000$",
      creation_date: "21/04/2022",
    },
    {
      contest_id: "C2",
      contest_name: "Coding Contest 2",
      contest_photo: "https://picsum.photos/200",
      start_date: "14/06/2022",
      end_date: "20/06/2022",
      prize: "13000$",
      creation_date: "21/04/2022",
    },
    {
      contest_id: "C3",
      contest_name: "Coding Contest 3",
      contest_photo: "https://picsum.photos/200",
      start_date: "25/07/2022",
      end_date: "18/08/2022",
      prize: "Free Space Trip",
      creation_date: "21/04/2022",
    },
    {
      contest_id: "C4",
      contest_name: "Coding Contest 4",
      contest_photo: "https://picsum.photos/200",
      start_date: "12/02/2022",
      end_date: "18/02/2022",
      prize: "Amazon web services: 5000$",
      creation_date: "21/04/2022",
    },
    {
      contest_id: "C5",
      contest_name: "Coding Contest 5",
      contest_photo: "https://picsum.photos/200",
      start_date: "31/07/2022",
      end_date: "03/08/2022",
      prize: "Mercedes A180 AMG Sport",
      creation_date: "21/04/2022",
    },
    {
      contest_id: "C5",
      contest_name: "Coding Contest 5",
      contest_photo: "https://picsum.photos/200",
      start_date: "31/07/2022",
      end_date: "03/08/2022",
      prize: "Mercedes A180 AMG Sport",
      creation_date: "21/04/2022",
    },
    {
      contest_id: "C5",
      contest_name: "Coding Contest 5",
      contest_photo: "https://picsum.photos/200",
      start_date: "31/07/2022",
      end_date: "03/08/2022",
      prize: "Mercedes A180 AMG Sport",
      creation_date: "21/04/2022",
    },
  ]);

  useEffect(() => {
    setTotalPagesUpcoming(Math.ceil(upcomingContests.length / 5));
    setUpcomingCurContests(upcomingContests.slice(0, 5));
  }, []);

  useEffect(() => {
    setUpcomingCurContests(upcomingContests.slice((upcomingPage - 1) * 5, 5 * upcomingPage));
  }, [upcomingPage]);

  useEffect(() => {
    setTotalPagesAttended(Math.ceil(attendedContests.length / 5));
    setAttendedCurContests(attendedContests.slice(0, 5));
  }, []);

  useEffect(() => {
    setAttendedCurContests(attendedContests.slice((attendedPage - 1) * 5, 5 * attendedPage));
  }, [attendedPage]);


  function sortAttendedContets() {
    const sortedData = [...attendedContests].sort((a, b) => {
      return new Date(b.end_date) - new Date(a.end_date) < 0 ? 1 : -1;
    });
    setAttendedContests(sortedData);
    setAttendedCurContests(sortedData.slice((attendedPage - 1) * 5, 5 * attendedPage));
  }

  useEffect(() => {
    sortAttendedContets();
  }, [])

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
                  style={{ marginTop: "20px",}}
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
              >
                <AttendedContestInfo
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
