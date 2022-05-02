import React from "react";
import { makeStyles } from "@mui/styles";
import Colors from "../../utils/Colors";
import { Grid } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import axios from "axios";

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

const handleApproveClick = (editorId) => {
  axios
    .put(
      process.env.REACT_APP_URL +
        "api/admin/approve/editor/" +
        JSON.parse(localStorage.getItem("session")).admin_id +
        "/" +
        editorId
    )
    .then((res) => {
      window.location.reload();
    });
};
const handleRejectClick = (editorId) => {
  axios
    .put(
      process.env.REACT_APP_URL +
        "api/admin/disapprove/editor/" +
        JSON.parse(localStorage.getItem("session")).admin_id +
        "/" +
        editorId
    )
    .then((res) => {
      window.location.reload();
    });
};

const CandidateEditor = ({
  editorId,
  editorName,
  editorNickname,
  editorCV,
}) => {
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
            onClick={() => {
              if (!editorCV) {
                return;
              } else {
                window.open(editorCV);
              }
            }}
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
            onClick={() => handleApproveClick(editorId)}
            style={{ cursor: "pointer", fontSize: "28px" }}
          >
            ✅
          </div>
          <div
            onClick={() => handleRejectClick(editorId)}
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
