import React from "react";
import EditorQuestionCard from "../components/EditorComponents/EditorQuestionCard";
import NavbarEditor from "../components/Navbars/NavbarEditor";
import { Button, Grid } from "@mui/material";
import Colors from "../utils/Colors";
import AddQuestionDialog from "../components/AddQuestionDialog";

const EditorMainScreen = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

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
            <div style={{ marginBottom: "10px" }}>
              <EditorQuestionCard
                question={"dsfsdf"}
                questionPoint="60"
                questionText={
                  "sfdşlfkwdşlfmwşlefmewfewlkfwlfkmewlkfkmewfewklfmlkdmfşlsd"
                }
                difficulty="Easy"
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <EditorQuestionCard
                question={"dsfsdf"}
                questionPoint="60"
                questionText={
                  "sfdşlfkwdşlfmwşlefmewfewlkfwlfkmewlkfkmewfewklfmlkdmfşlsd"
                }
                difficulty="Easy"
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <EditorQuestionCard
                question={"dsfsdf"}
                questionPoint="60"
                questionText={
                  "sfdşlfkwdşlfmwşlefmewfewlkfwlfkmewlkfkmewfewklfmlkdmfşlsd"
                }
                difficulty="Easy"
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <EditorQuestionCard
                question={"dsfsdf"}
                questionPoint="60"
                questionText={
                  "sfdşlfkwdşlfmwşlefmewfewlkfwlfkmewlkfkmewfewklfmlkdmfşlsd"
                }
                difficulty="Easy"
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <EditorQuestionCard
                question={"dsfsdf"}
                questionPoint="60"
                questionText={
                  "sfdşlfkwdşlfmwşlefmewfewlkfwlfkmewlkfkmewfewklfmlkdmfşlsd"
                }
                difficulty="Easy"
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <EditorQuestionCard
                question={"dsfsdf"}
                questionPoint="60"
                questionText={
                  "sfdşlfkwdşlfmwşlefmewfewlkfwlfkmewlkfkmewfewklfmlkdmfşlsd"
                }
                difficulty="Easy"
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <EditorQuestionCard
                question={"dsfsdf"}
                questionPoint="60"
                questionText={
                  "sfdşlfkwdşlfmwşlefmewfewlkfwlfkmewlkfkmewfewklfmlkdmfşlsd"
                }
                difficulty="Easy"
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <EditorQuestionCard
                question={"dsfsdf"}
                questionPoint="60"
                questionText={
                  "sfdşlfkwdşlfmwşlefmewfewlkfwlfkmewlkfkmewfewklfmlkdmfşlsd"
                }
                difficulty="Easy"
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <EditorQuestionCard
                question={"dsfsdf"}
                questionPoint="60"
                questionText={
                  "sfdşlfkwdşlfmwşlefmewfewlkfwlfkmewlkfkmewfewklfmlkdmfşlsd"
                }
                difficulty="Easy"
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <EditorQuestionCard
                question={"dsfsdf"}
                questionPoint="60"
                questionText={
                  "sfdşlfkwdşlfmwşlefmewfewlkfwlfkmewlkfkmewfewklfmlkdmfşlsd"
                }
                difficulty="Easy"
              />
            </div>
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
