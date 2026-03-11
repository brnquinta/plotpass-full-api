import { useState } from "react";
import { updateUserProfile } from "../../../../../utils/api";

function EditUserInfo({ user, onClose, onUpdate }) {
  const [name, setName] = useState(user?.name || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");

  const handleSubmit = (event) => {
    event.preventDefault();

    const token = localStorage.getItem("jwt");

    if (!token) {
      console.log("Token não encontrado");
      return;
    }

    updateUserProfile(token, {
      name,
      avatar,
    })
      .then((data) => {
        console.log("Perfil atualizado:", data);

        if (onUpdate) {
          onUpdate(data);
        }

        onClose();
      })
      .catch((err) => {
        console.log("Erro ao atualizar perfil:", err);
      });
  };

  return (
    <form className="form form-edit-profile" onSubmit={handleSubmit}>
      <div className="form__input-wrapper">
        <input
          className="form__item form__name"
          type="text"
          name="name"
          placeholder="Nome"
          required
          minLength="2"
          maxLength="40"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form__input-wrapper">
        <input
          className="form__item form__avatar"
          type="url"
          name="avatar"
          placeholder="URL do avatar"
          required
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
      </div>

      <button className="form__button-submit" type="submit">
        Salvar
      </button>
    </form>
  );
}

export default EditUserInfo;