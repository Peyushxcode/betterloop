import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import AssessmentPage from "./pages/AssessmentPage";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <div>
      <h1>BetterLoop</h1>

      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route 
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage/>
            </ProtectedRoute>
          } 
        />
        <Route path="/assessment" element={<AssessmentPage />} />
      </Routes>
    </div>
  );
}

export default App;