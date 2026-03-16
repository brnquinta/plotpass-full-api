import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import Header from "../header/Header";
import Footer from "../footer/Footer";

import Popup from "./components/popup/Popup";
import SendRecommendation from "./components/popup/SendRecommendation/SendRecommendation";

import SearchAutocomplete from "./components/searchAutocomplete/SearchAutocomplete";
import PanelSearch from "./components/panels/PanelSearch";

function Main({ children, search, onSearchChange, onLogout }) {
  const [isRecommendationOpen, setIsRecommendationOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const location = useLocation();
  const isSearchRoute = location.pathname === "/";

  const handleMainLogout = () => {
    setSelectedMovie(null);
    setIsRecommendationOpen(false);
    onSearchChange("");
    onLogout();
  };

  return (
    <>
      <Header onLogout={handleMainLogout} />

      <div className="layout">
        <aside className="sidebar">
          <nav className="sidebar__menu">
            <div className="sidebar__search-form">
              <SearchAutocomplete
                value={search}
                onChange={onSearchChange}
                onSelect={(movie) => setSelectedMovie(movie)}
              />
            </div>

            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? "is-active" : "")}
            >
              Início
            </NavLink>

            <NavLink
              to="/sent"
              className={({ isActive }) => (isActive ? "is-active" : "")}
            >
              Recomendei
            </NavLink>

            <NavLink
              to="/recommended"
              className={({ isActive }) => (isActive ? "is-active" : "")}
            >
              Recebidos
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "is-active" : "")}
            >
              Sobre
            </NavLink>
          </nav>

          <Footer />
        </aside>

        <main className="main-content">
          <div className="main-content__panel">
            {isSearchRoute ? <PanelSearch movie={selectedMovie} /> : children}
          </div>

          {isSearchRoute && (
            <div className="main-content__actions">
              <button
                className="recommend-button"
                onClick={() => {
                  if (!selectedMovie) return;
                  setIsRecommendationOpen(true);
                }}
                disabled={!selectedMovie}
              >
                Recomendar
              </button>
            </div>
          )}
        </main>
      </div>

      {isRecommendationOpen && (
        <Popup
          title="Indique esse filme"
          onClose={() => setIsRecommendationOpen(false)}
        >
          <SendRecommendation
            movie={selectedMovie}
            onClose={() => setIsRecommendationOpen(false)}
          />
        </Popup>
      )}
    </>
  );
}

export default Main;