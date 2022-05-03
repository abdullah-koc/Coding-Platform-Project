import React from "react";
import LoginRegister from "./views/LoginRegister/LoginRegister";
import { makeStyles } from "@mui/styles";
import { Routes, Route } from "react-router-dom";
import clsx from "clsx";
import CodingQuestionInfo from "./components/CodingQuestionInfo";
import ProblemsScreen from "./views/ProblemsScreen";
import NonCodingQuestionInfo from "./components/NonCodingQuestionInfo";
import UserProfileScreen from "./views/UserProfileScreen";
import AdminScreen from "./views/AdminScreen";
import EditorMainScreen from "./views/EditorMainScreen";
import Contests from "./views/Contests";
import EditorContestScreen from "./views/EditorContestScreen";
import ContestScreen from "./views/ContestScreen";
import EditorProfileScreen from "./views/EditorProfileScreen";
import CompanyMainScreen from "./views/CompanyMainScreen";
import DonationDialog from "./views/DonationDialog";
import CompanyCreateInterview from "./views/CompanyCreateInterview";
import InterviewCard from "./components/CompanyComponents/InterviewCard";

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
          <Route path="/" element={<LoginRegister />} /> {/*done*/}
          <Route path="/problems" element={<ProblemsScreen />} /> {/*done*/}
          <Route path="/editor" element={<EditorMainScreen />} /> {/*done*/}
          <Route
            path="/editor/contests"
            element={<EditorContestScreen />}
          />{" "}
          {/*done*/}
          <Route path="/contests" element={<Contests />} /> {/*done*/}
          <Route path="/contests/:id" element={<ContestScreen />} />
          <Route path="/contest/:id/donate" element={<DonationDialog />} />
          <Route path="/cquestion/:id" element={<CodingQuestionInfo />} />
          <Route
            path="/contests/c/:c_id/:id"
            element={<CodingQuestionInfo isContest />}
          />
          <Route path="/ncquestion/:id" element={<NonCodingQuestionInfo />} />
          <Route
            path="/contests/nc/:c_id/:id"
            element={<NonCodingQuestionInfo isContest />}
          />
          {/*done*/}
          <Route path="/profile" element={<UserProfileScreen />} /> {/*done*/}
          <Route
            path="/editor-profile"
            element={<EditorProfileScreen />}
          />{" "}
          {/*done*/}
          <Route path="/admin" element={<AdminScreen />} />
          <Route path="/company" element={<CompanyMainScreen />} />
          <Route
            path="/company/create-interview"
            element={<CompanyCreateInterview />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
