import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BasicTable() {
  const [ranks, setRanks] = useState([
    { order: 1, nickname: "Ali", score: 100 },
    { order: 2, nickname: "Ahmed", score: 90 },
    { order: 3, nickname: "Sara", score: 80 },
    { order: 4, nickname: "Mohamed", score: 70 },
    { order: 5, nickname: "Hassan", score: 60 },
    { order: 6, nickname: "Omar", score: 50 },
    { order: 7, nickname: "Sami", score: 40 },
    { order: 8, nickname: "Khaled", score: 30 },
    { order: 9, nickname: "Hassan", score: 20 },
    { order: 10, nickname: "Omar", score: 10 },
  ]);


  return (
    <TableContainer component={Paper} style={{backgroundColor: "#e9e7e9"}}>
      <Table sx={{ minWidth: 450 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight: "bolder"}}>Rank</TableCell>
            <TableCell style={{fontWeight: "bolder"}} align="left">Nickname</TableCell>
            <TableCell style={{fontWeight: "bolder"}} align="left">Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ranks.map((row) => (
            <TableRow
              key={row.name}
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
