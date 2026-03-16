import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../../../../utils/TmdbApi";
import PanelSearch from "./PanelSearch";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // modificação: loading da busca por ID

  useEffect(() => {
    if (!movieId) return;

    setIsLoading(true);

    // modificação: busca diretamente o filme pelo ID da URL
    tmdbApi
      .getMovieById(movieId)
      .then((data) => {
        setMovie(data);
      })
      .catch(() => {
        setMovie(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [movieId]);

  if (isLoading) {
    return <div className="panel-search__empty">Carregando filme...</div>;
  }

  return <PanelSearch movie={movie} />;
}

export default MovieDetailsPage;