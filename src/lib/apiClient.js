// api.js
export async function getStatus() {
  const res = await fetch("https://bilalbill-techsante-api.hf.space/");
  const data = await res.json();
  return data;
}

export async function sendMessage(query, latitude = 0, longitude = 0) {
  const res = await fetch("https://bilalbill-techsante-api.hf.space/triage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, latitude, longitude }),
  });

  const data = await res.json();
  return data; // data.reply ou data selon retour exact
}

//API Dashboard admin
const API = "https://hospital-bed-management-ec42.onrender.com";

export function authHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

/* AUTH */
export async function login(username, password) {
  const body = new URLSearchParams();
  body.append("username", username);
  body.append("password", password);

  const res = await fetch(`${API}/api/v1/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!res.ok) throw new Error("Login échoué");
  return res.json();
}

/* HOSPITALS */
export const HospitalsAPI = {
  list: (token) =>
    fetch(`${API}/api/v1/hospitals/`, {
      headers: authHeaders(token),
    }).then(r => r.json()),

  create: (data, token) =>
    fetch(`${API}/api/v1/hospitals/`, {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify(data),
    }).then(r => r.json()),
};

/* SERVICES */
export const ServicesAPI = {
  list: (token) =>
    fetch(`${API}/api/v1/services/`, {
      headers: authHeaders(token),
    }).then(r => r.json()),
};

/* LITS */
export const BedsAPI = {
  create: (data, token) =>
    fetch(`${API}/api/v1/lits/`, {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify(data),
    }).then(r => r.json()),

  updateStatus: (id, status, token) =>
    fetch(`${API}/api/v1/lits/${id}/status`, {
      method: "PATCH",
      headers: authHeaders(token),
      body: JSON.stringify({ status }),
    }).then(r => r.json()),
};

/* STATS */
export const StatsAPI = {
  dashboard: (token) =>
    fetch(`${API}/api/v1/stats/dashboard`, {
      headers: authHeaders(token),
    }).then(r => r.json()),
};

