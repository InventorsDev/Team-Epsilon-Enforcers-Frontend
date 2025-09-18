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
import ProtectedRoute from "./components/ProtectedRoute";

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

      {/* Protected Dashboard routes */}
      <Route path="/dashboard">
        <Route
          index
          element={
            <ProtectedRoute>
              <DashboardHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="practice-area"
          element={
            <ProtectedRoute>
              <PracticeArea />
            </ProtectedRoute>
          }
        />
        <Route
          path="view-analysis"
          element={
            <ProtectedRoute>
              <ViewAnalysis />
            </ProtectedRoute>
          }
        />
        <Route
          path="practice-page"
          element={
            <ProtectedRoute>
              <PracticePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="learning-resources"
          element={
            <ProtectedRoute>
              <LearningResources />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
