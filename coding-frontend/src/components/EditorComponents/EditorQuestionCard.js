import React from "react";
import { makeStyles } from "@mui/styles";
import Colors from "../../utils/Colors";
import { Grid } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const useStyles = makeStyles({
  root: {
    height: "60px",
    width: "100%",
    background: Colors.dark_color,
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    color: "white",
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
  isCoding,
  question,
  questionText,
  difficulty,
  questionPoint,
}) => {
  const classes = useStyles();
  return (
    <CustomWidthTooltip title={questionText}>
      <div className={classes.root}>
        <Grid container>
          <Grid
            item
            xs={2}
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
            xs={3}
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
          <Grid item xs={1} style={{ display: "flex", alignItems: "center" }}>
            {questionPoint}
          </Grid>
        </Grid>
      </div>
    </CustomWidthTooltip>
  );
};

export default EditorQuestionCard;
