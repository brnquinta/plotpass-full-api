import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Main from "./components/main/Main";
import PanelSearch from "./components/main/components/panels/PanelSearch";
import RecommendationsPanel from "./components/main/components/panels/RecommendationsPanel";
import SentRecommendationsPanel from "./components/main/components/panels/SentRecommendationsPanel";
import AboutPanel from "./components/main/components/panels/AboutPanel";
import MovieDetailsPage from "./components/main/components/panels/MovieDetailsPage"; // modificação: nova página de detalhes por ID

import Login from "./components/register/login/Login";
import Signup from "./components/register/signup/Signup";

// teste commit

function App() {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setSearch("");
    navigate("/login");
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/"
        element={
          <Main
            search={search}
            onSearchChange={setSearch}
            onSubmitSearch={handleSubmitSearch}
            onLogout={handleLogout}
          >
            <PanelSearch movie={null} />
          </Main>
        }
      />

      <Route
        path="/movie/:movieId"
        element={
          <Main
            search={search}
            onSearchChange={setSearch}
            onSubmitSearch={handleSubmitSearch}
            onLogout={handleLogout}
          >
            <MovieDetailsPage />
          </Main>
        }
      />

      <Route
        path="/recommended"
        element={
          <Main
            search={search}
            onSearchChange={setSearch}
            onSubmitSearch={handleSubmitSearch}
            onLogout={handleLogout}
          >
            <RecommendationsPanel />
          </Main>
        }
      />

      <Route
        path="/sent"
        element={
          <Main
            search={search}
            onSearchChange={setSearch}
            onSubmitSearch={handleSubmitSearch}
            onLogout={handleLogout}
          >
            <SentRecommendationsPanel />
          </Main>
        }
      />

      <Route
        path="/about"
        element={
          <Main
            search={search}
            onSearchChange={setSearch}
            onSubmitSearch={handleSubmitSearch}
            onLogout={handleLogout}
          >
            <AboutPanel />
          </Main>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;