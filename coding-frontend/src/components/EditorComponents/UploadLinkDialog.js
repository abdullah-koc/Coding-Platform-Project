import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  TextField,
  DialogTitle,
  Radio,
  Checkbox,
  Grid,
  DialogActions,
  DialogContent,
  RadioGroup,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import axios from "axios";

const UploadLinkDialog = ({ open, handleParentOpen, questionID }) => {
  const [videoLink, setVideoLink] = useState("");
  const [question, setQuestion] = useState({});

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_URL + "api/question/" + questionID)
      .then((res) => {
        setQuestion(res.data);
      });
  }, []);

  const handleClose = () => {
    handleParentOpen(false);
  };
  const handleUploadLink = () => {
    if (videoLink === "") {
      alert("Video link cannot be empty");
      return;
    }
    axios
      .post(
        process.env.REACT_APP_URL +
          "api/question/editor_request/" +
          questionID +
          "/" +
          videoLink
      )
      .then((res) => {
        alert("Video link uploaded successfully");
        handleClose();
      });
  };
  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
      <DialogTitle>Upload Video Link</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            Please upload the video link for the question: {question.title}
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Video Link"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleUploadLink}>Upload</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadLinkDialog;
