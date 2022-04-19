import React from "react";
import { Grid } from "@mui/material";
import Colors from "../utils/Colors";

const CommunitySubmission = ({ submission }) => {
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{
          width: "90%",
          height: "150px",
          backgroundColor: Colors.dark_color,
          borderRadius: "5px",
          color: "white",
          alignItems: "center",
          margin: "2%",
          padding: "2%",
        }}
      >
        <span style={{ fontWeight: "bolder" }}>{"Anonymous said: "}</span>
        {submission}
      </Grid>
    </Grid>
  );
};

export default CommunitySubmission;
