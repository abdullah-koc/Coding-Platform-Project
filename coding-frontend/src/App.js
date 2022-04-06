import React from "react";
import LoginRegister from "./views/LoginRegister/LoginRegister";
import { makeStyles } from "@mui/styles";
import { Routes, Route, Link } from "react-router-dom";
import clsx from "clsx";
import UserStatus from "./components/UserStatus";
import QuestionExplanation from "./components/QuestionExplanation";

const useStyles = makeStyles({
  root: {
    height: "100vh",
    width: "100vw",
    backgroundColor: "#fafafa",
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
    <div className={clsx(classes.root, classes.loginregister)}>
      <div>
        <Routes>
          <Route path="/" element={<QuestionExplanation />} />
          <Route path="/login-register" element={<LoginRegister />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
