import { Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import { LoginForm } from "./pages/Login";
import { SignUpForm } from "./pages/Signup";
import LearningResourcesPage from "./pages/LearningResources";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/learning-resources" element={<LearningResourcesPage />} />
    </Routes>
  );
}

export default App;
