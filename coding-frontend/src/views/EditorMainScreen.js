import React from "react";
import EditorQuestionCard from "../components/EditorComponents/EditorQuestionCard";
import NavbarEditor from "../components/Navbars/NavbarEditor";
import { Grid } from "@mui/material";

const EditorMainScreen = () => {
  return (
    <div>
      <NavbarEditor />
      <Grid container></Grid>
    </div>
  );
};

export default EditorMainScreen;
