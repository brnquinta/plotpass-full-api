import { NavLink } from "react-router-dom";
import logo from "../../images/logoBlue.svg";

function Register({ children }) {
  return (
    <div className="register">
      <div className="register__card">
        <img className="register__logo" src={logo} alt="logo" />

        <div className="register__tabs">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `register__tab ${isActive ? "register__tab_active" : ""}`
            }
          >
            Login
          </NavLink>

          <NavLink
            to="/signup"
            className={({ isActive }) =>
              `register__tab ${isActive ? "register__tab_active" : ""}`
            }
          >
            Sign Up
          </NavLink>
        </div>

        <div className="register__content">{children}</div>
      </div>
    </div>
  );
}

export default Register;