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

/* Helpers */
function authHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

async function handleResponse(res) {
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || `Erreur API (${res.status})`);
  }
  return res.json();
}

/* =========================
   AUTH
========================= */

export async function login(username, password) {
  const body = new URLSearchParams();
  body.append("username", username);
  body.append("password", password);



  const res = await fetch(`${ADMIN_API}/api/v1/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  

  return handleResponse(res);
}

/* =========================
   HOSPITALS
========================= */
const token = localStorage.getItem("token");
export const HospitalsAPI = {
  
  list(token) {
    
    console.log("Token pour créer un hôpital :", token);
    return fetch(`${ADMIN_API}/api/v1/api/v1/hospitals/`, {
      method: "GET",
      headers: authHeaders(token),
    }).then(handleResponse);
  },

  create(data, token) {
    console.log("Token pour créer un hôpital :", token);
    return fetch(`${ADMIN_API}/api/v1/api/v1/hospitals/`, {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify(data),
    }).then(handleResponse);
  },
};

/* =========================
   SERVICES
========================= */

export const ServicesAPI = {
  list(token) {
    return fetch(`${ADMIN_API}/api/v1/services/`, {
      headers: authHeaders(token),
    }).then(handleResponse);
  },
};

/* =========================
   LITS
========================= */

export const BedsAPI = {
  create(data, token) {
    return fetch(`${ADMIN_API}/api/v1/lits/`, {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify(data),
    }).then(handleResponse);
  },

  updateStatus(id, status, token) {
    return fetch(`${ADMIN_API}/api/v1/lits/${id}/status`, {
      method: "PATCH",
      headers: authHeaders(token),
      body: JSON.stringify({ status }),
    }).then(handleResponse);
  },
};

/* =========================
   STATS
========================= */

export const StatsAPI = {
  dashboard(token) {
    return fetch(`${ADMIN_API}/api/v1/api/v1/stats/dashboard`, {
      headers: authHeaders(token),
    }).then(handleResponse);
  },
};
