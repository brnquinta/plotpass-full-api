import { useEffect, useState } from "react";
import { getSentRecommendations } from "../../../../utils/api";

function SentRecommendationsPanel() {
  const [recommendations, setRecommendations] = useState([]);
  const [page, setPage] = useState(1);

  const PAGE_SIZE = 5;

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      console.log("Token não encontrado");
      return;
    }

    getSentRecommendations(token)
      .then((data) => {
        setRecommendations(data);
      })
      .catch((err) => {
        console.log("Erro ao buscar recomendações enviadas:", err);
      });
  }, []);

  const visibleRecommendations = recommendations.slice(0, page * PAGE_SIZE);
  const hasMore = visibleRecommendations.length < recommendations.length;

  return (
    <section className="sent-recommendations">
      <h2 className="sent-recommendations__title">Recomendei:</h2>

      <div className="sent-recommendations__list">
        {visibleRecommendations.map((rec) => (
          <div key={rec._id} className="sent-recommendations__card">
            <div className="sent-recommendations__avatar">
              <img
                src={rec.toUserId?.avatar}
                alt={rec.toUserId?.name || "avatar"}
                className="sent-recommendations__avatar-circle"
              />
            </div>

            <div className="sent-recommendations__info">
              <p className="sent-recommendations__user">
                <strong>Para:</strong> {rec.toUserId?.email}
              </p>

              <p className="sent-recommendations__reason">
                <strong>Razão:</strong> {rec.reason}
              </p>
            </div>

            <div className="sent-recommendations__movie">
              <p className="sent-recommendations__movie-title">
                Título: <strong>{rec.movie?.title}</strong>
              </p>

              <p className="sent-recommendations__rating">
                ⭐ {rec.movie?.vote_average?.toFixed(1)}
              </p>

              <span
                className={
                  rec.status === "read"
                    ? "sent-recommendations__status sent-recommendations__status--watched"
                    : "sent-recommendations__status sent-recommendations__status--pending"
                }
              >
                {rec.status === "read" ? "Assistido" : "Pendente"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="sent-recommendations__actions">
          <button
            type="button"
            className="sent-recommendations__load-more-btn"
            onClick={() => setPage((p) => p + 1)}
          >
            Carregar mais
          </button>
        </div>
      )}
    </section>
  );
}

export default SentRecommendationsPanel;