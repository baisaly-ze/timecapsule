import {
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import WriteDesk from "./pages/WriteDesk";

function App() {
  return (
    <Routes>

      {/* Pages with Top Navbar */}
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <HomePage />
          </>
        }
      />

      <Route
        path="/login"
        element={
          <>
            <Navbar />
            <AuthPage />
          </>
        }
      />

      {/* Pages with Sidebar */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/write-desk"
        element={
          <ProtectedRoute>
            <WriteDesk />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;