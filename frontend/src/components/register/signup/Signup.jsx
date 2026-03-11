import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Register from "../Register";
import { signup } from "../../../utils/api";

function Signup() {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    signup({ name, avatar, email, password })
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.log("Signup error:", err);
      });
  };

  return (
    <Register>
      <div className="signup">
        <form
          className="signup__form form form_type_signup"
          onSubmit={handleSubmit}
        >
          <div className="signup__input-wrapper form__input-wrapper">
            <input
              className="signup__input form__item form__name"
              placeholder="Name"
              type="text"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="signup__input-wrapper form__input-wrapper">
            <input
              className="signup__input form__item form__avatar"
              placeholder="Avatar URL"
              type="url"
              name="avatar"
              required
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </div>

          <div className="signup__input-wrapper form__input-wrapper">
            <input
              className="signup__input form__item form__email"
              placeholder="Email"
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="signup__input-wrapper form__input-wrapper">
            <input
              className="signup__input form__item form__password"
              placeholder="Password"
              type="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="signup__submit-button form__submit-button"
            type="submit"
          >
            Create account
          </button>
        </form>
      </div>
    </Register>
  );
}

export default Signup;