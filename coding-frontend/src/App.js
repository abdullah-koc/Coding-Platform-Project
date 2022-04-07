import React from "react";
import LoginRegister from "./views/LoginRegister/LoginRegister";
import { makeStyles } from "@mui/styles";
import { Routes, Route, Link } from "react-router-dom";
import clsx from "clsx";
import UserStatus from "./components/UserStatus";
import CodingQuestionInfo from "./components/CodingQuestionInfo";

const useStyles = makeStyles({
  root: {
    height: "100vh",
    width: "100vw",
    backgroundColor: "#fafafa",
    overflowY: "hidden",
  },
  loginregister: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const App = () => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.root)}>
      <div>
        <Routes>
          <Route path="/" element={<CodingQuestionInfo />} />
          <Route path="/login-register" element={<LoginRegister />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
