import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");

  const navigate = useNavigate("");

  return (
    <nav>
      <div className="nav-wrapper #673ab7 deep-purple">
        <Link to="/" className="brand-logo left font">
          Quote App
        </Link>
        <ul id="nav-mobile" className="right text">
          {token ? (
            <>
              <li>
                <Link to="/create">Create</Link>
              </li>
              <li>
                <Link to="/profile">
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                  }}
                  className="red text"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
