import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

export default function RanksTable() {
  const [ranks, setRanks] = useState([]);

  const getID = () => {
    let url = window.location.href;
    let id = url.split("/")[url.split("/").length - 1];
    return id;
  };

  React.useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_URL +
          "api/contest/get_contestants_by_order/" +
          getID()
      )
      .then((res) => {
        console.log(res.data);
        let dataWithOrder = res.data.map((item, index) => {
          return {
            order: index + 1,
            nickname: item.nickname,
            score: item.point,
          };
        });
        setRanks(dataWithOrder);
      });
  }, []);

  return (
    <TableContainer component={Paper} style={{ backgroundColor: "#e9e7e9" }}>
      <Table sx={{ minWidth: 450 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bolder" }}>Rank</TableCell>
            <TableCell style={{ fontWeight: "bolder" }} align="left">
              Nickname
            </TableCell>
            <TableCell style={{ fontWeight: "bolder" }} align="left">
              Score
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ranks.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.order}
              </TableCell>
              <TableCell align="left">{row.nickname}</TableCell>
              <TableCell align="left">{row.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
