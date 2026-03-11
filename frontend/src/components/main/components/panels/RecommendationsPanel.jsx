import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // modificação: navegação para abrir detalhes do filme
import {
  getReceivedRecommendations,
  markRecommendationAsRead,
} from "../../../../utils/api";

function RecommendationsPanel() {
  const [recommendations, setRecommendations] = useState([]);
  const [page, setPage] = useState(1);

  const PAGE_SIZE = 5;
  const navigate = useNavigate(); // modificação: hook de navegação

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      console.log("Token não encontrado");
      return;
    }

    getReceivedRecommendations(token)
      .then((data) => {
        setRecommendations(data);
      })
      .catch((err) => {
        console.log("Erro ao buscar recomendações:", err);
      });
  }, []);

  const visibleRecommendations = recommendations.slice(0, page * PAGE_SIZE);
  const hasMore = visibleRecommendations.length < recommendations.length;

  const toggleStatus = (id) => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      console.log("Token não encontrado");
      return;
    }

    markRecommendationAsRead(token, id)
      .then(() => {
        setRecommendations((prevRecommendations) =>
          prevRecommendations.map((rec) => {
            if (rec._id !== id) return rec;

            return {
              ...rec,
              status: "read",
            };
          })
        );
      })
      .catch((err) => console.log("Erro ao marcar como lida:", err));
  };

  const handleOpenMovieDetails = (movieId) => {
    if (!movieId) return;

    // modificação: abre diretamente a rota de detalhes usando o id salvo na recomendação
    navigate(`/movie/${movieId}`);
  };

  return (
    <section className="recommendations">
      <h2 className="recommendations__title">Recebidos:</h2>

      <div className="recommendations__list">
        {visibleRecommendations.map((rec) => (
          <div key={rec._id} className="recommendations__card">
            <div className="recommendations__avatar">
              <img
                src={rec.fromUserId?.avatar}
                alt={rec.fromUserId?.name || "avatar"}
                className="recommendations__avatar-circle"
              />
            </div>

            <div className="recommendations__info">
              <p className="recommendations__user">
                <strong>Quem indicou:</strong> {rec.fromUserId?.email}
              </p>

              <p className="recommendations__reason">
                <strong>Razão:</strong> {rec.reason}
              </p>
            </div>

            <div className="recommendations__movie">
              <p className="recommendations__movie-title">
                Título: <strong>{rec.movie?.title}</strong>
              </p>

              <p className="recommendations__rating">
                ⭐ {rec.movie?.vote_average?.toFixed(1)}
              </p>

              <button
                type="button"
                className={
                  rec.status === "read"
                    ? "recommendations__status-btn recommendations__status-btn--watched"
                    : "recommendations__status-btn recommendations__status-btn--pending"
                }
                onClick={() => toggleStatus(rec._id)}
              >
                {rec.status === "read" ? "Assistido" : "Pendente"}
              </button>

              <button
                type="button"
                className="recommendations__view-btn"
                onClick={() => handleOpenMovieDetails(rec.movie?.id)}
              >
                Ver detalhes
              </button>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="recommendations__actions">
          <button
            type="button"
            className="recommendations__status-btn recommendations__status-btn--pending"
            onClick={() => setPage((p) => p + 1)}
          >
            Carregar mais
          </button>
        </div>
      )}
    </section>
  );
}

export default RecommendationsPanel;