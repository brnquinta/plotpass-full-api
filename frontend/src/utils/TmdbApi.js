// utils/TmdbApi.js
class TmdbApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleServerResponse(result) {
    return result.ok ? result.json() : Promise.reject(`Error: ${result.status}`);
  }

  _getHeaders() {
    const token = import.meta.env.VITE_TMDB_TOKEN;
    return { ...this._headers, Authorization: `Bearer ${token}` };
  }

  searchMovie(query, page = 1, language = "pt-BR") {
    return fetch(
      `${this._baseUrl}/search/movie?query=${encodeURIComponent(
        query
      )}&language=${language}&page=${page}&include_adult=false`,
      { headers: this._getHeaders() }
    ).then((r) => this._handleServerResponse(r));
  }


  // TMDB API helper
  getMovieById(movieId, language = "pt-BR") {
    return fetch(
      `${this._baseUrl}/movie/${movieId}?language=${language}`,
      { headers: this._getHeaders() }
    ).then((r) => this._handleServerResponse(r));
  }

  getImageUrl(path, size = "w92") {
    if (!path) return "";
    return `https://image.tmdb.org/t/p/${size}${path}`;
  }
}

const tmdbApi = new TmdbApi({
  baseUrl: "https://api.themoviedb.org/3",
  headers: { accept: "application/json" },
});

export default tmdbApi;