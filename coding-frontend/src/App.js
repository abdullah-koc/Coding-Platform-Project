import React from "react";
import LoginRegister from "./views/LoginRegister/LoginRegister";
import { makeStyles } from "@mui/styles";
import { Routes, Route } from "react-router-dom";
import clsx from "clsx";
import CodingQuestionInfo from "./components/CodingQuestionInfo";
import ProblemsScreen from "./views/ProblemsScreen";
import NonCodingQuestionInfo from "./components/NonCodingQuestionInfo";

const useStyles = makeStyles({
  root: {
    height: "100vh",
    width: "100vw",
    backgroundColor: "#e9e7e9",
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
          <Route path="/problems" element={<ProblemsScreen />} />
          <Route path="/cquestion:id" element={<CodingQuestionInfo />} />
          <Route path="/ncquestion:id" element={<NonCodingQuestionInfo />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
