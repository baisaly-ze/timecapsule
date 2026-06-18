import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/AppSidebar.css";

const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const [open, setOpen] = useState(false);

  const goTo = (path) => {
    navigate(path);
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <button
        className="sidebar-mobile-btn"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      <aside className={`app-sidebar ${open ? "open" : ""}`}>
        <div>
         <div
  className="sidebar-brand"
  onClick={() => goTo("/")}
>
  <svg
    className="sidebar-icon"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
      fill="#ece0d0"
    />

    <path
      d="M12 6V12L16 14"
      stroke="#251c0f"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
            <h2>TimeCapsule</h2>
          </div>

          <nav className="sidebar-nav">
            <button
              className={location.pathname === "/" ? "active" : ""}
              onClick={() => goTo("/")}
            >
              Home
            </button>

            <button
              className={location.pathname === "/dashboard" ? "active" : ""}
              onClick={() => goTo("/dashboard")}
            >
              Dashboard
            </button>

            <button
              className={location.pathname === "/write-desk" ? "active" : ""}
              onClick={() => goTo("/write-desk")}
            >
              Write Desk
            </button>
          </nav>
        </div>

        <button className="sidebar-logout" onClick={handleLogout}>
          Sign Out
        </button>
      </aside>
    </>
  );
};

export default AppSidebar;


