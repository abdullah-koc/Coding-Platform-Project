import React, { useState, useEffect } from "react";
import NavbarUser from "../components/Navbars/NavbarUser";
import { Grid, Button } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ContestQuestionCard from "../components/UserMainScreenComponents/ContestQuestionCard";
import { useNavigate } from "react-router-dom";
import RanksTable from "../components/RanksTable";
import axios from "axios";

export const ContestScreen = () => {
  let navigate = useNavigate();
  useEffect(() => {
    if (
      localStorage.getItem("session") === null ||
      JSON.parse(localStorage.getItem("session")).person_id.charAt(0) !== "U"
    ) {
      navigate("/");
    }
  }, []);

  const [contestInfo, setContestInfo] = useState({});
  const [questions, setQuestions] = useState([]);
  const [isContestEnded, setIsContestEnded] = useState(false);
  const [sponsors, setSponsors] = useState([]);

  const getID = () => {
    let url = window.location.href;
    let id = url.split("/")[url.split("/").length - 1];
    return id;
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_URL + `api/contest/get_sponsors/${getID()}`)
      .then((res) => {
        setSponsors(res.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_URL + `api/contest/${getID()}`)
      .then((res) => {
        setContestInfo(res.data);
        setIsContestEnded(new Date(res.data.end_date) < new Date());
      });
  }, []);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_URL + `api/contest/all_questions/${getID()}`)
      .then((res) => {
        setQuestions(res.data);
      });
  }, [contestInfo]);

  const handleGoToQuestion = (id) => {
    if (id.startsWith("CQ")) {
      navigate("/contests/c/" + getID() + "/" + id);
    } else {
      navigate("/contests/nc/" + getID() + "/" + id);
    }
  };
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
        <Grid container>
          <Grid
            item
            xs={isContestEnded ? 12 : 5}
            style={{
              paddingLeft: "20px",
              fontSize: "20px",
            }}
          >
            {isContestEnded === false && (
              <div>
                <h1>{contestInfo.contest_name}</h1>
              </div>
            )}
            {isContestEnded === true && (
              <div>
                <h1>{contestInfo.contest_name} (Ended)</h1>
              </div>
            )}
            <Grid container>
              <Grid item xs={4}>
                <img
                  src={contestInfo.contest_photo}
                  alt="logo"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    marginRight: "20px",
                  }}
                />
              </Grid>
              <Grid item xs={8} style={{ paddingTop: "10px" }}>
                <p style={{ fontWeight: "bold", display: "inline" }}>
                  Start Date:
                </p>
                &nbsp;{contestInfo.start_date}
                <br />
                <br />
                <p style={{ fontWeight: "bold", display: "inline" }}>
                  End Date:
                </p>
                &nbsp;{contestInfo.end_date}
              </Grid>
            </Grid>
            <Grid container style={{ width: "600px", paddingTop: "20px" }}>
              <Grid item xs={2}>
                <EmojiEventsIcon
                  style={{
                    fontSize: "60px",
                    color: "#FFAB00",
                  }}
                />
              </Grid>
              <Grid item xs={10} style={{ paddingTop: "20px" }}>
                <p style={{ fontWeight: "bold", display: "inline" }}>Prize:</p>
                &nbsp;{contestInfo.prize}
              </Grid>
            </Grid>
            {isContestEnded === false && (
              <div>
                <h3>Contest Rules</h3>
                <Grid
                  container
                  style={{
                    height: "300px",
                    overflowX: "auto",
                    overflowY: "auto",
                    paddingTop: "10px",
                  }}
                >
                  <ul>
                    <li>
                      Morbi in sem quis dui placerat ornare. Pellentesque odio
                      nisi, euismod in, pharetra a, ultricies in, diam. Sed
                      arcu. Cras consequat.
                    </li>
                    <li>
                      Praesent dapibus, neque id cursus faucibus, tortor neque
                      egestas augue, eu vulputate magna eros eu erat. Aliquam
                      erat volutpat. Nam dui mi, tincidunt quis, accumsan
                      porttitor, facilisis luctus, metus.
                    </li>
                    <li>
                      Phasellus ultrices nulla quis nibh. Quisque a lectus.
                      Donec consectetuer ligula vulputate sem tristique cursus.
                      Nam nulla quam, gravida non, commodo a, sodales sit amet,
                      nisi.
                    </li>
                    <li>
                      Pellentesque fermentum dolor. Aliquam quam lectus,
                      facilisis auctor, ultrices ut, elementum vulputate, nunc.
                    </li>
                    <li>
                      Morbi in sem quis dui placerat ornare. Pellentesque odio
                      nisi, euismod in, pharetra a, ultricies in, diam. Sed
                      arcu. Cras consequat.
                    </li>
                    <li>
                      Praesent dapibus, neque id cursus faucibus, tortor neque
                      egestas augue, eu vulputate magna eros eu erat. Aliquam
                      erat volutpat. Nam dui mi, tincidunt quis, accumsan
                      porttitor, facilisis luctus, metus.
                    </li>
                    <li>
                      Phasellus ultrices nulla quis nibh. Quisque a lectus.
                      Donec consectetuer ligula vulputate sem tristique cursus.
                      Nam nulla quam, gravida non, commodo a, sodales sit amet,
                      nisi.
                    </li>
                    <li>
                      Pellentesque fermentum dolor. Aliquam quam lectus,
                      facilisis auctor, ultrices ut, elementum vulputate, nunc.
                    </li>
                    <li>
                      Phasellus ultrices nulla quis nibh. Quisque a lectus.
                      Donec consectetuer ligula vulputate sem tristique cursus.
                      Nam nulla quam, gravida non, commodo a, sodales sit amet,
                      nisi.
                    </li>
                    <li>
                      Pellentesque fermentum dolor. Aliquam quam lectus,
                      facilisis auctor, ultrices ut, elementum vulputate, nunc.
                    </li>
                    <li>
                      Phasellus ultrices nulla quis nibh. Quisque a lectus.
                      Donec consectetuer ligula vulputate sem tristique cursus.
                      Nam nulla quam, gravida non, commodo a, sodales sit amet,
                      nisi.
                    </li>
                    <li>
                      Pellentesque fermentum dolor. Aliquam quam lectus,
                      facilisis auctor, ultrices ut, elementum vulputate, nunc.
                    </li>
                  </ul>
                </Grid>
                <Grid container>
                  <Grid item xs={12} style={{ marginTop: "20px" }}>
                    <Grid container>
                      {sponsors && (
                        <Grid item xs={12}>
                          <h3>Sponsors</h3>
                        </Grid>
                      )}
                      {sponsors.map((sponsor, index) => (
                        <Grid item xs={3} key={index}>
                          <Grid container>
                            <Grid item xs={12}>
                              <img
                                src={sponsor.company_photo}
                                alt="logo"
                                style={{
                                  width: "80px",
                                  height: "80px",
                                  borderRadius: "50%",
                                  marginRight: "20px",
                                }}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <p
                                style={{
                                  fontWeight: "bold",
                                  display: "inline",
                                }}
                              >
                                {sponsor.company_name}
                              </p>
                            </Grid>
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            )}
            {isContestEnded === true && (
              <div>
                <h3>Rankings</h3>
                <Grid
                  container
                  style={{
                    height: "300px",
                    overflowX: "auto",
                    overflowY: "auto",
                    paddingTop: "10px",
                  }}
                >
                  <RanksTable />
                </Grid>
              </div>
            )}
          </Grid>
          <Grid
            item
            xs={7}
            style={{
              paddingLeft: "40px",
              paddingTop: "10px",
            }}
          >
            {isContestEnded === false && (
              <div>
                <h1>Questions</h1>
                <Grid
                  style={{
                    height: "550px",
                    overflowX: "auto",
                    overflowY: "auto",
                  }}
                >
                  {questions.map((question, index) => (
                    <div
                      key={index}
                      style={{ paddingRight: "40px", marginBottom: "10px" }}
                      onClick={() => handleGoToQuestion(question.question_id)}
                    >
                      <ContestQuestionCard
                        isContest={true}
                        isCoding={question.question_id.startsWith("CQ")}
                        question={question.title}
                        difficulty={question.difficulty}
                        likeRate={
                          (100 * question.like_count) /
                          (
                            question.like_count + question.dislike_count
                          ).toFixed(2)
                        }
                        isSolved={question.isSolved}
                        questionPoint={question.question_point}
                        style={{ marginTop: "20px" }}
                      />
                    </div>
                  ))}
                </Grid>
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ContestScreen;
