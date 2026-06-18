import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const {
    currentUser,
    logout,
  } = useAuth();

  const handleProtectedNav = (path) => {
    setMenuOpen(false);

    if (currentUser) {
      navigate(path);
    } else {
      navigate("/login", {
        state: { from: path },
      });
    }
  };

  const handleAuth = async () => {
    setMenuOpen(false);

    if (currentUser) {
      try {
        await logout();
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <header className="app-header">
      <div className="header-container">

        {/* Logo */}
        <div
          className="brand-logo"
          onClick={() => navigate("/")}
        >
          <svg
            className="brand-icon"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
              fill="#f7efe3"
            />

            <path
              d="M12 6V12L16 14"
              stroke="#1b0f16"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          <span className="brand-name">
            TimeCapsule
          </span>
        </div>

        {/* Hamburger */}
        <button
          className="menu-toggle"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >
          ☰
        </button>

        {/* Nav */}
        <nav
          className={`main-nav ${
            menuOpen ? "open" : ""
          }`}
        >
          <ul className="nav-list">

            <li>
              <button
                className={`nav-link ${
                  location.pathname === "/"
                    ? "active"
                    : ""
                }`}
                onClick={() => {
                  navigate("/");
                  setMenuOpen(false);
                }}
              >
                Home
              </button>
            </li>

            <li>
              <button
                className={`nav-link ${
                  location.pathname ===
                  "/dashboard"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  handleProtectedNav(
                    "/dashboard"
                  )
                }
              >
                Dashboard
              </button>
            </li>

            <li>
              <button
                className={`nav-link ${
                  location.pathname ===
                  "/write-desk"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  handleProtectedNav(
                    "/write-desk"
                  )
                }
              >
                Write Desk
              </button>
            </li>

            <li className="mobile-auth">
              <button
                className="btn btn-nav"
                onClick={handleAuth}
              >
                {currentUser
                  ? "Sign Out"
                  : "Enter Journal"}
              </button>
            </li>
          </ul>
        </nav>

        {/* Desktop button */}
        <div className="header-actions">
          <button
            className="btn btn-nav"
            onClick={handleAuth}
          >
            {currentUser
              ? "Sign Out"
              : "Enter Journal"}
          </button>
        </div>

      </div>
    </header>
  );
};

export default Navbar;