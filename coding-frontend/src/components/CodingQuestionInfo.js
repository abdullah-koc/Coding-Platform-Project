import React from "react";
import { Grid, Button } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import NavbarUser from "./Navbars/NavbarUser";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import Colors from "../utils/Colors";
import Box from "@mui/material/Box";
import CodingQuestionText from "./CodingQuestionText";

const CodingQuestionInfo = () => {
  const [mode, setMode] = React.useState(0);
  const [difficulty, setDifficulty] = React.useState("Easy");
  const [previousAttempts, setPreviousAttempts] = React.useState([
    { id: 1, attemptCount: 1, passedTests: 12, totalTestCaseCount: 20 },
    { id: 2, attemptCount: 2, passedTests: 18, totalTestCaseCount: 20 },
    { id: 3, attemptCount: 3, passedTests: 20, totalTestCaseCount: 20 },
  ]);
  const [isSolutionDisabled, setIsSolutionDisabled] = React.useState(true);

  const handleAttemptClick = (attempt) => {
    console.log(attempt);
  };

  const handleSubmitCallback = (childData) => {
    setIsSolutionDisabled(!childData);
  };

  return (
    <div>
      <NavbarUser />
      <div style={{ display: "flex" }}>
        <Box
          sx={{
            paddingRight: "20px",
            width: "45vw",
            height: "calc(100vh - 100px)",
            marginTop: "1px",
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
                    style={{
                      width: "100%",
                      backgroundColor: isSolutionDisabled
                        ? "white"
                        : Colors.secondary_color,
                      color: isSolutionDisabled ? Colors.dark_color : "white",
                    }}
                    variant="contained"
                    onClick={() => setMode(1)}
                    disabled={isSolutionDisabled}
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
                  >
                    Last Submissions
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {mode === 0 && (
                <div>
                  <Grid container style={{ paddingTop: "4%" }}>
                    <Grid
                      item
                      xs={7}
                      style={{
                        paddingLeft: "8%",
                        fontWeight: "bolder",
                        fontSize: "20px",
                      }}
                    >
                      1.Median of Two Sorted Arrays
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
                      <ThumbUpIcon style={{ paddingTop: "5%" }}></ThumbUpIcon>
                    </Grid>
                    <Grid item xs={1}>
                      <ThumbDownAltIcon
                        style={{ paddingTop: "5%" }}
                      ></ThumbDownAltIcon>
                    </Grid>
                  </Grid>
                  <Grid
                    style={{
                      paddingLeft: "8%",
                      paddingRight: "8%",
                      paddingTop: "10%",
                      lineHeight: 2,
                      overflowY: "scroll",
                      textAlign: "justify",
                      height: "76vh",
                    }}
                  >
                    Given two sorted arrays nums1 and nums2 of size m and n
                    respectively, return the median of the two sorted arrays.
                    The overall run time complexity should be O(log (m+n)).
                    <br></br>
                    <br></br>
                    Example 1:
                    <br></br>
                    Input: nums1 = [1,3], nums2 = [2]
                    <br></br>
                    Output: 2.00000
                    <br></br>
                    Explanation: merged array = [1,2,3] and median is 2.
                    <br></br>
                    <br></br>
                    Example 2:
                    <br></br>
                    Input: nums1 = [1,2], nums2 = [3,4]
                    <br></br>
                    Output: 2.50000
                    <br></br>
                    Explanation: merged array = [1,2,3,4] and median is (2 + 3)
                    / 2 = 2.5.
                    <br></br>
                    Constraints:
                    <br></br>- nums1.length == m<br></br>k - nums2.length == n
                  </Grid>
                </div>
              )}
              {mode === 1 && (
                <div
                  style={{
                    paddingLeft: "8%",
                    paddingRight: "8%",
                    paddingTop: "4%",
                    lineHeight: 2,
                    overflowY: "scroll",
                    fontSize: "16px",
                    textAlign: "justify",
                    height: "76vh",
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptate consectetur aut architecto quod incidunt asperiores,
                  doloremque voluptatem deserunt ab atque tempora reiciendis
                  officia temporibus ullam laboriosam natus qui expedita
                  corrupti quas similique beatae minus. Illo magni dicta saepe
                  quaerat similique praesentium earum quam obcaecati fugit,
                  temporibus cumque ab, sint tenetur voluptatum amet sequi
                  laboriosam nostrum hic ea! Suscipit aliquid mollitia
                  consectetur reprehenderit labore quasi, id consequatur
                  voluptatibus? Ex excepturi voluptate sunt quo reiciendis
                  quidem consectetur dicta quasi? Eius facilis odio labore
                  repudiandae, quo consequuntur, placeat ducimus repellat
                  architecto alias, nam voluptates quam! Ex quia aut magni
                  accusamus, nisi molestias repellendus recusandae nobis
                  perferendis! Aspernatur animi ratione ipsam et dolores amet
                  nam suscipit culpa ex eius consequatur, commodi iusto aut, at
                  quasi ullam cum, expedita nisi facere! Voluptatibus harum
                  mollitia omnis temporibus. Doloremque, impedit? Quo quas
                  libero consectetur consequatur delectus, repellat, atque velit
                  itaque hic adipisci recusandae tenetur iusto numquam ex. Autem
                  voluptatum, exercitationem eveniet sit possimus dolor error
                  quis enim laboriosam minima animi, placeat provident. Et atque
                  minima sit reprehenderit eaque ut maiores aspernatur
                  laudantium. Tempore quibusdam, architecto accusantium,
                  consequatur ut nulla ab fugit delectus autem, sunt dicta. Eos
                  molestias animi maxime, eum ratione molestiae eligendi
                  temporibus quaerat debitis adipisci repellendus fugiat eveniet
                  nulla saepe enim, similique culpa ea incidunt perferendis
                  dicta iusto placeat blanditiis sit. At enim optio voluptate.
                  Harum exercitationem illum quasi dolore officia totam fugiat
                  delectus. Deserunt reiciendis quos modi tempora. Aliquam
                  quaerat, cupiditate doloribus a nulla dolorum ipsum tempora
                  excepturi, sed ullam perferendis beatae sequi omnis! Quos
                  adipisci eius reprehenderit ab. Quasi eaque repellendus eius
                  rem perspiciatis officiis saepe nobis vero dolorem ullam?
                  Pariatur modi dolores blanditiis aspernatur quidem eius ex a
                  veritatis laboriosam explicabo, vel quaerat, corrupti dolorem
                  vero vitae repellendus inventore soluta? Veritatis sunt labore
                  itaque vero distinctio earum modi, doloribus consectetur nulla
                  quas!
                </div>
              )}
              {mode === 2 && (
                <div>
                  <Grid
                    container
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      paddingTop: "4%",
                    }}
                  >
                    {previousAttempts.map((attempt) => (
                      <Grid
                        item
                        xs={12}
                        key={attempt.id}
                        onClick={() => handleAttemptClick(attempt)}
                        sx={{
                          width: "80%",
                          height: "100px",
                          cursor: "pointer",
                          backgroundColor: Colors.dark_color,
                          borderRadius: "5px",
                          color: "white",
                          fontWeight: "bolder",
                          alignItems: "center",
                          margin: "2%",
                          marginLeft: "4%",
                          marginRight: "4%",
                          paddingLeft: "2%",
                          paddingTop: "10px",
                        }}
                      >
                        {attempt.passedTests !== attempt.totalTestCaseCount && (
                          <div>
                            Attempt {attempt.attemptCount}
                            {" ❌"}
                            <br></br>
                            <br></br>
                            Failed {attempt.passedTests}/
                            {attempt.totalTestCaseCount} of test cases
                          </div>
                        )}
                        {attempt.passedTests === attempt.totalTestCaseCount && (
                          <div>
                            Attempt {attempt.attemptCount}
                            {" ✅"}
                            <br></br>
                            <br></br>
                            Passed {attempt.passedTests}/
                            {attempt.totalTestCaseCount} of test cases
                          </div>
                        )}
                      </Grid>
                    ))}
                  </Grid>
                </div>
              )}
            </Grid>
          </Grid>
        </Box>
        <CodingQuestionText parentSubmitCallback={handleSubmitCallback} />
      </div>
    </div>
  );
};

export default CodingQuestionInfo;
