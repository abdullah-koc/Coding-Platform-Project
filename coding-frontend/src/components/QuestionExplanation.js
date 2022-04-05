import React from "react";
import { TextField, InputAdornment, Grid, Button, colors } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import Colors from "../utils/Colors";
import Box from "@mui/material/Box";

const QuestionExplanation = () => {
  const [mode, setMode] = React.useState(0);
  const [difficulty, setDifficulty] = React.useState("Easy");
  return (
    <Box
      sx={{
        width: "45vw",
        height: "100vh",
        border: "1px solid black",
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={4}>
              <Button
                style={{
                  width: "100%",
                  backgroundColor: Colors.secondary_color,
                }}
                onClick={() => setMode(0)}
                variant="contained"
              >
                Description
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                style={{ width: "100%", color: Colors.dark_color }}
                variant="contained"
                onClick={() => setMode(1)}
                disabled
              >
                Solution
              </Button>
            </Grid>
            <Grid item xs={5}>
              <Button
                style={{
                  width: "100%",
                  backgroundColor: Colors.secondary_color,
                }}
                onClick={() => setMode(2)}
                variant="contained"
                href="#text-buttons"
              >
                Last Submissions
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {mode === 0 && (
            <div>
              <Grid container style={{paddingTop: "4%"}}>
                <Grid
                  item
                  xs={7}
                  style={{
                    paddingLeft: "8%",
                    fontWeight: "bolder",
                    fontSize: "20px",
                  }}
                >
                  1.Find Median of an array
                </Grid>
                <Grid item xs={1}>
                  <YouTubeIcon
                    style={{
                      fontSize: "200%",
                      cursor: "pointer",
                      color: "#FF0000",
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{
                    
                        paddingTop: "0.7%",
                        paddingLeft: "0.001%",
                        display: "flex",
                        justifyContent: "center",
                        fontWeight: "bolder",
                        
                  }}
                >
                    {difficulty}
                </Grid>
                <Grid item xs={1}>
                  <ThumbUpIcon style={{paddingTop: "5%"}}>

                  </ThumbUpIcon>
                </Grid>
                <Grid item xs={1}>
                  <ThumbDownAltIcon style={{paddingTop: "5%"}}>
                  </ThumbDownAltIcon>
                </Grid>
              </Grid>
            </div>
          )}
          {mode === 1 && <div>dsfsdf</div>}
          {mode === 2 && <div>regtyjju</div>}
        </Grid>
      </Grid>
    </Box>
  );
};

export default QuestionExplanation;
