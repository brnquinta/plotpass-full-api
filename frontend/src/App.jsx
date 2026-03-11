import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Main from "./components/main/Main";
import PanelSearch from "./components/main/components/panels/PanelSearch";
import RecommendationsPanel from "./components/main/components/panels/RecommendationsPanel";
import SentRecommendationsPanel from "./components/main/components/panels/SentRecommendationsPanel";
import AboutPanel from "./components/main/components/panels/AboutPanel";
import MovieDetailsPage from "./components/main/components/panels/MovieDetailsPage";
import Login from "./components/register/login/Login";
import Signup from "./components/register/signup/Signup";
import ProtectedRoute from "./components/protectedRouters/ProtectedRouters.jsx";

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
    navigate("/login", { replace: true });
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Main
              search={search}
              onSearchChange={setSearch}
              onSubmitSearch={handleSubmitSearch}
              onLogout={handleLogout}
            >
              <PanelSearch movie={null} />
            </Main>
          </ProtectedRoute>
        }
      />

      <Route
        path="/movie/:movieId"
        element={
          <ProtectedRoute>
            <Main
              search={search}
              onSearchChange={setSearch}
              onSubmitSearch={handleSubmitSearch}
              onLogout={handleLogout}
            >
              <MovieDetailsPage />
            </Main>
          </ProtectedRoute>
        }
      />

      <Route
        path="/recommended"
        element={
          <ProtectedRoute>
            <Main
              search={search}
              onSearchChange={setSearch}
              onSubmitSearch={handleSubmitSearch}
              onLogout={handleLogout}
            >
              <RecommendationsPanel />
            </Main>
          </ProtectedRoute>
        }
      />

      <Route
        path="/sent"
        element={
          <ProtectedRoute>
            <Main
              search={search}
              onSearchChange={setSearch}
              onSubmitSearch={handleSubmitSearch}
              onLogout={handleLogout}
            >
              <SentRecommendationsPanel />
            </Main>
          </ProtectedRoute>
        }
      />

      <Route
        path="/about"
        element={
          <ProtectedRoute>
            <Main
              search={search}
              onSearchChange={setSearch}
              onSubmitSearch={handleSubmitSearch}
              onLogout={handleLogout}
            >
              <AboutPanel />
            </Main>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;