import React from "react";
import NavbarEditor from "../components/Navbars/NavbarEditor";
import { Button, Grid, TextField } from "@mui/material";
import EditorContestCard from "../components/EditorComponents/EditorContestCard";
import { useNavigate } from "react-router-dom";
import EditorQuestionCard from "../components/EditorComponents/EditorQuestionCard";
import EditorContestDetails from "../components/EditorComponents/EditorContestDetails";
import axios from "axios";
const EditorContestScreen = () => {
  let navigate = useNavigate();

  const [addedQuestions, setAddedQuestions] = React.useState([]);
  const [questions, setQuestions] = React.useState([]);
  const [contests, setContests] = React.useState([]);
  const [newID, setNewID] = React.useState(0);
  const [newContestName, setNewContestName] = React.useState("");
  const [newStartDate, setNewStartDate] = React.useState("");
  const [newEndDate, setNewEndDate] = React.useState("");
  const [newPrize, setNewPrize] = React.useState(0);

  React.useEffect(() => {
    if (
      localStorage.getItem("session") === null ||
      JSON.parse(localStorage.getItem("session")).person_id.charAt(0) !== "E"
    ) {
      navigate("/");
    }
  }, []);

  React.useEffect(() => {
    axios
      .get(process.env.REACT_APP_URL + "api/contest/all")
      .then((response) => {
        setContests(response.data);
        setNewID(response.data.length);
      });
  }, []);
  React.useEffect(() => {
    axios.get(process.env.REACT_APP_URL + "api/question/all").then((res) => {
      setQuestions(res.data);
      setDataToShow(res.data);
    });
  }, []);

  const navigateToContest = (id) => {
    navigate(`/editor/contests/${id}`);
  };

  const [tempData, setTempData] = React.useState([
    {
      question: "What is the output of the following code?",
      questionText: "",
      difficulty: "Easy",
      questionPoint: "60",
    },
  ]);
  const [dataToShow, setDataToShow] = React.useState(questions);
  const [isDialogOpen, setIsDialogOpen] = React.useState({
    isOpen: false,
    contestId: null,
  });

  const searchBarHandler = (e) => {
    let searchText = e.target.value;
    let filteredData = questions.filter((item) => {
      return item.title.toLowerCase().includes(searchText.toLowerCase());
    });
    setDataToShow(filteredData);
  };

  const handleCallback = (isAdded, question) => {
    if (!isAdded) {
      setAddedQuestions([...addedQuestions, question]);
    } else {
      //remove the question from addedQuestions
      let newAddedQuestions = addedQuestions.filter(
        (item) => item !== question
      );
      setAddedQuestions(newAddedQuestions);
    }
  };

  const dialogCallback = (data) => {
    setIsDialogOpen({ isOpen: data, questionId: null });
  };

  const handleAddContest = () => {
    //if start date is after end date
    if (newStartDate > newEndDate) {
      alert("Start date cannot be after end date");
      return;
    }
    axios
      .post(process.env.REACT_APP_URL + "api/contest/insert", {
        contest_name: newContestName,
        start_date: newStartDate,
        end_date: newEndDate,
        prize: newPrize,
      })
      .then((res) => {
        addedQuestions.map((q) => {
          axios.post(
            process.env.REACT_APP_URL +
              "api/contest/insert_question/" +
              "C" +
              newID +
              "/" +
              q
          );
        });
        alert("Contest added successfully");
        setNewContestName("");
        setNewStartDate("");
        setNewEndDate("");
        setNewPrize(0);
        setNewID(newID + 1);
      })
      .catch((err) => {
        alert("Error adding contest");
      });
  };

  return (
    <div>
      <NavbarEditor />
      <div style={{ padding: "20px" }}>
        <Grid container>
          <Grid item xs={4}>
            <h2 style={{ display: "flex", justifyContent: "center" }}>
              Contests
            </h2>
            <div style={{ height: "76vh", overflowY: "scroll" }}>
              {contests.map((contest, index) => (
                <EditorContestCard
                  onClick={() =>
                    setIsDialogOpen({
                      isOpen: true,
                      contestId: contest.contest_id,
                    })
                  }
                  key={index}
                  contestName={contest.contest_name}
                  startDate={contest.start_date}
                  endDate={contest.end_date}
                />
              ))}
            </div>
          </Grid>
          <Grid item xs={8}>
            <Grid container>
              <Grid item xs={12}>
                <h2
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "10px",
                  }}
                >
                  Create Contest
                </h2>
              </Grid>
              <Grid item xs={6}>
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "5px",
                      marginLeft: "100px",
                    }}
                  >
                    <div style={{ marginRight: "20px" }}>Contest Name</div>
                    <TextField
                      variant="outlined"
                      color="success"
                      size="small"
                      value={newContestName}
                      onChange={(e) => setNewContestName(e.target.value)}
                      style={{ width: "200px" }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "5px",
                      marginLeft: "100px",
                    }}
                  >
                    <div style={{ marginRight: "50px" }}>Start Date</div>

                    <TextField
                      variant="outlined"
                      color="success"
                      value={newStartDate}
                      onChange={(e) => setNewStartDate(e.target.value)}
                      type="date"
                      size="small"
                      style={{ width: "200px" }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "5px",
                      marginLeft: "100px",
                    }}
                  >
                    <div style={{ marginRight: "58px" }}>End Date</div>

                    <TextField
                      variant="outlined"
                      value={newEndDate}
                      onChange={(e) => setNewEndDate(e.target.value)}
                      color="success"
                      type="date"
                      size="small"
                      style={{ width: "200px" }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "5px",
                      marginLeft: "100px",
                    }}
                  >
                    <div style={{ marginRight: "60px" }}>Prize (TL)</div>
                    <TextField
                      variant="outlined"
                      color="success"
                      size="small"
                      value={newPrize}
                      onChange={(e) => setNewPrize(e.target.value)}
                      type="number"
                      style={{ width: "200px" }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={6}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Grid
                  container
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Grid
                    item
                    xs={12}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={require("../images/sampleProfile.png")}
                      alt=""
                      style={{ width: "140px", height: "140px" }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingTop: "10px",
                    }}
                  >
                    <Button variant="contained" color="primary" size="small">
                      Upload Photo
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                style={{ paddingLeft: "20px", marginTop: "20px" }}
              >
                <TextField
                  variant="outlined"
                  color="success"
                  size="small"
                  placeholder="🔎 Search Questions"
                  style={{ marginBottom: "10px" }}
                  onChange={searchBarHandler}
                />
                <div style={{ height: "40vh", overflowY: "scroll" }}>
                  {dataToShow.map((data, index) => (
                    <EditorQuestionCard
                      questionId={data.question_id}
                      inContestScreen
                      parentCallback={handleCallback}
                      key={index}
                      question={data.title}
                      questionText={data.explanation}
                      difficulty={data.difficulty}
                      questionPoint={data.question_point}
                    />
                  ))}
                </div>
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddContest()}
                >
                  Create
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <EditorContestDetails
            open={isDialogOpen.isOpen}
            handleParentOpen={dialogCallback}
            contestId={isDialogOpen.contestId}
          />
        </Grid>
      </div>
    </div>
  );
};

export default EditorContestScreen;
