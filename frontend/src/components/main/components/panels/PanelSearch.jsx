import posterIndisponivel from "../../../../images/posterIndisponivel.png";
import panelSearchImage from "../../../../images/panelSearchImage.jpg";

function PanelSearch({ movie }) {
  if (!movie) {
    return (
      <div className="panel-search__empty-wrapper">
        <img
          className="panel-search__empty-image"
          src={panelSearchImage}
          alt="Buscar filme"
        />
        <div className="panel-search__empty">
          Digite um filme e pesquise.
        </div>
      </div>
    );
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
    : posterIndisponivel;

  const year = movie.release_date
    ? movie.release_date.slice(0, 4)
    : "—";

  const rating = movie.vote_average
    ? movie.vote_average.toFixed(1)
    : "—";

  return (
    <section className="panel-search">
      <div className="panel-search__card">
        <div className="panel-search__grid">
          <div className="panel-search__poster">
            {posterUrl && <img src={posterUrl} alt={movie.title} />}
          </div>

          <div className="panel-search__header">
            <span className="panel-search__badge">Filme</span>
            <h2 className="panel-search__title">{movie.title}</h2>
            <div className="panel-search__genres">—</div>
          </div>

          <div className="panel-search__rating">
            <div className="panel-search__rating-pill">
              <span className="panel-search__star">⭐</span>
              <span className="panel-search__score">{rating}</span>
              <span className="panel-search__year">({year})</span>
            </div>
          </div>

          <div className="panel-search__overview">
            <p>{movie.overview || "Sem descrição disponível."}</p>
          </div>

          <div className="panel-search__meta">
            <div className="panel-search__meta-item">
              <span className="panel-search__meta-label">Idioma:</span>
              <span className="panel-search__meta-value">
                {movie.original_language?.toUpperCase()}
              </span>
            </div>

            <div className="panel-search__meta-item">
              <span className="panel-search__meta-label">Lançamento:</span>
              <span className="panel-search__meta-value">{year}</span>
            </div>
          </div>

          <div className="panel-search__right-bottom" />
        </div>
      </div>
    </section>
  );
}

export default PanelSearch;