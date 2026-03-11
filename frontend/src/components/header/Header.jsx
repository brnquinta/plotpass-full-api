import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import logoBlue from "../../images/logoBlue.svg";
import profileIcon from "../../images/profileIcon.png";

function Header({ onLogout }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:5000/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao buscar usuário");
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.log("Erro /users/me:", err);
        localStorage.removeItem("jwt");
        navigate("/login");
      });
  }, [navigate]);

  return (
    <header className="header">
      <div className="header__content">
        <img src={logoBlue} alt="PlotPass logo" className="header__logo" />

        <div className="header__profile">
          <button className="header__profile-button" type="button">
            <img
              src={user?.avatar || profileIcon}
              alt="Perfil do usuário"
              className="header__profile-icon"
            />
          </button>

          <ul className="header__profile-menu">
            <li className="header__user-name">
              {user ? user.name : "Carregando..."}
            </li>

            <li className="header__user-email">
              {user ? user.email : ""}
            </li>

            <li>
              <button
                className="header__logout-btn"
                type="button"
                onClick={onLogout}
              >
                Sair
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;