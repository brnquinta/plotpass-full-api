// frontend/src/utils/api.js
const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

function handleResponse(res) {
  return res.json().then((data) => {
    if (!res.ok) {
      return Promise.reject(data);
    }
    return data;
  });
}

export function signup({ name, avatar, email, password }) {
  return fetch(`${BASE_URL}/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(handleResponse);
}

export function signin({ email, password }) {
  return fetch(`${BASE_URL}/users/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
}

export function getUsers(token) {
  return fetch(`${BASE_URL}/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(handleResponse);
}

export function createRecommendation(token, { toUserEmail, reason, movie }) {
  return fetch(`${BASE_URL}/recommendations`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      toUserEmail,
      reason,
      movie,
    }),
  }).then(handleResponse);
}

export function getReceivedRecommendations(token) {
  return fetch(`${BASE_URL}/recommendations/received`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(handleResponse);
}

export function getSentRecommendations(token) {
  return fetch(`${BASE_URL}/recommendations/sent`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(handleResponse);
}

export function markRecommendationAsRead(token, recommendationId) {
  return fetch(`${BASE_URL}/recommendations/${recommendationId}/read`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(handleResponse);
}

export function updateUserProfile(token, data) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(handleResponse);
}