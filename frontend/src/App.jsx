import {
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import HomePage from "./pages/HomePage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import WriteDesk from "./pages/WriteDesk.jsx";

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