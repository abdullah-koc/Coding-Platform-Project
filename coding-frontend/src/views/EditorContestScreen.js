import React from "react";
import NavbarEditor from "../components/Navbars/NavbarEditor";
import { Button, Grid, TextField } from "@mui/material";
import EditorContestCard from "../components/EditorComponents/EditorContestCard";
import { useNavigate } from "react-router-dom";
import EditorQuestionCard from "../components/EditorComponents/EditorQuestionCard";
const EditorContestScreen = () => {
  let navigate = useNavigate();

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
    {
      question: "Two sums",
      questionText: "",
      difficulty: "Easy",
      questionPoint: "60",
    },
    {
      question: "Two sums",
      questionText: "",
      difficulty: "Easy",
      questionPoint: "60",
    },
    {
      question: "Two sums",
      questionText: "",
      difficulty: "Easy",
      questionPoint: "60",
    },
    {
      question: "Two sums",
      questionText: "",
      difficulty: "Easy",
      questionPoint: "60",
    },
    {
      question: "Two sums",
      questionText: "",
      difficulty: "Easy",
      questionPoint: "60",
    },
    {
      question: "Two sums",
      questionText: "",
      difficulty: "Easy",
      questionPoint: "60",
    },
    {
      question: "Two sums",
      questionText: "",
      difficulty: "Easy",
      questionPoint: "60",
    },
    {
      question: "Two sums",
      questionText: "",
      difficulty: "Easy",
      questionPoint: "60",
    },
    {
      question: "Two sums",
      questionText: "",
      difficulty: "Easy",
      questionPoint: "60",
    },
    {
      question: "Two sums",
      questionText: "",
      difficulty: "Easy",
      questionPoint: "60",
    },
    {
      question: "Two sums",
      questionText: "",
      difficulty: "Easy",
      questionPoint: "60",
    },
    {
      question: "Two sums",
      questionText: "",
      difficulty: "Easy",
      questionPoint: "60",
    },
  ]);
  const [dataToShow, setDataToShow] = React.useState(tempData);

  const searchBarHandler = (e) => {
    let searchText = e.target.value;
    let filteredData = tempData.filter((item) => {
      return item.question.toLowerCase().includes(searchText.toLowerCase());
    });
    setDataToShow(filteredData);
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
              <EditorContestCard />
              <EditorContestCard />
              <EditorContestCard />
              <EditorContestCard />
              <EditorContestCard />
              <EditorContestCard />
              <EditorContestCard />
              <EditorContestCard />
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
                      inContestScreen
                      key={index}
                      question={data.question}
                      questionText={data.questionText}
                      difficulty={data.difficulty}
                      questionPoint={data.questionPoint}
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
                <Button variant="contained" color="primary">
                  Create
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default EditorContestScreen;
