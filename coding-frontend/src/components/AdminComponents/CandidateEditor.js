import React from "react";
import { makeStyles } from "@mui/styles";
import Colors from "../../utils/Colors";
import { Grid } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";

const useStyles = makeStyles({
  root: {
    height: "100px",
    width: "100%",
    background: Colors.dark_color,
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    color: "white",
  },
});

const handleApproveClick = () => {};
const handleRejectClick = () => {};

const CandidateEditor = ({ editorName, editorNickname, editorCV }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid
          item
          xs={4}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {editorName}
        </Grid>
        <Grid
          item
          xs={3}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {editorNickname}
        </Grid>
        <Grid
          item
          xs={2}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LinkIcon
            style={{
              cursor: "pointer",
              fontSize: "40px",
            }}
            onClick={() => window.open(editorCV)}
          />
        </Grid>
        <Grid
          item
          xs={3}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <div
            onClick={() => handleApproveClick()}
            style={{ cursor: "pointer", fontSize: "28px" }}
          >
            ✅
          </div>
          <div
            onClick={() => handleRejectClick()}
            style={{ cursor: "pointer", fontSize: "28px" }}
          >
            ❌
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default CandidateEditor;
