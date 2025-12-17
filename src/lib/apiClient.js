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
