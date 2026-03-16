import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import logoBlue from "../../images/logoBlue.svg";
import profileIcon from "../../images/profileIcon.png";

import Popup from "../main/components/popup/Popup";
import EditUserInfo from "../main/components/popup/EditUserInfo/EditUserInfo";

function Header({ onLogout }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    if (!token) {
      localStorage.removeItem("user");
      navigate("/login");
      return;
    }

    fetch(`${API_URL}/users/me`, {
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
        localStorage.setItem("user", JSON.stringify(data));
      })
      .catch(() => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("user");
        navigate("/login");
      });
  }, [navigate]);

  const handleOpenEditProfile = () => {
    if (!user) return;
    setIsEditProfileOpen(true);
  };

  const handleCloseEditProfile = () => {
    setIsEditProfileOpen(false);
  };

  const handleUpdateUser = (updatedUser) => {
    const newUser = {
      ...user,
      ...updatedUser,
    };

    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  return (
    <>
      <header className="header">
        <div className="header__content">
          <img src={logoBlue} alt="PlotPass logo" className="header__logo" />

          <div className="header__profile">
            <button
              className="header__profile-button"
              type="button"
              onClick={handleOpenEditProfile}
            >
              <img
                src={user?.avatar ? user.avatar : profileIcon}
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

      {isEditProfileOpen && user && (
        <Popup title="Editar perfil" onClose={handleCloseEditProfile}>
          <EditUserInfo
            user={user}
            onClose={handleCloseEditProfile}
            onUpdate={handleUpdateUser}
          />
        </Popup>
      )}
    </>
  );
}

export default Header;