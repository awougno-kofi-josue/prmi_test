/* =========================
   API CHATBOT (PUBLIC)
========================= */

const CHATBOT_API = "https://bilalbill-techsante-api.hf.space";

export async function getStatus() {
  const res = await fetch(`${CHATBOT_API}/`);
  if (!res.ok) throw new Error("Chatbot indisponible");
  return res.json();
}

export async function sendMessage(query, latitude = 0, longitude = 0) {
  const res = await fetch(`${CHATBOT_API}/triage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, latitude, longitude }),
  });

  if (!res.ok) throw new Error("Erreur chatbot");
  return res.json();
}

/* =========================
   API ADMIN (SECURISÉE)
========================= */


const ADMIN_API = "https://hospital-bed-management-ec42.onrender.com";

export async function login(username, password) {
  const body = new URLSearchParams();
  body.append("username", username);
  body.append("password", password);

  const res = await fetch(`${ADMIN_API}/api/v1/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Erreur login");
  }

  const data = await res.json();
  localStorage.setItem("token", data.token); // si ton backend renvoie un token
  return data;
}

/* =========================
   Request centralisée
========================= */
async function request(url, options = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(ADMIN_API + url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "admin/login";
    throw new Error("Session expirée");
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Erreur API");
  }

  return res.json();
}

/* =========================
   Services
========================= */
export const ServicesAPI = {
  list: () => request("/api/v1/api/v1/services/"),
};

/* =========================
   Admissions
========================= */
export const AdmissionsAPI = {
  list: () => request("/api/v1/api/v1/admissions/"),
  create: (data) =>
    request("/api/v1/api/v1/admissions/", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  discharge: (id) =>
    request(`/api/v1/api/v1/admissions/${id}/discharge`, {
      method: "PATCH",
    }),
};

/* =========================
   Hospitals
========================= */
export const HospitalsAPI = {
  list: () => request("/api/v1/api/v1/hospitals/"),
  create: (data) =>
    request("/api/v1/api/v1/hospitals/", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

/* =========================
   Beds
========================= */
export const BedsAPI = {
  create: (data) =>
    request("/api/v1/api/v1/lits/", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateStatus: (id, status) =>
    request(`/api/v1/api/v1/lits/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
};

/* =========================
   Stats
========================= */
export const StatsAPI = {
  dashboard: () => request("/api/v1/api/v1/stats/dashboard"),
};
