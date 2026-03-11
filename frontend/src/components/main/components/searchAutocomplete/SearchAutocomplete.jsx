import { useEffect, useRef, useState } from "react";
import tmdbApi from "../../../../utils/TmdbApi";
import posterIndisponivel from "../../../../images/posterIndisponivel.png";
import { useNavigate } from "react-router-dom";

function SearchAutocomplete({ value, onChange, onSelect }) {
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const containerRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    function onDocMouseDown(e) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target)) setOpen(false);
    }

    function onKeyDown(e) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    const q = value.trim();

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (q.length < 2) {
      setResults([]);
      setOpen(false);
      setLoading(false);
      return;
    }

    setLoading(true);

    debounceRef.current = setTimeout(() => {
      tmdbApi
        .searchMovie(q, 1, "pt-BR")
        .then((data) => {
          const items = (data.results || []).slice(0, 8);
          setResults(items);
          setOpen(true);
        })
        .catch(() => {
          setResults([]);
          setOpen(false);
        })
        .finally(() => setLoading(false));
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [value]);

  function handleSelect(movie) {
    setOpen(false);
    onSelect(movie);
    navigate("/");
  }

  return (
    <div ref={containerRef} className="autocomplete">
      <div className="autocomplete__input-wrap">
        <input
          className="autocomplete__input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Buscar filme..."
          onFocus={() => {
            if (results.length) setOpen(true);
          }}
        />
        {loading && <span className="autocomplete__spinner">…</span>}
      </div>

      {open && results.length > 0 && (
        <div className="autocomplete__dropdown">
          <div className="autocomplete__dropdown-list">
            {results.map((m) => {
              const year = m.release_date ? m.release_date.slice(0, 4) : "—";
              const img = tmdbApi.getImageUrl(m.poster_path, "w92");

              return (
                <button
                  type="button"
                  key={m.id}
                  className="autocomplete__item"
                  onClick={() => handleSelect(m)}
                >
                  <div className="autocomplete__poster">
                    {img ? (
                      <img src={img} alt={m.title} />
                    ) : (
                      <img src={posterIndisponivel} alt={m.title} />
                    )}
                  </div>

                  <div className="autocomplete__info">
                    <div className="autocomplete__title">{m.title}</div>
                    <div className="autocomplete__meta">
                      <span>{year}</span>
                      <span className="autocomplete__dot">•</span>
                      <span>{m.original_language?.toUpperCase() || "—"}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchAutocomplete;