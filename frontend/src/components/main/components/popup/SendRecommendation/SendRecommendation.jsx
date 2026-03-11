import { useState } from "react";
import { createRecommendation } from "../../../../../utils/api";

function SendRecommendation({ movie, onClose }) {
  const [email, setEmail] = useState("");
  const [recommendation, setRecommendation] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const token = localStorage.getItem("jwt");

    if (!token) {
      return;
    }

    const movieData = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path || "",
      vote_average: movie.vote_average ?? 0,
      release_date: movie.release_date || "",
    };

    createRecommendation(token, {
      toUserEmail: email,
      reason: recommendation,
      movie: movieData,
    })
      .then(() => {
        onClose();
      })
      .catch(() => {});
  };

  return (
    <form className="form form-recommendation" onSubmit={handleSubmit}>
      <div className="form__input-wrapper">
        <input
          className="form__item form__email"
          placeholder="Email"
          type="email"
          name="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className="form__input-wrapper">
        <textarea
          className="form__item form__recommendation"
          placeholder="Motivo da recomendação"
          minLength="2"
          maxLength="200"
          name="recommendation"
          required
          value={recommendation}
          onChange={(event) => setRecommendation(event.target.value)}
        />
      </div>

      <button className="form__button-submit" type="submit">
        Indicar
      </button>
    </form>
  );
}

export default SendRecommendation;