import React from "react";
import { makeStyles } from "@mui/styles";
import Colors from "../../utils/Colors";
import { Grid } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import axios from "axios";
import UploadLinkDialog from "./UploadLinkDialog";

const useStyles = makeStyles({
  root: {
    height: "60px",
    width: "100%",
    background: Colors.dark_color,
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    color: "white",
    marginBottom: "5px",
  },
});

const CustomWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500,
  },
});

const EditorQuestionCard = ({
  questionId,
  isCoding,
  question,
  questionText,
  difficulty,
  questionPoint,
  inContestScreen,
  parentCallback,
}) => {
  const classes = useStyles();

  const [isAdded, setIsAdded] = React.useState(false);
  const [reqCount, setReqCount] = React.useState(0);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  React.useEffect(() => {
    if (!inContestScreen) {
      axios
        .get(process.env.REACT_APP_URL + "api/question/" + questionId)
        .then((res) => {
          setReqCount(res.data.video_request_count);
        })
        .catch((err) => {
          console.log("asdfadas");
        });
    }
  }, []);

  const handleAddToContest = () => {
    if (!isAdded) {
      setIsAdded(true);
    } else {
      setIsAdded(false);
    }
    parentCallback(isAdded, questionId);
  };

  const handleDialogCallback = (childData) => {
    setIsDialogOpen(childData);
  };

  return (
    <CustomWidthTooltip title={questionText}>
      <div className={classes.root}>
        <Grid container>
          <Grid
            item
            xs={1}
            style={{
              display: "flex",
              alignItems: "center",
              paddingLeft: "10px",
            }}
          >
            {isCoding ? "C" : "N"}
          </Grid>
          <Grid item xs={6} style={{ display: "flex", alignItems: "center" }}>
            {question}
          </Grid>
          <Grid
            item
            xs={2}
            style={{
              display: "flex",
              alignItems: "center",
              color:
                difficulty === "Easy"
                  ? Colors.easy_green_color
                  : difficulty === "Medium"
                  ? Colors.medium_yellow_color
                  : difficulty === "Hard"
                  ? Colors.hard_red_color
                  : "white",
            }}
          >
            {difficulty}
          </Grid>
          {!inContestScreen && (
            <Grid item xs={1} style={{ display: "flex", alignItems: "center" }}>
              {reqCount}
            </Grid>
          )}
          <Grid item xs={1} style={{ display: "flex", alignItems: "center" }}>
            {questionPoint}
          </Grid>
          {inContestScreen && (
            <Grid
              item
              xs={1}
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "160%",
                cursor: "pointer",
              }}
              onClick={handleAddToContest}
            >
              {isAdded ? "➖" : "➕"}
            </Grid>
          )}
          {!inContestScreen && isCoding && (
            <Grid
              item
              xs={1}
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => setIsDialogOpen(true)}
            >
              Upload YouTube Tutorial
            </Grid>
          )}
        </Grid>
        <UploadLinkDialog
          open={isDialogOpen}
          questionID={questionId}
          handleParentOpen={handleDialogCallback}
        />
      </div>
    </CustomWidthTooltip>
  );
};

export default EditorQuestionCard;
