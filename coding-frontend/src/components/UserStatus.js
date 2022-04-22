import React from "react";
import { TextField, InputAdornment, Grid, Button, colors } from "@mui/material";
import Colors from "../utils/Colors";
import Box from "@mui/material/Box";
import NavbarUser from "./Navbars/NavbarUser";

const UserStatus = () => {
  const [successRate, setSuccessRate] = React.useState(80);
  const [nickname, setNickname] = React.useState("");
  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("session"));
    try {
      setNickname(user.nickname);
    } catch {
      setNickname("");
    }
  }, []);

  return (
    <Box
      sx={{
        width: 300,
        height: 180,
        borderRadius: "10px",
        backgroundColor: Colors.dark_color,
        paddingRight: "3%",
      }}
    >
      <Grid container>
        <Grid item xs={6} style={{ marginTop: "6%", paddingLeft: "6%" }}>
          <Grid container direction="column">
            <Grid item xs={5} style={{ marginTop: "6%" }}>
              <Grid
                item
                style={{ float: "left", color: Colors.statistics_color }}
              >
                @{nickname}
              </Grid>
            </Grid>
            <Grid item xs={7} style={{ marginTop: "18%" }}>
              <Grid
                item
                style={{
                  float: "left",
                  color:
                    successRate < 40
                      ? Colors.hard_red_color
                      : successRate >= 40 && successRate < 70
                      ? Colors.medium_yellow_color
                      : successRate >= 70
                      ? Colors.easy_green_color
                      : Colors.easy_green_color,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "80px",
                  height: "80px",
                  fontSize: "150%",
                  backgroundColor: Colors.dark_color,
                  borderRadius: "50%",
                  border: "3px solid",
                }}
              >
                {successRate}%
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container direction="column">
            <Grid item xs={4} style={{ marginTop: "45%" }}>
              <Grid
                item
                style={{ float: "left", color: Colors.easy_green_color }}
              >
                Easy
              </Grid>
              <Grid
                item
                style={{ float: "right", color: Colors.statistics_color }}
              >
                46/50
              </Grid>
            </Grid>
            <Grid item xs={4} style={{ marginTop: "8%" }}>
              <Grid
                item
                style={{ float: "left", color: Colors.medium_yellow_color }}
              >
                Medium
              </Grid>
              <Grid
                item
                style={{ float: "right", color: Colors.statistics_color }}
              >
                24/36
              </Grid>
            </Grid>
            <Grid item xs={4} style={{ marginTop: "8%" }}>
              <Grid
                item
                style={{ float: "left", color: Colors.hard_red_color }}
              >
                Hard
              </Grid>
              <Grid
                item
                style={{ float: "right", color: Colors.statistics_color }}
              >
                12/30
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserStatus;
