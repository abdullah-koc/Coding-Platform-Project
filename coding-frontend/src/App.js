import React from "react";
import LoginRegister from "./views/LoginRegister/LoginRegister";
import { makeStyles } from "@mui/styles";
import { Routes, Route } from "react-router-dom";
import clsx from "clsx";
import CodingQuestionInfo from "./components/CodingQuestionInfo";
import ProblemsScreen from "./views/ProblemsScreen";

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
          <Route path="/" element={<LoginRegister />} />
          <Route path="problems" element={<ProblemsScreen />} />
          <Route path="/question" element={<CodingQuestionInfo />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
