import { Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUp";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import PracticeArea from "./pages/Dashboard/PracticeArea";
import ViewAnalysis from "./pages/Dashboard/ViewAnalysis";
import PracticePage from "./pages/Dashboard/PracticePage";
import LearningResources from "./pages/Dashboard/LearningResources";
import Profile from "./pages/Dashboard/Profile";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/"
        element={<LandingPage />}
      />
      <Route
        path="/signup"
        element={<SignUp />}
      />
      <Route
        path="/login"
        element={<LoginPage />}
      />

      {/* Dashboard routes */}
      <Route path="/dashboard">
        <Route
          index
          element={<DashboardHome />}
        />
        <Route
          path="practice-area"
          element={<PracticeArea />}
        />
        <Route
          path="view-analysis"
          element={<ViewAnalysis />}
        />
        <Route
          path="practice-page"
          element={<PracticePage />}
        />
        <Route
          path="learning-resources"
          element={<LearningResources />}
        />
        <Route
          path="profile"
          element={<Profile />}
        />
      </Route>
    </Routes>
  );
}

export default App;
