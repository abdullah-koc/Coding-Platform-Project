import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  TextField,
  DialogTitle,
  Radio,
  Grid,
  DialogActions,
  DialogContent,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import RanksTable from "../RanksTable";
import EditorQuestionCard from "./EditorQuestionCard";
import axios from "axios";

const EditorContestDetails = ({
  open,
  handleParentOpen,
  contestName,
  contestId,
}) => {
  const handleClose = () => {
    handleParentOpen(false);
  };

  const [contestQuestions, setContestQuestions] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_URL + "api/contest/all_questions/" + contestId)
      .then((res) => {
        setContestQuestions(res.data);
      });
  }, []);

  return (
    <div>
      <Dialog fullWidth maxWidth="md" open={open}>
        <DialogTitle>Contest Details</DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid
              item
              xs={12}
              style={{ fontSize: "120%", marginBottom: "10px" }}
            >
              Contest Name:{contestName} , Contest ID: {contestId}
            </Grid>
            <Grid
              item
              xs={12}
              style={{ fontSize: "120%", marginBottom: "10px" }}
            >
              Start - End Dates: 12.12.2022 - 12.12.2023
            </Grid>
            {contestQuestions.map((question, index) => (
              <Grid item xs={12} style={{ marginBottom: "10px" }} key={index}>
                <EditorQuestionCard
                  questionId={question.question_id}
                  isCoding={question.question_id.startsWith("CQ")}
                  question={question.title}
                  questionText={question.explanation}
                  difficulty={question.difficulty}
                  questionPoint={question.question_point}
                  inContestScreen={true}
                />
              </Grid>
            ))}
            <Grid
              item
              xs={12}
              style={{ fontSize: "120%", marginBottom: "10px" }}
            >
              <RanksTable contestId={contestId} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditorContestDetails;
