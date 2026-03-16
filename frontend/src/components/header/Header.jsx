import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import logoBlue from "../../images/logoBlue.svg";
import profileIcon from "../../images/profileIcon.png";

import Popup from "../main/components/popup/Popup";
import EditUserInfo from "../main/components/popup/EditUserInfo/EditUserInfo";

function Header({ onLogout }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    if (!token) {
      navigate("/login");
      return;
    }

    let isMounted = true;
    setIsLoadingUser(true);

    fetch(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao buscar usuário");
        }
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setUser(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          localStorage.removeItem("jwt");
          navigate("/login");
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoadingUser(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const handleOpenEditProfile = () => {
    if (!user || isLoadingUser) return;
    setIsEditProfileOpen(true);
  };

  const handleCloseEditProfile = () => {
    setIsEditProfileOpen(false);
  };

  const handleUpdateUser = (updatedUser) => {
    setUser((prev) => ({
      ...prev,
      ...updatedUser,
    }));
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
              disabled={isLoadingUser}
            >
              <img
                src={!isLoadingUser && user?.avatar ? user.avatar : profileIcon}
                alt="Perfil do usuário"
                className="header__profile-icon"
              />
            </button>

            <ul className="header__profile-menu">
              <li className="header__user-name">
                {isLoadingUser ? "" : user?.name}
              </li>

              <li className="header__user-email">
                {isLoadingUser ? "" : user?.email}
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