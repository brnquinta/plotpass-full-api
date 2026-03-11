import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Register from "../Register";
import { signin } from "../../../utils/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    signin({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        navigate("/");
      })
      .catch((err) => {
        setErrorMessage(err.message || "Login failed");
      });
  };

  return (
    <Register>
      <div className="login">
        <form
          className="login__form form form_type_login"
          onSubmit={handleSubmit}
        >
          <div className="login__input-wrapper form__input-wrapper">
            <input
              className="login__input form__item form__email"
              placeholder="Email"
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="form__validation form__email-validation"></span>
          </div>

          <div className="login__input-wrapper form__input-wrapper">
            <input
              className="login__input form__item form__password"
              placeholder="Password"
              type="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="form__validation form__password-validation"></span>
          </div>

          {errorMessage && <p className="form__error">{errorMessage}</p>}

          <button
            className="login__submit-button form__submit-button"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </Register>
  );
}

export default Login;