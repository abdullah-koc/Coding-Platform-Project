import React from "react";
import EditorQuestionCard from "../components/EditorComponents/EditorQuestionCard";
import NavbarEditor from "../components/Navbars/NavbarEditor";
import { Button, Grid } from "@mui/material";
import Colors from "../utils/Colors";
import AddQuestionDialog from "../components/AddQuestionDialog";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditorMainScreen = () => {
  let navigate = useNavigate();

  React.useEffect(() => {
    if (
      localStorage.getItem("session") === null ||
      JSON.parse(localStorage.getItem("session")).person_id.charAt(0) !== "E"
    ) {
      navigate("/");
    }
  }, []);

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [questions, setQuestions] = React.useState([]);

  React.useEffect(() => {
    axios.get(process.env.REACT_APP_URL + "api/question/all").then((res) => {
      //set questions only belonging to that editor
      setQuestions(
        res.data.filter(
          (question) =>
            question.editor_id ===
            JSON.parse(localStorage.getItem("session")).person_id
        )
      );
    });
  }, []);

  const handleDialogCallback = (childData) => {
    setIsDialogOpen(childData);
  };
  return (
    <div>
      <NavbarEditor />
      <Grid container spacing={6} style={{ padding: "20px" }}>
        <Grid item xs={8}>
          <h2>Questions Prepared by You</h2>
          <Grid
            container
            style={{
              marginTop: "10px",
              marginBottom: "20px",
              fontSize: "120%",
            }}
          >
            <Grid item xs={2}>
              Type
            </Grid>
            <Grid item xs={6}>
              Title
            </Grid>
            <Grid item xs={3}>
              Difficulty
            </Grid>
            <Grid item xs={1}>
              Point
            </Grid>
          </Grid>
          <div style={{ overflowY: "scroll", height: "76vh" }}>
            {questions.map((question, index) => (
              <div style={{ marginBottom: "10px" }} key={index}>
                <EditorQuestionCard
                  question={question.title}
                  questionPoint={question.question_point}
                  questionText={question.explanation}
                  difficulty={question.difficulty}
                />
              </div>
            ))}
          </div>
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
          <Button
            variant="contained"
            style={{
              fontSize: "120%",
              background: Colors.primary_color,
              height: "80px",
              borderRadius: "20px",
            }}
            onClick={() => setIsDialogOpen(true)}
          >
            Add Question
          </Button>
          <AddQuestionDialog
            open={isDialogOpen}
            handleParentOpen={handleDialogCallback}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default EditorMainScreen;
