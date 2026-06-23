const BASE_URL = "https://se-register-api.en.tripleten-services.com/v1";

export function register(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Erro: ${res.status}`);
    }
    return res.json();
  });
}
export function authorize(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Erro: ${res.status}`);
    }
    return res.json();
  });
}

export function checkToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, //perguntar sobre essa linha no co-learning //
    },
  }).then((res) => res.json());
}
